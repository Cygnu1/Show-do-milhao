
// =========================================
// ELEMENTOS DA INTERFACE
// =========================================

const telas = document.querySelectorAll(".tela");

const btnMenuJogar = document.getElementById("btn-menu-jogar");

const btnMenuRegras = document.getElementById("btn-menu-regras");

const btnMenuSobre = document.getElementById("btn-menu-sobre");

const btnIniciarPartida = document.getElementById("btn-iniciar-partida");

const botoesNavegacao = document.querySelectorAll("[data-tela]");

const abasManual = document.querySelectorAll(".aba-manual");

const paineisManual = document.querySelectorAll(".painel-manual");

const escadaPremiacao = document.getElementById("escada-premiacao");


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
// CONTROLE DAS ABAS DO MANUAL
// =========================================

function exibirAbaManual(idPainel) {

    const painelDestino = document.getElementById(idPainel);

    if (
        !painelDestino ||
        !painelDestino.classList.contains("painel-manual")
    ) {

        console.error("Painel do manual inválido:", idPainel);

        return;

    }


    paineisManual.forEach(painel => {

        painel.hidden = painel.id !== idPainel;

    });


    abasManual.forEach(aba => {

        const ativa = aba.dataset.manual === idPainel;

        aba.classList.toggle("ativa", ativa);

        aba.setAttribute("aria-selected", String(ativa));

        aba.tabIndex = ativa ? 0 : -1;

    });

}


// =========================================
// ESCADA DE PREMIAÇÃO
// =========================================

function obterDificuldadeDegrau(indice) {

    if (indice < 5) {

        return {
            classe: "facil",
            nome: "Fácil"
        };

    }

    if (indice < 10) {

        return {
            classe: "medio",
            nome: "Média"
        };

    }

    if (indice < 15) {

        return {
            classe: "dificil",
            nome: "Difícil"
        };

    }

    return {
        classe: "milhao",
        nome: "Milhão"
    };

}


function renderizarEscadaPremiacao() {

    escadaPremiacao.replaceChildren();

    for (let indice = premios.length - 1; indice >= 0; indice--) {

        const dificuldade = obterDificuldadeDegrau(indice);

        const degrau = document.createElement("li");

        degrau.className =
            `degrau-premiacao ${dificuldade.classe}`;


        const numero = document.createElement("span");

        numero.className = "numero-degrau";

        numero.textContent = indice + 1;


        const indicador = document.createElement("span");

        indicador.className = "indicador-degrau";

        indicador.setAttribute("aria-hidden", "true");


        const nomeDificuldade = document.createElement("span");

        nomeDificuldade.className = "dificuldade-degrau";

        nomeDificuldade.textContent = dificuldade.nome;


        const valor = document.createElement("strong");

        valor.className = "valor-degrau";

        valor.textContent = formatarMoeda(premios[indice]);


        degrau.append(
            numero,
            indicador,
            nomeDificuldade,
            valor
        );


        escadaPremiacao.appendChild(degrau);

    }

}



// =========================================
// EVENTOS DE NAVEGAÇÃO
// =========================================

btnMenuJogar.addEventListener("click", () => {

    exibirTela("tela-novo-jogo");

});


btnMenuRegras.addEventListener("click", () => {

    renderizarEscadaPremiacao();

    exibirAbaManual("manual-regras");

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
// EVENTOS DAS ABAS DO MANUAL
// =========================================

abasManual.forEach((aba, indice) => {

    aba.addEventListener("click", () => {

        exibirAbaManual(aba.dataset.manual);

    });


    aba.addEventListener("keydown", evento => {

        let novoIndice = indice;

        switch (evento.key) {

            case "ArrowRight":

                novoIndice =
                    (indice + 1) % abasManual.length;

                break;


            case "ArrowLeft":

                novoIndice =
                    (indice - 1 + abasManual.length)
                    % abasManual.length;

                break;


            case "Home":

                novoIndice = 0;

                break;


            case "End":

                novoIndice = abasManual.length - 1;

                break;


            default:

                return;

        }

        evento.preventDefault();

        const novaAba = abasManual[novoIndice];

        exibirAbaManual(novaAba.dataset.manual);

        novaAba.focus();

    });

});



// =========================================
// TELA INICIAL DA APLICAÇÃO
// =========================================

exibirTela("tela-inicial");
