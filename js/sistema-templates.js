//    PLATAFORMA WEB – ONG Sementes do Amanhã
//    DESENVOLVIDO POR: Jéssica de Albuquerque Storgatto
//    INSTITUIÇÃO: Universidade Cruzeiro do Sul
//    DISCIPLINA: Desenvolvimento FRONT—END para Web
//    EXPERIÊNCIA PRÁTICA — ENTREGA 3 (INTERATIVIDADE E FUNCIONALIDADES)
//    DATA: 01/11/2025

// TEMPLATES.JS: SISTEMA DE TEMPLATES PARA APLICAÇÃO SPA
// GERENCIA CONTEÚDO HTML PARA NAVEGAÇÃO CLIENT-SIDE

// OBJETO PRINCIPAL DE TEMPLATES - ARMAZENA TODO O CONTEÚDO HTML DA APLICAÇÃO
const templates = {

    // CONTEÚDO DA HOME PAGE
    home: `
                   <!-- Página Inicial -->
        <section id="home" class="hero">
            <div class="container">
                <h1>Sementes do Amanhã: O Guardião das Futuras Florestas</h1>
                <p>Com o Curupira como nosso aliado, trabalhamos para reflorestar a Amazônia e garantir um futuro sustentável para as próximas gerações.</p>
                <a href="#/cadastro" class="btn">Junte-se a Nós</a>
            </div>
        </section>

        <!-- Sobre a Organização -->
        <section id="sobre" class="about">
            <div class="container">
                <h2 class="section-title">Sobre a Sementes do Amanhã</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>A <strong>Sementes do Amanhã</strong> é uma organização não-governamental fundada em 2008 com a missão de proteger e recuperar a Floresta Amazônica. Inspirados pela lenda do Curupira, o guardião das florestas, atuamos com determinação e respeito aos saberes tradicionais.</p>
                        <p>Nossa atuação se baseia em três pilares: <strong>reflorestamento</strong> de áreas degradadas, <strong>educação ambiental</strong> e <strong>empoderamento das comunidades locais</strong>. Acreditamos que a conservação da Amazônia é essencial para o equilíbrio climático global e para a sobrevivência de milhares de espécies.</p>
                        <p>Com uma equipe multidisciplinar e o apoio de voluntários e parceiros, já recuperamos mais de 8.000 hectares de floresta e plantamos mais de 3 milhões de árvores nativas.</p>
                    <div>
                </div>
            </div>
        </section>

        <!-- Missão, Visão e Valores -->
        <section id="missao" class="mission">
            <div class="container">
                <h2 class="section-title">Nossa Missão, Visão e Valores</h2>
                <div class="mv-grid">
                    <article class="mv-card">
                        <h3>Missão</h3>
                        <p>Promover a recuperação e conservação da Floresta Amazônica através do reflorestamento, educação ambiental e desenvolvimento sustentável, garantindo a proteção da biodiversidade e o bem-estar das comunidades tradicionais.</p>
                    </article>
                    
                    <article class="mv-card">
                        <h3>Visão</h3>
                        <p>Ser referência na Amazônia como organização transformadora, onde o desenvolvimento econômico convive em harmonia com a preservação ambiental, inspirando uma nova geração de guardiões das florestas.</p>
                    </article>
                    
                    <article class="mv-card">
                        <h3>Valores</h3>
                        <ul>
                            <li>Respeito à biodiversidade e aos saberes tradicionais</li>
                            <li>Compromisso com a transparência e ética</li>
                            <li>Trabalho em parceria com comunidades locais</li>
                            <li>Inovação em soluções sustentáveis</li>
                            <li>Perseverança frente aos desafios</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    `,

    // TEMPLATE DA PÁGINA DE PROJETOS
    projetos: `

    
        <section class="hero">
            <div class="container">
                <h1>Nossos Projetos</h1>
                <p class="texto-grande">Conheça nossas iniciativas para preservar e recuperar a Floresta Amazônica</p>
            </div>
        </section>

        <section class="projects">
            <div class="container">                
                <div class="projects-grid">                    
                    <article class="project-card" id="amazonia-verde">                       
                        <div class="project-content">
                            <!-- Badge de Status -->
                        <div class="project-badges">
                            <span class="badge badge-em-andamento">Em Andamento</span>
                        </div>

                            <h3>Amazônia Verde</h3>
                            <img src="img/iconamazonverd.png" alt="Icone Projeto Amazônia Verde" width="45" height="45">
                            <p>Projeto de reflorestamento de áreas degradadas com espécies nativas, envolvendo comunidades locais no processo de plantio e manutenção.</p>
                            <ul>
                                <li><strong>Meta:</strong> 500.000 árvores plantadas</li>
                                <li><strong>Área:</strong> 1.000 hectares</li>
                                <li><strong>Status:</strong> 65% concluído</li>
                            </ul>
                        
                            <!-- Tags -->
                            <div class="project-tags">
                                <span class="tag tag-reflorestamento">reflorestamento</span>
                                <span class="tag tag-comunidades">comunidades locais</span>
                            </div>
                        </div>
                    </article>
                    
                    <article class="project-card" id="educacao-ambiental">                       
                        <div class="project-content">
                            <!-- Badge de Status -->
                            <div class="project-badges">
                                <span class="badge badge-continuo">Contínuo</span>
                            </div>

                            <h3>Educação Ambiental</h3>
                            <img src="img/iconeducamb.png" alt="Icone Projeto Educação Ambiental" width="45" height="45">
                            <p>Programa de conscientização e educação ambiental para escolas e comunidades da região amazônica.</p>
                            <ul>
                                <li><strong>Público:</strong> 5.000 estudantes/ano</li>
                                <li><strong>Comunidades:</strong> 15 atendidas</li>
                                <li><strong>Impacto:</strong> 3 anos de atividades</li>
                            </ul>
                      
                            <!-- Tags -->
                            <div class="project-tags">
                                <span class="tag tag-educacao">educação</span>
                                <span class="tag tag-sustentabilidade">conscientização</span>
                            </div>
                        </div>
                    </article>
                    
                    <article class="project-card" id="economia-sustentavel">                        
                        <div class="project-content">
                            <!-- Badge de Status -->
                            <div class="project-badges">
                                <span class="badge badge-em-expansao">Em Expansão</span>
                            </div>

                            <h3>Economia Sustentável</h3>
                            <img src="img/iconeconsust2.png" alt="Icone Projeto Economia Sustentável" width="50" height="50">
                            <p>Iniciativas de geração de renda sustentável para comunidades tradicionais através do manejo florestal e produtos da floresta.</p>
                            <ul>
                                <li><strong>Famílias:</strong> 200 beneficiadas</li>
                                <li><strong>Produtos:</strong> Castanha, açaí, óleos</li>
                                <li><strong>Crescimento:</strong> +40% este ano</li>
                            </ul>

                            <!-- Tags -->
                            <div class="project-tags">
                                <span class="tag tag-economia">economia verde</span>
                                <span class="tag tag-biodiversidade">biodiversidade</span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="volunteer">
            <div class="container">
                <h1 class="section-title">Seja um Voluntário</h1>
                
                <div class="volunteer-card">
                    <img src="img/iconvolunt.png" alt="Icone Seja Voluntário" width="120" height="120" style="display: block; margin: 0 auto var(--space-3) auto;">                
                        <p>Nossos voluntários são essenciais para o sucesso de nossos projetos. Oferecemos diversas oportunidades de participação:</p>
                        <ul>
                            <li>Atuação direta em campo no reflorestamento</li>
                            <li>Suporte em atividades de educação ambiental</li>
                            <li>Apoio administrativo e de comunicação</li>
                            <li>Capacitação de comunidades locais</li>
                        </ul>
                        <p>Oferecemos treinamento, alojamento e alimentação para voluntários que atuam em nossos projetos na Amazônia.</p>                        
                    </div>
                    
                    <a href="cadastro.html" class="btn">Quero ser Voluntário</a>
                </div>
            </div>
        </section>

        <section class="donation">
            <div class="container">
                <div class="donation-header">
                    <img src="img/icondoacao.png" alt="Icone Faça Doação" width="32" height="32">
                    <h1 class="section-title">Faça uma Doação</h1>
                </div>
                <div class="donation-content">
                    <div class="donation-text">
                        <p>Sua doação é fundamental para mantermos nossos projetos. Com R$ 50,00 podemos plantar 10 árvores nativas.</p>
                        <div class="donation-options">
                            <div class="donation-option">
                                <h3>R$ 25,00</h3>
                                <img src="img/iconarvp.png" alt="Icone 5 árvores" width="64" height="64">
                                <p>Planta 5 árvores</p>
                            </div>
                            <div class="donation-option">
                                <h3>R$ 50,00</h3>
                                <img src="img/iconarvm.png" alt="Icone 10 árvores" width="64" height="64">
                                <p>Planta 10 árvores</p>
                            </div>
                            <div class="donation-option">
                                <h3>R$ 100,00</h3>
                                <img src="img/iconarvg.png" alt="Icone 20 árvores" width="64" height="64">
                                <p>Planta 20 árvores</p>
                            </div>
                        </div>
                        <p>Também aceitamos doações recorrentes e patrocínios empresariais.</p>
                        <a href="cadastro.html" class="btn">Fazer Doação</a>
                    </div>
                </div>
            </div>
        </section>
         

    `,

    // TEMPLATE DA PÁGINA DE CADASTRO 
    cadastro: `

            <section class="hero">
            <div class="container">
                <h1>Junte-se à Nossa Causa</h1>
                <p class="texto-grande">Preencha o formulário abaixo para se cadastrar como voluntário ou doador</p>
            </div>
        </section>

        <section class="form-section">
            <div class="container">
                <div class="form-container">
                    <form id="form-cadastro" novalidate>
                        <fieldset>
                            <legend>Dados Pessoais</legend>
                            
                            <div class="form-group">
                                <label for="nome-completo" class="required">Nome Completo</label>
                                <input type="text" id="nome-completo" name="nome-completo" required minlength="5" placeholder="Digite seu nome completo">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="email" class="required">E-mail</label>
                                    <input type="email" id="email" name="email" required placeholder="seu@email.com">
                                </div>
                                
                                <div class="form-group">
                                    <label for="cpf" class="required">CPF</label>
                                    <input type="text" id="cpf" name="cpf" required pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00" maxlength="14">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="telefone" class="required">Telefone</label>
                                    <input type="tel" id="telefone" name="telefone" required placeholder="(00) 00000-0000" maxlength="15">
                                </div>
                                
                                <div class="form-group">
                                    <label for="data-nascimento" class="required">Data de Nascimento</label>
                                    <input type="date" id="data-nascimento" name="data-nascimento" required>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Endereço</legend>
                            
                            <div class="form-group">
                                <label for="endereco" class="required">Endereço</label>
                                <input type="text" id="endereco" name="endereco" required placeholder="Rua, número, complemento">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="cep" class="required">CEP</label>
                                    <input type="text" id="cep" name="cep" required pattern="\d{5}-\d{3}" placeholder="00000-000" maxlength="9">
                                </div>
                                
                                <div class="form-group">
                                    <label for="cidade" class="required">Cidade</label>
                                    <input type="text" id="cidade" name="cidade" required placeholder="Sua cidade">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="estado" class="required">Estado</label>
                                <select id="estado" name="estado" required>
                                    <option value="">Selecione seu estado</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                        </fieldset>

                        <fieldset required>
                            <legend>Como você quer ajudar? <span style="color: var(--color-accent)">*</span></legend>
                            
                            <div class="form-group">
                                <label>Tipo de Participação</label>
                                <div class="radio-group">
                                    <label>
                                        <input type="radio" name="participacao" value="voluntario" required>
                                        <span>Voluntário</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="participacao" value="doador">
                                        <span>Doador</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="participacao" value="ambos">
                                        <span>Ambos</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="areas-interesse">Áreas de Interesse (para voluntários)</label>
                                <select id="areas-interesse" name="areas-interesse" multiple>
                                    <option value="reflorestamento">Reflorestamento em campo</option>
                                    <option value="educacao">Educação ambiental</option>
                                    <option value="comunicacao">Comunicação e marketing</option>
                                    <option value="administrativo">Apoio administrativo</option>
                                    <option value="eventos">Organização de eventos</option>
                                </select>
                                <small>Mantenha Ctrl pressionado para selecionar múltiplas opções</small>
                            </div>
                            
                            <div class="form-group">
                                <label for="valor-doacao">Valor da Doação Mensal (para doadores)</label>
                                <input type="number" id="valor-doacao" name="valor-doacao" min="0" step="10" placeholder="R$ 0,00">
                            </div>
                            
                            <div class="form-group">
                                <label for="mensagem">Mensagem ou Observações</label>
                                <textarea id="mensagem" name="mensagem" rows="4" placeholder="Conte-nos um pouco sobre sua motivação..."></textarea>
                            </div>
                        </fieldset>

                        <div class="form-group checkbox-group">
                            <label>
                                <input type="checkbox" name="termos" required>
                                <span class="required">Li e concordo com os termos de uso e política de privacidade</span>
                            </label>
                        </div>

                        <div class="form-group checkbox-group">
                            <label>
                                <input type="checkbox" name="newsletter">
                                <span>Desejo receber newsletter com novidades da ONG</span>
                            </label>
                        </div>

                        <button type="submit" class="btn btn-submit">Enviar Cadastro</button>
                    </form>
                </div>
            </div>
        </section>

    `,
};

// FUNÇÃO DE CARREGAMENTO DINÂMICO — GERENCIA TROCA DE CONTEÚDO ENTRE PÁGINAS
function carregarPagina(pagina) {

    // LOCALIZA CONTAINER PRINCIPAL DA APLICAÇÃO
    const app = document.getElementById('app');

    // VERIFICA EXISTÊNCIA DO CONTAINER E TEMPLATE SOLICITADO
    if (app && templates[pagina]) {

        // INJETA CONTEÚDO HTML DO TEMPLATE NO CONTAINER PRINCIPAL
        app.innerHTML = templates[pagina];
    }
}