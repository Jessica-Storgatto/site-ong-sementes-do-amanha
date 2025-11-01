//    PLATAFORMA WEB – ONG Sementes do Amanhã
//    DESENVOLVIDO POR: Jéssica de Albuquerque Storgatto
//    INSTITUIÇÃO: Universidade Cruzeiro do Sul
//    DISCIPLINA: Desenvolvimento FRONT—END para Web
//    EXPERIÊNCIA PRÁTICA — ENTREGA 3 (INTERATIVIDADE E FUNCIONALIDADES)
//    DATA: 01/11/2025

// SPA-ROUTER.JS: SISTEMA DE ROTEAMENTO CLIENT-SIDE PARA APLICAÇÃO SINGLE PAGE

// EVENT LISTENER PRINCIPAL — DETECTA MUDANÇAS NA URL (HASH) PARA NAVEGAÇÃO
window.addEventListener('hashchange', function() {
    
    // CAPTURA HASH COMPLETA DA URL
    const fullHash = window.location.hash;
    
    // EXTRAI NOME DA ROTA PRINCIPAL — REMOVE "#/" INICIAL E QUALQUER ÂNCORA    
    const route = fullHash.slice(2).split('#')[0] || 'home';
    
    // EXECUTA CARREGAMENTO DINÂMICO DO TEMPLATE CORRESPONDENTE À ROTA
    // FUNÇÃO "carregarPagina" DEFINIDA NO ARQUIVO TEMPLATES.JS
    carregarPagina(route);
    
    // VERIFICA SE URL CONTÉM ÂNCORA (MAIS DE 2 PARTES SEPARADAS POR "#")    
    const hasAnchor = fullHash.split('#').length > 2;
    
    // EXECUTA SCROLL SUAVE PARA O TOPO DA PÁGINA APENAS QUANDO NÃO EXISTE ÂNCORA
    // GARANTE EXPERIÊNCIA CONSISTENTE AO NAVEGAR ENTRE PÁGINAS DIFERENTES
    if (!hasAnchor) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // AGENDA EXECUÇÃO DA FUNÇÃO DE SCROLL PARA ÂNCORA APÓS 100ms
    // DELAY GARANTE QUE CONTEÚDO DA PÁGINA ESTEJA TOTALMENTE CARREGADO NO DOM
    setTimeout(() => {
        scrollToAnchor();
    }, 100);
});

// EVENT LISTENER DE CARREGAMENTO INICIAL - EXECUTADO AO ABRIR/ATUALIZAR A PÁGINA
window.addEventListener('load', function() {
    
    // DETERMINA ROTA INICIAL BASEADA NA URL OU USA "HOME" COMO PADRÃO
    const route = window.location.hash.slice(2) || 'home';
    
    // CARREGA TEMPLATE INICIAL CORRESPONDENTE À ROTA
    carregarPagina(route);
    
    // AGENDA SCROLL PARA ÂNCORA NA CARGA INICIAL DA PÁGINA
    // PERMITE ACESSO DIRETO VIA URL COM ÂNCORA
    setTimeout(() => {
        scrollToAnchor();
    }, 100);
});

// FUNÇÃO ESPECIALIZADA EM SCROLL PARA ELEMENTOS ÂNCORA NA PÁGINA
function scrollToAnchor() {
    // CAPTURA HASH COMPLETA DA URL ATUAL
    const fullHash = window.location.hash;
    
    // EXTRAI NOME DA ÂNCORA (ÚLTIMA PARTE APÓS "#")    
    const anchor = fullHash.split('#').pop();
    
    // VALIDA SE ÂNCORA É VÁLIDA PARA SCROLL:
    // 1. EXISTE E NÃO É VAZIA | 2. NÃO CONTÉM "/" (NÃO É ROTA) | 3. TEM MAIS DE 2 "#" NA URL
    const isValidAnchor = anchor && 
                         anchor !== '' && 
                         !anchor.includes('/') && 
                         fullHash.split('#').length > 2;
    
    if (isValidAnchor) {
        // AGENDA SCROLL COM DELAY DE 200ms PARA GARANTIR:
        // - CARREGAMENTO COMPLETO DO TEMPLATE
        // - RENDERIZAÇÃO DE TODOS OS ELEMENTOS NO DOM
        setTimeout(() => {
            // LOCALIZA ELEMENTO ALVO PELO ID (DEVE CORRESPONDER AO NOME DA ÂNCORA)
            const element = document.getElementById(anchor);
            
            // EXECUTA SCROLL SUAVE SE ELEMENTO FOR ENCONTRADO
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',  
                    block: 'start'       
                });
            }
        }, 200);
    }
}

// LOG DE CONFIRMAÇÃO — INDICA QUE SPA ROUTER FOI INICIALIZADO COM SUCESSO
console.log('SPA ROUTER INICIALIZADO.');