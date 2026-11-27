
// =========================================
// ELEMENTOS DA INTERFACE
// =========================================

const btnPausar = document.getElementById(
    "btn-pausar"
);

const modalPausa = document.getElementById(
    "modal-pausa"
);

const conteudoMenuPausa = document.getElementById(
    "conteudo-menu-pausa"
);

const conteudoConfirmacaoPausa = document.getElementById(
    "conteudo-confirmacao-pausa"
);

const perguntaPausa = document.getElementById(
    "pergunta-pausa"
);

const premioPausa = document.getElementById(
    "premio-pausa"
);

const btnContinuarPartida = document.getElementById(
    "btn-continuar-partida"
);

const btnReiniciarPausa = document.getElementById(
    "btn-reiniciar-pausa"
);

const btnMenuPausa = document.getElementById(
    "btn-menu-pausa"
);

const tituloConfirmacaoPausa = document.getElementById(
    "titulo-confirmacao-pausa"
);

const mensagemConfirmacaoPausa = document.getElementById(
    "mensagem-confirmacao-pausa"
);

const btnConfirmarAcaoPausa = document.getElementById(
    "btn-confirmar-acao-pausa"
);

const btnCancelarAcaoPausa = document.getElementById(
    "btn-cancelar-acao-pausa"
);


// =========================================
// ESTADO DA PAUSA
// =========================================

let jogoPausado = false;

let acaoPausaPendente = null;


// =========================================
// VERIFICAR OUTROS MODAIS
// =========================================

function existeOutroModalAberto() {

    return document.querySelector(
        "dialog[open]:not(#modal-pausa)"
    ) !== null;

}


// =========================================
// VERIFICAR DISPONIBILIDADE DA PAUSA
// =========================================

function podePausarJogo() {

    return (

        telaAtual === "tela-jogo" &&

        !jogoEncerrado &&

        !jogoPausado &&

        perguntaAtual !== null &&

        !existeOutroModalAberto()

    );

}


// =========================================
// ATUALIZAR BOTÃO DE PAUSA
// =========================================

function atualizarBotaoPausa() {

    btnPausar.disabled = !podePausarJogo();

}


// =========================================
// EXIBIR MENU DE PAUSA
// =========================================

function exibirMenuPausa() {

    acaoPausaPendente = null;

    conteudoMenuPausa.hidden = false;

    conteudoConfirmacaoPausa.hidden = true;

    modalPausa.setAttribute(
        "aria-labelledby",
        "titulo-modal-pausa"
    );

    if (modalPausa.open) {

        btnContinuarPartida.focus();

    }

}


// =========================================
// ATUALIZAR RESUMO DA PARTIDA
// =========================================

function atualizarResumoPausa() {

    perguntaPausa.textContent =
        `${rodadaAtual + 1} de ${premios.length}`;

    premioPausa.textContent =
        formatarMoeda(premioAcumulado);

}


// =========================================
// ABRIR PAUSA
// =========================================

function abrirPausa() {

    if (!podePausarJogo()) {

        return;

    }

    atualizarResumoPausa();

    exibirMenuPausa();

    modalPausa.showModal();

    jogoPausado = true;

    atualizarBotaoPausa();

    btnContinuarPartida.focus();

    console.log("Partida pausada.");

}


// =========================================
// CONTINUAR PARTIDA
// =========================================

function continuarPartida() {

    if (!jogoPausado) {

        return;

    }

    jogoPausado = false;

    acaoPausaPendente = null;

    if (modalPausa.open) {

        modalPausa.close();

    }

    atualizarBotaoPausa();

    btnPausar.focus();

    console.log("Partida retomada.");

}


// =========================================
// SOLICITAR CONFIRMAÇÃO
// =========================================

function solicitarConfirmacaoPausa(acao) {

    if (!jogoPausado || !modalPausa.open) {

        return;

    }

    if (acao !== "reiniciar" && acao !== "sair") {

        return;

    }

    acaoPausaPendente = acao;

    if (acao === "reiniciar") {

        tituloConfirmacaoPausa.textContent =
            "Reiniciar partida?";

        mensagemConfirmacaoPausa.textContent =
            "Uma nova partida será iniciada " +
            "com o mesmo participante.";

        btnConfirmarAcaoPausa.textContent =
            "Sim, reiniciar";

    } else {

        tituloConfirmacaoPausa.textContent =
            "Abandonar partida?";

        mensagemConfirmacaoPausa.textContent =
            "Você retornará ao menu principal.";

        btnConfirmarAcaoPausa.textContent =
            "Sim, abandonar";

    }

    conteudoMenuPausa.hidden = true;

    conteudoConfirmacaoPausa.hidden = false;

    modalPausa.setAttribute(
        "aria-labelledby",
        "titulo-confirmacao-pausa"
    );

    // A opção menos destrutiva recebe o foco.

    btnCancelarAcaoPausa.focus();

}


// =========================================
// CANCELAR CONFIRMAÇÃO
// =========================================

function cancelarConfirmacaoPausa() {

    if (!jogoPausado) {

        return;

    }

    exibirMenuPausa();

}


// =========================================
// LIMPAR ESTADO DA PAUSA
// =========================================

function reiniciarEstadoPausa() {

    jogoPausado = false;

    acaoPausaPendente = null;

    if (modalPausa.open) {

        modalPausa.close();

    }

    exibirMenuPausa();

}


// =========================================
// CONFIRMAR AÇÃO
// =========================================

function confirmarAcaoPausa() {

    if (!jogoPausado || !modalPausa.open) {

        return;

    }

    const acao = acaoPausaPendente;

    if (acao !== "reiniciar" && acao !== "sair") {

        return;

    }

    reiniciarEstadoPausa();

    if (acao === "reiniciar") {

        console.log("Reiniciando partida.");

        iniciarJogo();

        return;

    }

    if (acao === "sair") {

        console.log("Partida abandonada.");

        abandonarPartida();

        exibirTela("tela-inicial");

        btnMenuJogar.focus();

    }

}


// =========================================
// EVENTOS DOS BOTÕES
// =========================================

btnPausar.addEventListener(
    "click",
    abrirPausa
);


btnContinuarPartida.addEventListener(
    "click",
    continuarPartida
);


btnReiniciarPausa.addEventListener(
    "click",
    () => solicitarConfirmacaoPausa("reiniciar")
);


btnMenuPausa.addEventListener(
    "click",
    () => solicitarConfirmacaoPausa("sair")
);


btnCancelarAcaoPausa.addEventListener(
    "click",
    cancelarConfirmacaoPausa
);


btnConfirmarAcaoPausa.addEventListener(
    "click",
    confirmarAcaoPausa
);


// =========================================
// TECLA ESC COM O MODAL ABERTO
// =========================================

modalPausa.addEventListener(
    "cancel",
    evento => {

        evento.preventDefault();

        if (acaoPausaPendente !== null) {

            cancelarConfirmacaoPausa();

            return;

        }

        continuarPartida();

    }
);


// =========================================
// TECLA ESC COM A PARTIDA EM ANDAMENTO
// =========================================

document.addEventListener(
    "keydown",
    evento => {

        if (evento.key !== "Escape") {

            return;

        }

        if (evento.repeat || evento.defaultPrevented) {

            return;

        }

        if (modalPausa.open) {

            // O evento cancel do dialog
            // será responsável por fechar a pausa.

            return;

        }

        if (!podePausarJogo()) {

            return;

        }

        evento.preventDefault();

        abrirPausa();

    }
);


// =========================================
// ATUALIZAR PAUSA AO FECHAR OUTROS MODAIS
// =========================================

document.querySelectorAll(
    "dialog:not(#modal-pausa)"
).forEach(modal => {

    modal.addEventListener(
        "close",
        atualizarBotaoPausa
    );

});


// =========================================
// SINCRONIZAÇÃO DE FECHAMENTO
// =========================================

modalPausa.addEventListener(
    "close",
    () => {

        if (modalPausa.open) {

            return;

        }

        jogoPausado = false;

        acaoPausaPendente = null;

        atualizarBotaoPausa();

    }
);
