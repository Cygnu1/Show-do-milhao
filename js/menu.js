
// =========================================
// ELEMENTOS DA INTERFACE
// =========================================

const telas = document.querySelectorAll(".tela");

const btnMenuJogar = document.getElementById("btn-menu-jogar");

const btnMenuRegras = document.getElementById("btn-menu-regras");

const btnMenuSobre = document.getElementById("btn-menu-sobre");

const btnIniciarPartida = document.getElementById("btn-iniciar-partida");

const botoesNavegacao = document.querySelectorAll("[data-tela]");


// =========================================
// ESTADO DA NAVEGAÇÃO
// =========================================

let telaAtual = "tela-inicial";


// =========================================
// CONTROLE DAS TELAS
// =========================================

function exibirTela(idTela) {

    const telaDestino = document.getElementById(idTela);

    if (!telaDestino || !telaDestino.classList.contains("tela")) {

        console.error("Tela inválida:", idTela);

        return;
    }

    telas.forEach(tela => {

        tela.hidden = tela.id !== idTela;

    });

    telaAtual = idTela;

    window.scrollTo(0, 0);

    console.log("Tela atual:", telaAtual);
}


// =========================================
// INÍCIO DA PARTIDA
// =========================================

function iniciarPartidaPeloMenu() {

    if (btnIniciarPartida.disabled) {
        return;
    }

    exibirTela("tela-jogo");

    iniciarJogo();
}


// =========================================
// CARREGAMENTO DOS DADOS
// =========================================

function habilitarInicioPartida() {

    btnIniciarPartida.disabled = false;

    btnIniciarPartida.textContent = "Iniciar partida";
}


function informarErroCarregamento(mensagem) {

    btnIniciarPartida.disabled = true;

    btnIniciarPartida.textContent = "Erro ao carregar dados";

    const telaNovoJogo = document.getElementById("tela-novo-jogo");

    const aviso = document.createElement("p");

    aviso.textContent = mensagem;

    aviso.style.color = "#fca5a5";

    telaNovoJogo.appendChild(aviso);
}


// =========================================
// EVENTOS DE NAVEGAÇÃO
// =========================================

btnMenuJogar.addEventListener("click", () => {

    exibirTela("tela-novo-jogo");

});


btnMenuRegras.addEventListener("click", () => {

    exibirTela("tela-regras");

});


btnMenuSobre.addEventListener("click", () => {

    exibirTela("tela-sobre");

});


btnIniciarPartida.addEventListener("click", iniciarPartidaPeloMenu);


botoesNavegacao.forEach(botao => {

    botao.addEventListener("click", () => {

        exibirTela(botao.dataset.tela);

    });

});


// =========================================
// TELA INICIAL DA APLICAÇÃO
// =========================================

exibirTela("tela-inicial");
