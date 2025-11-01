//    PLATAFORMA WEB – ONG Sementes do Amanhã
//    DESENVOLVIDO POR: Jéssica de Albuquerque Storgatto
//    INSTITUIÇÃO: Universidade Cruzeiro do Sul
//    DISCIPLINA: Desenvolvimento FRONT-END para Web
//    EXPERIÊNCIA PRÁTICA — ENTREGA 3 (INTERATIVIDADE E FUNCIONALIDADES)
//    DATA: 01/11/2025

// VERIFICACAO-FORMULARIOS.JS: SISTEMA UNIFICADO DE VALIDAÇÃO

// VERIFICAÇÃO DE DUPLICAÇÃO
if (typeof FormValidator !== 'undefined') {
    console.log('🔄 FormValidator já carregado - ignorando duplicata');
} else {
    
    // CLASSE PRINCIPAL UNIFICADA - GERENCIA VALIDAÇÃO E ENVIO
    class FormValidator {
        constructor(formId) {
            this.form = document.getElementById(formId);
            this.fields = this.form.querySelectorAll('input, select, textarea');
            this.submitButton = this.form.querySelector('button[type="submit"]');
            this.loadingSpinner = this.createLoadingSpinner();
            this.init();
        }

        // INICIALIZAÇÃO UNIFICADA
        init() {
            // CONFIGURA EVENTOS DE VALIDAÇÃO
            this.fields.forEach(field => {
                if (field.id === 'cpf' || field.id === 'telefone' || field.id === 'cep') {
                    field.addEventListener('input', (e) => this.applyMask(e));
                }
                
                // Para inputs normais
                if (field.type !== 'checkbox' && field.type !== 'radio') {
                    field.addEventListener('input', () => {
                        this.validateField(field);
                        this.updateSubmitButton();
                    });
                    field.addEventListener('blur', () => {
                        this.validateField(field);
                        this.updateSubmitButton();
                    });
                    field.addEventListener('focus', () => this.showFieldHint(field));
                }
            });

            // EVENTOS ESPECIAIS PARA CHECKBOXES
            const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    this.validateCheckbox(checkbox);
                    this.updateSubmitButton();
                });
            });

            // EVENTOS PARA RADIO BUTTONS
            const radios = this.form.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.addEventListener('change', () => {
                    this.validateRadioGroup(radio);
                    this.updateSubmitButton();
                });
            });

            // EVENTO DE SUBMIT UNIFICADO
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // VALIDAÇÃO INICIAL DO BOTÃO
            setTimeout(() => {
                this.updateSubmitButton();
            }, 100);
            
            console.log('✅ SISTEMA DE VALIDAÇÃO E ENVIO INICIALIZADO');
        }

        // ATUALIZA ESTADO DO BOTÃO DE ENVIO
        updateSubmitButton() {
            const isFormValid = this.isFormValid();
            
            if (isFormValid) {
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('button-disabled');
                this.submitButton.classList.add('button-enabled');
            } else {
                this.submitButton.disabled = true;
                this.submitButton.classList.add('button-disabled');
                this.submitButton.classList.remove('button-enabled');
            }
        }

        // VERIFICA SE O FORMULÁRIO ESTÁ VÁLIDO
        isFormValid() {
            let isValid = true;

            // VERIFICA CAMPOS NORMAIS
            this.fields.forEach(field => {
                if (field.required && !field.disabled) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        // Checkboxes e radios são tratados separadamente
                        return;
                    }
                    
                    const value = field.value.trim();
                    if (!value) {
                        isValid = false;
                        return;
                    }
                    
                    // Validações específicas por tipo
                    if (!this.validateField(field, true)) {
                        isValid = false;
                    }
                }
            });

            // VERIFICA CHECKBOX TERMOS
            const termosCheckbox = this.form.querySelector('input[name="termos"]');
            if (termosCheckbox && !termosCheckbox.checked) {
                isValid = false;
            }

            // VERIFICA RADIO BUTTONS
            const participacaoRadios = this.form.querySelectorAll('input[name="participacao"]');
            let participacaoSelected = false;
            participacaoRadios.forEach(radio => {
                if (radio.checked) participacaoSelected = true;
            });
            
            if (!participacaoSelected) {
                isValid = false;
            }

            return isValid;
        }

        // VALIDAÇÃO DE CHECKBOXES
        validateCheckbox(checkbox) {
            if (checkbox.required) {
                if (checkbox.checked) {
                    this.setCheckboxValid(checkbox);
                } else {
                    this.setCheckboxInvalid(checkbox, '⚠️ Este campo é obrigatório');
                }
            } else {
                // Checkbox opcional 
                this.clearCheckboxStatus(checkbox);
            }
        }

        // VALIDAÇÃO DE GRUPOS DE RADIO
        validateRadioGroup(radio) {
            const radioGroup = this.form.querySelectorAll(`input[name="${radio.name}"]`);
            const radioGroupContainer = radio.closest('.form-group');
            
            let anyChecked = false;
            radioGroup.forEach(r => {
                if (r.checked) anyChecked = true;
            });

            if (radio.required && !anyChecked) {
                this.setRadioGroupInvalid(radioGroupContainer, '⚠️ Selecione uma opção');
            } else {
                this.setRadioGroupValid(radioGroupContainer);
            }
        }

        // INDICA CHECKBOX COMO VÁLIDO
        setCheckboxValid(checkbox) {
            const container = checkbox.closest('.checkbox-group');
            if (container) {
                container.classList.remove('field-invalid');
                container.classList.add('field-valid');
                const messageElement = container.querySelector('.field-message');
                if (messageElement) {
                    messageElement.style.display = 'none';
                }
            }
        }

        // INDICA CHECKBOX COMO INVÁLIDO
        setCheckboxInvalid(checkbox, message) {
            const container = checkbox.closest('.checkbox-group');
            if (container) {
                container.classList.remove('field-valid');
                container.classList.add('field-invalid');
                
                let messageElement = container.querySelector('.field-message');
                if (!messageElement) {
                    messageElement = document.createElement('div');
                    messageElement.className = 'field-message';
                    messageElement.style.cssText = `
                        color: #e74c3c;
                        font-size: 0.875rem;
                        margin-top: 5px;
                        display: block;
                    `;
                    container.appendChild(messageElement);
                }
                
                messageElement.textContent = message;
                messageElement.style.display = 'block';
            }
        }

        // LIMPAR STATUS DO CHECKBOX
        clearCheckboxStatus(checkbox) {
            const container = checkbox.closest('.checkbox-group');
            if (container) {
                container.classList.remove('field-valid', 'field-invalid');
                const messageElement = container.querySelector('.field-message');
                if (messageElement) {
                    messageElement.style.display = 'none';
                }
            }
        }

        // INDICA GRUPO DE RADIO COMO VÁLIDO
        setRadioGroupValid(container) {
            if (container) {
                container.classList.remove('field-invalid');
                container.classList.add('field-valid');
                const messageElement = container.querySelector('.field-message');
                if (messageElement) {
                    messageElement.style.display = 'none';
                }
            }
        }

        // INDICA GRUPO DE RADIO COMO INVÁLIDO
        setRadioGroupInvalid(container, message) {
            if (container) {
                container.classList.remove('field-valid');
                container.classList.add('field-invalid');
                
                let messageElement = container.querySelector('.field-message');
                if (!messageElement) {
                    messageElement = document.createElement('div');
                    messageElement.className = 'field-message';
                    messageElement.style.cssText = `
                        color: #e74c3c;
                        font-size: 0.875rem;
                        margin-top: 5px;
                        display: block;
                    `;
                    container.appendChild(messageElement);
                }
                
                messageElement.textContent = message;
                messageElement.style.display = 'block';
            }
        }

        // CRIA SPINNER DE CARREGAMENTO DINAMICAMENTE
        createLoadingSpinner() {
            const spinner = document.createElement('div');
            spinner.id = 'loading-spinner';
            spinner.style.cssText = `
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            `;
            spinner.innerHTML = `
                <div style="text-align: center;">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 10px;"></div>
                    <p style="margin: 0; color: #333;">Enviando...</p>
                </div>
            `;
            document.body.appendChild(spinner);
            return spinner;
        }

        // MANIPULAÇÃO UNIFICADA DO ENVIO
        async handleSubmit(e) {
            e.preventDefault();
            
            console.log('🔄 Iniciando processo de envio...');
            
            // VALIDAÇÃO FINAL ANTES DO ENVIO
            let isFormValid = true;
            const invalidFields = [];

            // VALIDA CAMPOS NORMAIS
            this.fields.forEach(field => {
                if (field.required && !this.validateField(field)) {
                    isFormValid = false;
                    invalidFields.push(field);
                }
            });

            // VALIDAÇÃO ESPECÍFICA PARA CHECKBOXES
            const termosCheckbox = this.form.querySelector('input[name="termos"]');
            if (termosCheckbox && !termosCheckbox.checked) {
                isFormValid = false;
                this.setCheckboxInvalid(termosCheckbox, '❌ Você deve aceitar os termos de uso');
                invalidFields.push(termosCheckbox);
            }

            // VALIDAÇÃO ESPECÍFICA PARA RADIO BUTTONS
            const participacaoRadios = this.form.querySelectorAll('input[name="participacao"]');
            let participacaoSelected = false;
            participacaoRadios.forEach(radio => {
                if (radio.checked) participacaoSelected = true;
            });
            
            if (!participacaoSelected) {
                isFormValid = false;
                const radioContainer = participacaoRadios[0].closest('.form-group');
                this.setRadioGroupInvalid(radioContainer, '❌ Selecione um tipo de participação');
                invalidFields.push(participacaoRadios[0]);
            }

            if (!isFormValid) {
                this.showErrors(invalidFields);
                return false;
            }

            // SE VALIDAÇÃO PASSOU, PROCEDE COM ENVIO
            await this.submitForm();
        }

        // SISTEMA DE ENVIO DO FORMULÁRIO
        async submitForm() {
            // MOSTRA LOADING
            this.showLoading(true);

            try {
                // SIMULA ENVIO PARA BACKEND
                await this.submitToBackend();
                
                // SUCESSO
                this.showSuccess();
                
            } catch (error) {
                // ERRO NO ENVIO
                this.showError('Erro ao enviar formulário. Tente novamente.');
            } finally {
                // ESCONDE LOADING
                this.showLoading(false);
            }
        }

        // SIMULA ENVIO PARA BACK-END
        async submitToBackend() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.05) {
                        resolve({
                            success: true,
                            message: 'Formulário enviado com sucesso!'
                        });
                    } else {
                        reject(new Error('Erro de conexão'));
                    }
                }, 2000);
            });
        }

        // CONTROLE DE LOADING
        showLoading(show) {
            if (show) {
                this.loadingSpinner.style.display = 'block';
                this.submitButton.disabled = true;
                this.submitButton.textContent = 'Enviando...';
                this.submitButton.classList.add('button-loading');
                console.log('🔄 Loading spinner ativado');
            } else {
                this.loadingSpinner.style.display = 'none';
                this.submitButton.disabled = false;
                this.submitButton.textContent = 'Enviar meu cadastro';
                this.submitButton.classList.remove('button-loading');
                this.updateSubmitButton(); // Atualiza estado após loading
                console.log('✅ Loading spinner desativado');
            }
        }

        // EXIBE SUCESSO APÓS ENVIO
        showSuccess() {
            console.log('🎉 EXIBINDO MENSAGEM DE SUCESSO');
            
            // RESETA O FORMULÁRIO
            this.form.reset();
            console.log('✅ Formulário resetado (campos limpos)');
            
            // LIMPA OS ESTADOS DE VALIDAÇÃO DOS CAMPOS
            this.fields.forEach(field => this.clearFieldStatus(field));
            
            // LIMPA STATUS DAS CHECKBOXES
            const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => this.clearCheckboxStatus(checkbox));
            
            // LIMPA STATUS DOS RADIOS
            const radioGroups = this.form.querySelectorAll('.form-group');
            radioGroups.forEach(group => {
                group.classList.remove('field-valid', 'field-invalid');
                const messageElement = group.querySelector('.field-message');
                if (messageElement) {
                    messageElement.style.display = 'none';
                }
            });
            
            // ATUALIZA BOTÃO APÓS RESET
            this.updateSubmitButton();
            
            console.log('✅ Estados de validação limpos');
            console.log('🎉 FORMULÁRIO ENVIADO COM SUCESSO!');
            console.log('📊 Dados enviados:', this.collectFormData());

            // MOSTRA ALERTA DE SUCESSO CLICÁVEL
            this.showSuccessAlert();
        }

        // ✅ ALERTA DE SUCESSO CLICÁVEL
        showSuccessAlert() {
            // CRIA O ALERTA
            const alertOverlay = document.createElement('div');
            alertOverlay.className = 'success-alert-overlay';
            alertOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;

            const alertBox = document.createElement('div');
            alertBox.className = 'success-alert-box';
            alertBox.style.cssText = `
                background: #E0EBFF;
                border: 3px solid #0038B8;
                border-radius: 12px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                position: relative;
                animation: slideDown 0.3s ease;
            `;

            // BOTÃO FECHAR
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.style.cssText = `
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 28px;
                color: #2c3e50;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            `;

            closeButton.addEventListener('mouseover', function() {
                this.style.background = '#0038B8';
                this.style.color = 'white';
            });

            closeButton.addEventListener('mouseout', function() {
                this.style.background = 'none';
                this.style.color = '#2c3e50';
            });

            // TÍTULO
            const title = document.createElement('h3');
            title.textContent = '✓ CADASTRO ENVIADO COM SUCESSO!';
            title.style.cssText = `
                color: #001E60;
                margin: 0 0 15px 0;
                font-size: 1.4rem;
                font-weight: bold;
            `;

            // MENSAGEM
            const message = document.createElement('p');
            message.textContent = 'Obrigado por se inscrever como voluntário/doador em nossa ONG. Entraremos em contato em breve para lhe passar mais informações sobre como você pode contribuir com nossa causa.';
            message.style.cssText = `
                color: #2c3e50;
                margin: 0;
                line-height: 1.6;
                font-size: 1rem;
            `;

            // BOTÃO OK
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.style.cssText = `
                background: #3498db;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                margin-top: 20px;
                transition: all 0.2s ease;
            `;

            okButton.addEventListener('mouseover', function() {
                this.style.background = '#0038B8';
                this.style.transform = 'translateY(-2px)';
            });

            okButton.addEventListener('mouseout', function() {
                this.style.background = '#3498db';
                this.style.transform = 'translateY(0)';
            });

            // MONTAGEM DO ALERTA
            alertBox.appendChild(closeButton);
            alertBox.appendChild(title);
            alertBox.appendChild(message);
            alertBox.appendChild(okButton);
            alertOverlay.appendChild(alertBox);
            document.body.appendChild(alertOverlay);

            // FUNÇÕES DE FECHAMENTO
            const closeAlert = () => {
                alertOverlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (alertOverlay.parentNode) {
                        alertOverlay.parentNode.removeChild(alertOverlay);
                    }
                }, 300);
            };

            closeButton.addEventListener('click', closeAlert);
            okButton.addEventListener('click', closeAlert);
            alertOverlay.addEventListener('click', (e) => {
                if (e.target === alertOverlay) {
                    closeAlert();
                }
            });

            // FOCO NO BOTÃO OK
            okButton.focus();
        }

        // COLETA OS DADOS DO FORMULÁRIO
        collectFormData() {
            const formData = new FormData(this.form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // ADICIONA CAMPOS ESPECIAIS
            const areasInteresse = this.form.querySelector('#areas-interesse');
            if (areasInteresse) {
                data['areas-interesse-selected'] = Array.from(areasInteresse.selectedOptions).map(option => option.value);
            }
            
            // ADICIONA STATUS DA NEWSLETTER
            const newsletterCheckbox = this.form.querySelector('input[name="newsletter"]');
            data['newsletter'] = newsletterCheckbox ? newsletterCheckbox.checked : false;
            
            return data;
        }

        // MÉTODOS DE VALIDAÇÃO
        applyMask(event) {
            const field = event.target;
            let value = field.value.replace(/\D/g, '');
            
            switch(field.id) {
                case 'cpf':
                    if (value.length <= 11) {
                        value = value.replace(/(\d{3})(\d)/, '$1.$2');
                        value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                        value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
                        value = value.substring(0, 14);
                    }
                    break;
                    
                case 'telefone':
                    if (value.length <= 11) {
                        value = value.replace(/(\d{2})(\d)/, '($1) $2');
                        if (value.length > 10) {
                            value = value.replace(/(\(\d{2}\) \d{5})(\d)/, '$1-$2');
                        } else {
                            value = value.replace(/(\(\d{2}\) \d{4})(\d)/, '$1-$2');
                        }
                        value = value.substring(0, 15);
                    }
                    break;
                    
                case 'cep':
                    if (value.length <= 8) {
                        value = value.replace(/(\d{5})(\d)/, '$1-$2');
                        value = value.substring(0, 9);
                    }
                    break;
            }
            
            field.value = value;
        }

        validateField(field, silent = false) {
            const value = field.value.trim();
            let isValid = true;
            let message = '';

            if (!silent) {
                this.clearFieldStatus(field);
            }

            // VERIFICA SE É REQUERIDO E ESTÁ VAZIO
            if (field.required && !value) {
                isValid = false;
                message = '⚠️ Este campo é obrigatório';
            } else if (value) {
                // VALIDAÇÕES ESPECÍFICAS APENAS SE HOUVER VALOR
                switch(field.type) {
                    case 'text':
                        isValid = this.validateText(field, value);
                        switch(field.id) {
                            case 'nome-completo':
                                message = '👤 Nome deve conter apenas letras e ter entre 5 e 100 caracteres';
                                break;
                            case 'endereco':
                                message = '🏠 Endereço deve ter pelo menos 5 caracteres';
                                break;
                            case 'cidade':
                                message = '🏙️ Cidade deve ter apenas letras e pelo menos 2 caracteres';
                                break;
                            default:
                                message = '📝 Campo deve ter pelo menos 2 caracteres';
                        }
                        break;
                    case 'email':
                        isValid = this.validateEmail(value);
                        message = '📧 Formato de e-mail inválido (exemplo: usuario@email.com)';
                        break;
                    case 'tel':
                        isValid = this.validatePhone(value);
                        message = '📞 Formato de telefone inválido (formato: (00) 00000-0000)';
                        break;
                    case 'date':
                        isValid = this.validateDate(field, value);
                        message = '📅 Data de nascimento inválida ou futura';
                        break;
                    case 'number':
                        if (field.id === 'valor-doacao' && value < 0) {
                            isValid = false;
                            message = '💰 O valor da doação não pode ser negativo';
                        }
                        break;
                }

                if (field.id === 'cpf') {
                    isValid = this.validateCPF(value);
                    message = '🔢 CPF inválido (formato: 000.000.000-00)';
                }

                if (field.id === 'cep') {
                    isValid = this.validateCEP(value);
                    message = '📮 CEP inválido (formato: 00000-000)';
                }
            }

            if (!silent) {
                if (!isValid) {
                    this.setFieldInvalid(field, message);
                } else if (value.length > 0) {
                    this.setFieldValid(field);
                }
            }

            return isValid;
        }

        validateText(field, value) {
            switch(field.id) {
                case 'nome-completo':
                    return /^[A-Za-zÀ-ÿ\s\-']{5,100}$/.test(value);
                case 'endereco':
                    return value.length >= 5;
                case 'cidade':
                    return /^[A-Za-zÀ-ÿ\s\-']{2,}$/.test(value);
                default:
                    return value.length >= 2;
            }
        }

        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        validatePhone(phone) {
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            return phoneRegex.test(phone);
        }

        validateCPF(cpf) {
            cpf = cpf.replace(/\D/g, '');
            return cpf.length === 11;
        }

        validateCEP(cep) {
            const cepRegex = /^\d{5}-\d{3}$/;
            return cepRegex.test(cep);
        }

        validateDate(field, dateString) {
            if (!dateString) return false;
            const inputDate = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return inputDate <= today;
        }

        setFieldValid(field) {
            field.classList.remove('field-invalid');
            field.classList.add('field-valid');
            const messageElement = field.parentNode.querySelector('.field-message');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }

        setFieldInvalid(field, message) {
            field.classList.remove('field-valid');
            field.classList.add('field-invalid');
            
            let messageElement = field.parentNode.querySelector('.field-message');
            if (!messageElement) {
                messageElement = document.createElement('div');
                messageElement.className = 'field-message';
                messageElement.style.cssText = `
                    color: #e74c3c;
                    font-size: 0.875rem;
                    margin-top: 5px;
                    display: block;
                `;
                field.parentNode.appendChild(messageElement);
            }
            
            messageElement.textContent = message;
            messageElement.style.display = 'block';
        }

        clearFieldStatus(field) {
            field.classList.remove('field-valid', 'field-invalid');
            const messageElement = field.parentNode.querySelector('.field-message');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }

        showFieldHint(field) {
            console.log(`💡 Dica para ${field.name}: ${this.getFieldHint(field)}`);
        }

        getFieldHint(field) {
            const hints = {
                'nome-completo': 'Digite seu nome completo (apenas letras, 5-100 caracteres)',
                'email': 'exemplo@email.com',
                'telefone': 'Digite apenas números - será formatado automaticamente',
                'cpf': 'Digite apenas números - será formatado automaticamente',
                'cep': 'Digite apenas números - será formatado automaticamente',
                'data-nascimento': 'DD/MM/AAAA',
                'endereco': 'Digite o endereço completo (rua, número, complemento)',
                'cidade': 'Digite o nome da cidade (apenas letras)',
                'valor-doacao': 'Digite o valor em reais (apenas números)'
            };
            return hints[field.id] || 'Preencha este campo corretamente';
        }

        showErrors(invalidFields) {
            console.log('❌ ERROS NO FORMULÁRIO:', invalidFields);
            
            if (invalidFields.length > 0) {
                invalidFields[0].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                invalidFields[0].focus();
            }

            this.showToast('❌ Verifique os campos destacados em vermelho');
        }

        showError(message) {
            this.showToast(`❌ ${message}`);
        }

        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'validation-toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #e74c3c;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                font-family: Arial, sans-serif;
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 4000);
        }
    }

    // EXPORTA A CLASSE
    window.FormValidator = FormValidator;
}

// SISTEMA DE INICIALIZAÇÃO
const initializeFormValidator = () => {
    if (window.formValidatorInstance) {
        console.log('🔄 Validador já inicializado - ignorando duplicata');
        return true;
    }
    
    const form = document.getElementById('form-cadastro');
    if (form) {
        console.log('🚀 INICIALIZANDO SISTEMA UNIFICADO DE FORMULÁRIO');
        window.formValidatorInstance = new FormValidator('form-cadastro');
        return true;
    }
    
    return false;
};

// INICIALIZAÇÃO
if (!initializeFormValidator()) {
    console.log('⏳ Formulário não encontrado - aguardando carregamento...');
    
    const validationAttempts = setInterval(() => {
        if (initializeFormValidator()) {
            console.log('✅ Validador inicializado via verificação contínua');
            clearInterval(validationAttempts);
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(validationAttempts);
        if (!window.formValidatorInstance) {
            console.log('⏰ Timeout: Formulário não carregado após 10 segundos');
        }
    }, 10000);
}

// COMPATIBILIDADE COM CARREGAMENTO TRADICIONAL
document.addEventListener('DOMContentLoaded', function() {
    if (!window.formValidatorInstance) {
        initializeFormValidator();
    }
});

// ADICIONA ANIMAÇÕES CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideDown {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .field-valid {
        border-color: #27ae60 !important;
        background-color: #f8fff9 !important;
    }
    
    .field-invalid {
        border-color: #e74c3c !important;
        background-color: #fff8f8 !important;
    }
    
    .button-loading {
        opacity: 0.7;
        cursor: not-allowed !important;
    }
    
    .button-disabled {
        background: #95a5a6 !important;
        cursor: not-allowed !important;
        opacity: 0.7 !important;
        transform: none !important;
    }
    
    .button-enabled {
        background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-accent) 100%) !important;
        cursor: pointer !important;
        opacity: 1 !important;
    }
    
    /* ESTILOS ESPECÍFICOS PARA CHECKBOXES E RADIO GROUPS */
    .checkbox-group.field-valid {
        border-color: #27ae60 !important;
        background-color: rgba(39, 174, 96, 0.05) !important;
    }
    
    .checkbox-group.field-invalid {
        border-color: #e74c3c !important;
        background-color: rgba(231, 76, 60, 0.05) !important;
    }
    
    .form-group.field-valid .radio-group {
        border-color: #27ae60 !important;
    }
    
    .form-group.field-invalid .radio-group {
        border-color: #e74c3c !important;
    }
    
    /* REMOVER QUALQUER VALIDAÇÃO CSS QUE BLOQUEIE O BOTÃO */
    #form-cadastro .btn-submit {
        background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-accent) 100%) !important;
        cursor: pointer !important;
        opacity: 1 !important;
    }
    
    #form-cadastro .btn-submit:hover:not(:disabled) {
        background: linear-gradient(135deg, var(--color-warning-light) 0%, var(--color-accent-light) 100%) !important;
        transform: translateY(-3px) !important;
    }
    
    #form-cadastro .btn-submit:disabled {
        background: #95a5a6 !important;
        cursor: not-allowed !important;
        opacity: 0.7 !important;
        transform: none !important;
    }
`;
document.head.appendChild(style);