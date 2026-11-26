
// =========================================
// ELEMENTOS DA INTERFACE
// =========================================

const telas = document.querySelectorAll(".tela");

const btnMenuJogar = document.getElementById("btn-menu-jogar");

const btnMenuRegras = document.getElementById("btn-menu-regras");

const btnMenuSobre = document.getElementById("btn-menu-sobre");

const botoesNavegacao = document.querySelectorAll("[data-tela]");

const abasManual = document.querySelectorAll(".aba-manual");

const paineisManual = document.querySelectorAll(".painel-manual");

const escadaPremiacao = document.getElementById("escada-premiacao");


const formIdentificacao = document.getElementById(
    "form-identificacao"
);

const inputNomeJogador = document.getElementById(
    "input-nome-jogador"
);

const contadorNome = document.getElementById(
    "contador-nome"
);

const previaNomeJogador = document.getElementById(
    "previa-nome-jogador"
);

const btnIniciarPartida = formIdentificacao.querySelector(
    'button[type="submit"]'
);


// =========================================
// ESTADO DA NAVEGAÇÃO
// =========================================

let telaAtual = "tela-inicial";
let dadosPartidaCarregados = false;
let iniciandoPartida = false;


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

async function iniciarPartidaPeloMenu() {

    if (!dadosPartidaCarregados || iniciandoPartida) return;

    iniciandoPartida = true;
    btnIniciarPartida.disabled = true;

    try {
        definirNomeJogador(inputNomeJogador.value);
        exibirTela("tela-jogo");
        await iniciarJogo();
    } catch (erro) {
        console.error("Erro ao iniciar a partida:", erro);
        exibirTela("tela-identificacao");
        alert("Não foi possível iniciar a partida.");
    } finally {
        iniciandoPartida = false;
        btnIniciarPartida.disabled = !dadosPartidaCarregados;
    }
}

// =========================================
// CARREGAMENTO DOS DADOS
// =========================================

function habilitarInicioPartida() {
    dadosPartidaCarregados = true;
    btnIniciarPartida.disabled = iniciandoPartida;
    btnIniciarPartida.textContent = "▶ INICIAR PARTIDA";
    document.getElementById("aviso-carregamento-partida")?.remove();
}

function informarErroCarregamento(mensagem) {
    dadosPartidaCarregados = false;
    btnIniciarPartida.disabled = true;
    btnIniciarPartida.textContent = "Erro ao carregar dados";

    let aviso = document.getElementById("aviso-carregamento-partida");
    if (!aviso) {
        aviso = document.createElement("p");
        aviso.id = "aviso-carregamento-partida";
        aviso.setAttribute("role", "alert");
        aviso.style.color = "#fca5a5";
        formIdentificacao.appendChild(aviso);
    }
    aviso.textContent = mensagem;
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
// IDENTIFICAÇÃO DO JOGADOR
// =========================================

function atualizarPreviaJogador() {

    const nomeDigitado = inputNomeJogador.value;

    const nomeTratado = nomeDigitado.trim();

    previaNomeJogador.textContent =
        nomeTratado || "Jogador";

    contadorNome.textContent =
        `${nomeDigitado.length}/30`;

}


function abrirIdentificacao() {

    inputNomeJogador.value = "";

    atualizarPreviaJogador();

    btnIniciarPartida.disabled = !dadosPartidaCarregados || iniciandoPartida;

    exibirTela("tela-identificacao");

}


// =========================================
// EVENTOS DE NAVEGAÇÃO
// =========================================

btnMenuJogar.addEventListener(
    "click",
    abrirIdentificacao
);  


btnMenuRegras.addEventListener("click", () => {

    renderizarEscadaPremiacao();

    exibirAbaManual("manual-regras");

    exibirTela("tela-regras");

});


btnMenuSobre.addEventListener("click", () => {

    exibirTela("tela-sobre");

});


botoesNavegacao.forEach(botao => {

    botao.addEventListener("click", () => {

        exibirTela(botao.dataset.tela);

    });

});


// =========================================
// EVENTOS DA IDENTIFICAÇÃO
// =========================================

inputNomeJogador.addEventListener(
    "input",
    atualizarPreviaJogador
);


formIdentificacao.addEventListener("submit", evento => {
    evento.preventDefault();
    iniciarPartidaPeloMenu();
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

btnIniciarPartida.disabled = !dadosPartidaCarregados;
if (!dadosPartidaCarregados) {
    btnIniciarPartida.textContent = "Carregando dados...";
}
exibirTela("tela-inicial");
