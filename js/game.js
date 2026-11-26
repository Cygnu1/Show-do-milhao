
// =========================================
// ELEMENTOS DO HTML
// =========================================

const alternativas = document.querySelectorAll(
    "#alternativas button"
);

const botoesAjuda = document.querySelectorAll(
    "#ajudas button"
);

const textoPergunta = document.getElementById(
    "texto-pergunta"
);

const btnConfirmar = document.getElementById(
    "btn-confirmar"
);

const btnParar = document.getElementById(
    "btn-parar"
);

const btnProxima = document.getElementById(
    "btn-proxima"
);

const btnReiniciar = document.getElementById(
    "btn-reiniciar"
);

const feedback = document.getElementById("feedback");

const premiacao = document.getElementById("premiacao");

const numeroPergunta = document.getElementById(
    "numero-pergunta"
);

const valorPergunta = document.getElementById(
    "valor-pergunta"
);

const nivelDificuldade = document.getElementById(
    "nivel-dificuldade"
);

const valorErrar = document.getElementById(
    "valor-errar"
);

const valorParar = document.getElementById(
    "valor-parar"
);

const valorAcertar = document.getElementById(
    "valor-acertar"
);

const btnCartas = document.getElementById(
    "btn-cartas"
);

const btnUniversitarios = document.getElementById(
    "btn-universitarios"
);

const btnPlacas = document.getElementById(
    "btn-placas"
);

const btnPular = document.getElementById(
    "btn-pular"
);

const modalCartas = document.getElementById(
    "modal-cartas"
);

const mensagemCartas = document.getElementById(
    "mensagem-cartas"
);

const cartas = document.querySelectorAll(
    "#baralho .carta"
);

const btnFecharCartas = document.getElementById(
    "btn-fechar-cartas"
);

const modalPular = document.getElementById(
    "modal-pular"
);

const mensagemPular = document.getElementById(
    "mensagem-pular"
);

const pulosRestantes = document.getElementById(
    "pulos-restantes"
);

const btnCancelarPulo = document.getElementById(
    "btn-cancelar-pulo"
);

const btnConfirmarPulo = document.getElementById(
    "btn-confirmar-pulo"
);

const modalPlacas = document.getElementById(
    "modal-placas"
);

const mensagemPlacas = document.getElementById(
    "mensagem-placas"
);

const colunasPlacas = document.querySelectorAll(
    ".coluna-placa"
);

const barrasPlacas = document.querySelectorAll(
    ".barra-placa"
);

const percentuaisPlacas = document.querySelectorAll(
    ".percentual-placa"
);

const btnFecharPlacas = document.getElementById(
    "btn-fechar-placas"
);

const painelUniversitarios = document.getElementById(
    "painel-universitarios"
);

const equipeUniversitarios = document.getElementById(
    "equipe-universitarios"
);

const modalUniversitarios = document.getElementById(
    "modal-universitarios"
);

const perguntaUniversitarios = document.getElementById(
    "pergunta-universitarios"
);

const respostasUniversitarios = document.getElementById(
    "respostas-universitarios"
);

const btnFecharUniversitarios = document.getElementById(
    "btn-fechar-universitarios"
);


const nomeParticipante = document.getElementById(
    "nome-participante"
);


// =========================================
// CONFIGURAÇÕES DO JOGO
// =========================================

const premios = [
    1000,
    2000,
    3000,
    4000,
    5000,
    10000,
    20000,
    30000,
    40000,
    50000,
    100000,
    200000,
    300000,
    400000,
    500000,
    1000000
];

const nomesDificuldade = {
    facil: "Nível fácil",
    medio: "Nível médio",
    dificil: "Nível difícil",
    milhao: "Pergunta do milhão"
};

const limitesAjudas = {
    cartas: 1,
    universitarios: 1,
    placas: 1,
    pulos: 2
};

const probabilidadesCartas = {
    facil: [0.05, 0.15, 0.30, 0.50],
    medio: [0.15, 0.30, 0.35, 0.20],
    dificil: [0.30, 0.40, 0.25, 0.05]
};

const simbolosCartas = [
    "K ♠",
    "A ♥",
    "2 ♣",
    "3 ♦"
];

const quantidadePlateia = 100;

const probabilidadesPlateia = {
    facil: 0.80,
    medio: 0.55,
    dificil: 0.30
};

const quantidadeUniversitarios = 3;

const probabilidadesUniversitarios = {

    facil: {
        especialista: 1.00,
        relacionada: 0.90,
        semRelacao: 0.75
    },

    medio: {
        especialista: 1.00,
        relacionada: 0.75,
        semRelacao: 0.50
    },

    dificil: {
        especialista: 1.00,
        relacionada: 0.50,
        semRelacao: 0.25
    }
};


// =========================================
// VARIÁVEIS DO JOGO
// =========================================

let bancoPerguntas = [];

let perguntasUtilizadas = [];

let perguntaAtual = null;

let alternativaSelecionada = null;

let respostaConfirmada = false;

let rodadaAtual = 0;

let premioAcumulado = 0;

let jogoEncerrado = true;

let ajudasDisponiveis = {
    ...limitesAjudas
};

let alternativasEliminadas = [];

let cartaEscolhida = false;

let bancoUniversitarios = null;

let universitariosSorteados = [];

let nomeJogador = "Jogador";


// =========================================
// FORMATAR VALORES MONETÁRIOS
// =========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}


// =========================================
// DEFINIR DIFICULDADE DA RODADA
// =========================================

function obterDificuldade() {

    if (rodadaAtual < 5) {
        return "facil";
    }

    if (rodadaAtual < 10) {
        return "medio";
    }

    if (rodadaAtual < 15) {
        return "dificil";
    }

    return "milhao";
}


// =========================================
// CALCULAR PREMIAÇÃO
// =========================================

function calcularValorErro() {

    if (rodadaAtual === premios.length - 1) {
        return 0;
    }

    return premioAcumulado / 2;
}


// =========================================
// ATUALIZAR PAINEL DE VALORES
// =========================================

function atualizarPainel() {

    const dificuldade = obterDificuldade();

    const premioAtual = premios[rodadaAtual];

    numeroPergunta.textContent =
        `Pergunta ${rodadaAtual + 1} de ${premios.length}`;

    valorPergunta.textContent =
        `Valendo ${formatarMoeda(premioAtual)}`;

    nivelDificuldade.textContent =
        nomesDificuldade[dificuldade];

    nivelDificuldade.className = dificuldade;

    valorErrar.textContent =
        formatarMoeda(calcularValorErro());

    valorParar.textContent =
        formatarMoeda(premioAcumulado);

    valorAcertar.textContent =
        formatarMoeda(premioAtual);

    premiacao.classList.toggle(
        "milhao",
        dificuldade === "milhao"
    );
}


// =========================================
// CARREGAR BANCO DE PERGUNTAS
// =========================================

async function carregarPerguntas() {

    btnParar.disabled = true;

    botoesAjuda.forEach(function(botao) {

        botao.disabled = true;
    });

    try {

        const [
            respostaPerguntas,
            respostaUniversitarios
        ] = await Promise.all([

            fetch("data/questions.json"),

            fetch("data/universitarios.json")
        ]);

        if (!respostaPerguntas.ok) {

            throw new Error(
                "Não foi possível carregar as perguntas."
            );
        }

        if (!respostaUniversitarios.ok) {

            throw new Error(
                "Não foi possível carregar os universitários."
            );
        }

        bancoPerguntas =
            await respostaPerguntas.json();

        bancoUniversitarios =
            await respostaUniversitarios.json();

        validarBancoPerguntas();

        validarBancoUniversitarios();

        console.log(
            "Perguntas carregadas:",
            bancoPerguntas.length
        );

        console.log(
            "Cursos carregados:",
            bancoUniversitarios.cursos.length
        );

        habilitarInicioPartida();

    } catch (erro) {

        console.error(erro);

        textoPergunta.textContent =
            "Erro ao carregar os dados do jogo.";

        feedback.textContent = erro.message;

        feedback.className = "erro";

        informarErroCarregamento(erro.message);
    }
}


// =========================================
// VALIDAR BANCO DE PERGUNTAS
// =========================================

function validarBancoPerguntas() {

    if (!Array.isArray(bancoPerguntas)) {
        throw new Error("O banco deve ser um array.");
    }

    const ids = new Set();

    bancoPerguntas.forEach(function(pergunta) {

        if (
            !pergunta ||
            !Number.isInteger(pergunta.id) ||
            ids.has(pergunta.id) ||
            typeof pergunta.pergunta !== "string" ||
            !Array.isArray(pergunta.alternativas) ||
            pergunta.alternativas.length !== 4 ||
            !pergunta.alternativas.every(
                alternativa => typeof alternativa === "string"
            ) ||
            !Number.isInteger(pergunta.resposta) ||
            pergunta.resposta < 0 ||
            pergunta.resposta > 3 ||
            typeof pergunta.categoria !== "string" ||
            pergunta.categoria.trim().length === 0 ||
            !Object.hasOwn(
                nomesDificuldade,
                pergunta.dificuldade
            )
        ) {
            throw new Error(
                "Existe uma pergunta inválida no banco."
            );
        }

        ids.add(pergunta.id);
    });

    const quantidadesMinimas = {
        facil: 5 + limitesAjudas.pulos,
        medio: 5 + limitesAjudas.pulos,
        dificil: 5 + limitesAjudas.pulos,
        milhao: 1
    };

    for (const dificuldade in quantidadesMinimas) {

        const quantidade = bancoPerguntas.filter(
            pergunta =>
                pergunta.dificuldade === dificuldade
        ).length;

        if (quantidade < quantidadesMinimas[dificuldade]) {

            throw new Error(
                `Perguntas insuficientes no nível ${dificuldade}.`
            );
        }
    }
}

function validarBancoUniversitarios() {

    const banco = bancoUniversitarios;

    if (
        !banco ||
        !Array.isArray(banco.nomes) ||
        !Array.isArray(banco.cursos) ||
        !banco.frases
    ) {

        throw new Error(
            "Banco de universitários inválido."
        );
    }

    const textoValido = texto =>
        typeof texto === "string" &&
        texto.trim().length > 0;

    if (
        banco.nomes.length < quantidadeUniversitarios ||
        !banco.nomes.every(textoValido) ||
        new Set(banco.nomes).size !== banco.nomes.length
    ) {

        throw new Error(
            "Banco de nomes inválido ou insuficiente."
        );
    }

    if (
        banco.cursos.length < quantidadeUniversitarios
    ) {

        throw new Error(
            "Quantidade insuficiente de cursos."
        );
    }

    const nomesCursos = new Set();

    banco.cursos.forEach(function(curso) {

        if (
            !curso ||
            !textoValido(curso.nome) ||
            nomesCursos.has(curso.nome) ||
            !Array.isArray(curso.especialidades) ||
            !Array.isArray(curso.relacionadas) ||
            !curso.especialidades.every(textoValido) ||
            !curso.relacionadas.every(textoValido)
        ) {

            throw new Error(
                "Existe um curso inválido no banco."
            );
        }

        nomesCursos.add(curso.nome);
    });

    const niveis = [
        "especialista",
        "relacionada",
        "semRelacao"
    ];

    niveis.forEach(function(nivel) {

        const frases = banco.frases[nivel];

        if (
            !Array.isArray(frases) ||
            frases.length === 0 ||
            !frases.every(function(frase) {

                return (
                    textoValido(frase) &&
                    frase.includes("{alternativa}")
                );
            })
        ) {

            throw new Error(
                `Banco de frases inválido: ${nivel}.`
            );
        }
    });
}


// =========================================
// IDENTIFICAÇÃO DO JOGADOR
// =========================================

function definirNomeJogador(nome) {

    const nomeTratado = String(nome ?? "")
        .trim()
        .slice(0, 30);

    nomeJogador = nomeTratado || "Jogador";

    atualizarPainelJogador();

}


function atualizarPainelJogador() {

    nomeParticipante.textContent = nomeJogador;

}



// =========================================
// INICIAR OU REINICIAR JOGO
// =========================================

function iniciarJogo() {

    atualizarPainelJogador();

    perguntasUtilizadas = [];

    perguntaAtual = null;

    alternativaSelecionada = null;

    respostaConfirmada = false;

    rodadaAtual = 0;

    premioAcumulado = 0;

    jogoEncerrado = false;

    ajudasDisponiveis = {
        ...limitesAjudas
    };

    alternativasEliminadas = [];

    cartaEscolhida = false;

    // Sortear nova equipe

    sortearUniversitarios();

    renderizarEquipeUniversitarios();

    // Limpar respostas da partida anterior

    respostasUniversitarios.replaceChildren();

    carregarNovaPergunta();
}



// =========================================
// SORTEAR PERGUNTA
// =========================================

function obterPerguntasDisponiveis() {

    const dificuldade = obterDificuldade();

    return bancoPerguntas.filter(
        function(pergunta) {

            return (
                pergunta.dificuldade === dificuldade &&
                !perguntasUtilizadas.includes(pergunta.id)
            );
        }
    );
}

function sortearPergunta() {

    const perguntasDisponiveis =
        obterPerguntasDisponiveis();

    if (perguntasDisponiveis.length === 0) {

        return null;
    }

    const indiceAleatorio = Math.floor(
        Math.random() * perguntasDisponiveis.length
    );

    const pergunta =
        perguntasDisponiveis[indiceAleatorio];

    perguntasUtilizadas.push(pergunta.id);

    return pergunta;
}


// =========================================
// CARREGAR NOVA PERGUNTA
// =========================================

function carregarNovaPergunta() {

    if (jogoEncerrado) {
        return;
    }

    perguntaAtual = sortearPergunta();

    if (perguntaAtual === null) {

        encerrarJogo(
            "Não há perguntas disponíveis neste nível.",
            premioAcumulado
        );

        return;
    }

    alternativaSelecionada = null;

    respostaConfirmada = false;

    alternativasEliminadas = [];

    cartaEscolhida = false;

    atualizarPainel();

    textoPergunta.textContent =
        perguntaAtual.pergunta;

    alternativas.forEach(function(botao, indice) {

        botao.textContent =
            `${indice + 1} - ${perguntaAtual.alternativas[indice]}`;

        botao.classList.remove(
            "selecionada",
            "correta",
            "incorreta",
            "eliminada"
        );

        botao.disabled = false;
    });

    feedback.textContent = "";

    feedback.className = "";

    btnConfirmar.disabled = true;

    btnParar.disabled = false;

    btnProxima.hidden = true;

    btnReiniciar.hidden = true;

    atualizarBotoesAjuda();

    console.log(
        "Rodada:",
        rodadaAtual + 1
    );

    console.log(
        "Pergunta:",
        perguntaAtual.id
    );

    console.log(
        "Dificuldade:",
        perguntaAtual.dificuldade
    );

    console.log(
        "Prêmio acumulado:",
        premioAcumulado
    );
}


// =========================================
// SELECIONAR ALTERNATIVA
// =========================================

function selecionarAlternativa(indice) {

    if (
        jogoEncerrado ||
        respostaConfirmada ||
        perguntaAtual === null ||
        alternativasEliminadas.includes(indice)
    ) {
        return;
    }

    alternativaSelecionada = indice;

    alternativas.forEach(function(botao) {

        botao.classList.remove("selecionada");
    });

    alternativas[indice]
        .classList.add("selecionada");

    btnConfirmar.disabled = false;
}


// =========================================
// BLOQUEAR CONTROLES
// =========================================

function bloquearControles() {

    alternativas.forEach(function(botao) {
        botao.disabled = true;
    });

    botoesAjuda.forEach(function(botao) {
        botao.disabled = true;
    });

    btnConfirmar.disabled = true;

    btnParar.disabled = true;

    painelUniversitarios.classList.add(
        "indisponivel"
    );
}


// =========================================
// CONFIRMAR RESPOSTA
// =========================================

function confirmarResposta() {

    if (
        jogoEncerrado ||
        alternativaSelecionada === null ||
        respostaConfirmada ||
        perguntaAtual === null
    ) {
        return;
    }

    respostaConfirmada = true;

    const respostaCorreta = perguntaAtual.resposta;

    alternativas[alternativaSelecionada]
        .classList.remove("selecionada");

    bloquearControles();

    // RESPOSTA CORRETA

    if (alternativaSelecionada === respostaCorreta) {

        alternativas[alternativaSelecionada]
            .classList.add("correta");

        premioAcumulado = premios[rodadaAtual];

        // PERGUNTA DO MILHÃO

        if (rodadaAtual === premios.length - 1) {

            encerrarJogo(
                "PARABÉNS! VOCÊ É MILIONÁRIO!",
                premioAcumulado,
                "vitoria"
            );

            return;
        }

        feedback.textContent =
            `Resposta correta! Você conquistou ${formatarMoeda(premioAcumulado)}!`;

        feedback.className = "acerto";

        btnProxima.hidden = false;

    } else {

        // RESPOSTA INCORRETA

        alternativas[alternativaSelecionada]
            .classList.add("incorreta");

        alternativas[respostaCorreta]
            .classList.add("correta");

        const premioFinal = calcularValorErro();

        encerrarJogo(
            "Resposta incorreta! Fim de jogo.",
            premioFinal,
            "erro"
        );
    }
}


// =========================================
// AVANÇAR RODADA
// =========================================

function avancarRodada() {

    if (
        jogoEncerrado ||
        !respostaConfirmada ||
        perguntaAtual === null ||
        alternativaSelecionada !== perguntaAtual.resposta
    ) {
        return;
    }

    rodadaAtual++;

    carregarNovaPergunta();
}


// =========================================
// PARAR O JOGO
// =========================================

function pararJogo() {

    if (jogoEncerrado || respostaConfirmada) {
        return;
    }

    const confirmacao = window.confirm(
        `Deseja parar e garantir ${formatarMoeda(premioAcumulado)}?`
    );

    if (!confirmacao) {
        return;
    }

    encerrarJogo(
        "Você decidiu parar!",
        premioAcumulado
    );
}


// =========================================
// ENCERRAR JOGO
// =========================================

function encerrarJogo(
    mensagem,
    premioFinal,
    classe = "encerramento"
) {

    jogoEncerrado = true;

    premioAcumulado = premioFinal;

    bloquearControles();

    premiacao.classList.remove("milhao");

    valorPergunta.textContent =
        `Prêmio final: ${formatarMoeda(premioFinal)}`;

    feedback.textContent =
        `${mensagem} Você ganhou ${formatarMoeda(premioFinal)}!`;

    feedback.className = classe;

    btnProxima.hidden = true;

    btnReiniciar.hidden = false;

    console.log(
        "Jogo encerrado. Prêmio final:",
        premioFinal
    );
}


// =========================================
// CONTROLE GERAL DAS AJUDAS
// =========================================

function podeUsarAjuda(tipo) {

    return (
        !jogoEncerrado &&
        !respostaConfirmada &&
        perguntaAtual !== null &&
        rodadaAtual < premios.length - 1 &&
        ajudasDisponiveis[tipo] > 0
    );
}


function atualizarBotoesAjuda() {

    btnCartas.textContent =
        `Cartas (${ajudasDisponiveis.cartas})`;

    btnUniversitarios.textContent =
        `Universitários (${ajudasDisponiveis.universitarios})`;

    btnPlacas.textContent =
        `Placas (${ajudasDisponiveis.placas})`;

    btnPular.textContent =
        `Pular (${ajudasDisponiveis.pulos})`;

    btnCartas.disabled =
        !podeUsarAjuda("cartas");

    btnPular.disabled =
        !podeUsarAjuda("pulos") ||
        obterPerguntasDisponiveis().length === 0;

    // Ainda não implementadas

    btnUniversitarios.disabled = true;

    btnPlacas.disabled =
        !podeUsarAjuda("placas");
}

// =========================================
// SORTEIO PONDERADO
// =========================================

function sortearPonderado(probabilidades) {

    const numeroAleatorio = Math.random();

    let acumulado = 0;

    for (
        let i = 0;
        i < probabilidades.length;
        i++
    ) {

        acumulado += probabilidades[i];

        if (numeroAleatorio < acumulado) {

            return i;
        }
    }

    return probabilidades.length - 1;
}

// =========================================
// ABRIR AJUDA DAS CARTAS
// =========================================

function abrirCartas() {

    if (
        !podeUsarAjuda("cartas") ||
        modalCartas.open
    ) {
        return;
    }

    cartaEscolhida = false;

    mensagemCartas.textContent =
        "Escolha uma das quatro cartas.";

    cartas.forEach(function(carta) {

        carta.textContent = "?";

        carta.disabled = false;

        carta.classList.remove("revelada");
    });

    btnFecharCartas.disabled = true;

    modalCartas.showModal();
}

// =========================================
// ELIMINAR ALTERNATIVAS INCORRETAS
// =========================================

function eliminarAlternativas(quantidade) {

    const incorretasDisponiveis = [
        0, 1, 2, 3
    ].filter(function(indice) {

        return (
            indice !== perguntaAtual.resposta &&
            !alternativasEliminadas.includes(indice)
        );
    });

    const quantidadeReal = Math.min(
        quantidade,
        incorretasDisponiveis.length
    );

    for (let i = 0; i < quantidadeReal; i++) {

        const posicao = Math.floor(
            Math.random() *
            incorretasDisponiveis.length
        );

        const indiceEliminado =
            incorretasDisponiveis.splice(
                posicao,
                1
            )[0];

        alternativasEliminadas.push(
            indiceEliminado
        );

        alternativas[indiceEliminado]
            .classList.add("eliminada");

        alternativas[indiceEliminado]
            .classList.remove("selecionada");

        alternativas[indiceEliminado]
            .disabled = true;

        if (
            alternativaSelecionada ===
            indiceEliminado
        ) {

            alternativaSelecionada = null;

            btnConfirmar.disabled = true;
        }
    }

    return quantidadeReal;
}


// =========================================
// ESCOLHER CARTA
// =========================================

function escolherCarta(indice) {

    if (
        cartaEscolhida ||
        !modalCartas.open ||
        !podeUsarAjuda("cartas")
    ) {
        return;
    }

    cartaEscolhida = true;

    ajudasDisponiveis.cartas--;

    const dificuldade = obterDificuldade();

    const quantidade = sortearPonderado(
        probabilidadesCartas[dificuldade]
    );

    cartas.forEach(function(carta) {

        carta.disabled = true;
    });

    cartas[indice].textContent =
        simbolosCartas[quantidade];

    cartas[indice].classList.add(
        "revelada"
    );

    const eliminadas = eliminarAlternativas(
        quantidade
    );

    if (eliminadas === 0) {

        mensagemCartas.textContent =
            "Você tirou o Rei! Nenhuma alternativa foi eliminada.";

    } else if (eliminadas === 1) {

        mensagemCartas.textContent =
            "Uma alternativa incorreta foi eliminada!";

    } else {

        mensagemCartas.textContent =
            `${eliminadas} alternativas incorretas foram eliminadas!`;
    }

    btnFecharCartas.disabled = false;

    atualizarBotoesAjuda();

    console.log(
        "Carta sorteada:",
        simbolosCartas[quantidade]
    );

    console.log(
        "Alternativas eliminadas:",
        alternativasEliminadas
    );

    console.log(
        "Ajudas disponíveis:",
        ajudasDisponiveis
    );
}


// =========================================
// FECHAR AJUDA DAS CARTAS
// =========================================

function fecharCartas() {

    if (!cartaEscolhida) {
        return;
    }

    modalCartas.close();
}

// =========================================
// ABRIR AJUDA DOS PULOS
// =========================================

function abrirPulo() {

    if (
        !podeUsarAjuda("pulos") ||
        modalPular.open ||
        obterPerguntasDisponiveis().length === 0
    ) {
        return;
    }

    mensagemPular.textContent =
        "Deseja substituir a pergunta atual? " +
        "Sua premiação e sua rodada serão mantidas.";

    pulosRestantes.textContent =
        ajudasDisponiveis.pulos;

    modalPular.showModal();
}

// =========================================
// CANCELAR PULO
// =========================================

function cancelarPulo() {

    modalPular.close();
}


// =========================================
// CONFIRMAR PULO
// =========================================

function confirmarPulo() {

    if (
        !modalPular.open ||
        !podeUsarAjuda("pulos") ||
        obterPerguntasDisponiveis().length === 0
    ) {
        return;
    }

    const perguntaDescartada = perguntaAtual.id;

    // Consumir um pulo

    ajudasDisponiveis.pulos--;

    // Fechar a janela

    modalPular.close();

    // Sortear outra pergunta da mesma rodada

    carregarNovaPergunta();

    console.log(
        "Pergunta descartada:",
        perguntaDescartada
    );

    console.log(
        "Nova pergunta:",
        perguntaAtual.id
    );

    console.log(
        "Pulos restantes:",
        ajudasDisponiveis.pulos
    );

    console.log(
        "Rodada mantida:",
        rodadaAtual + 1
    );

    console.log(
        "Premiação mantida:",
        premioAcumulado
    );
}

// =========================================
// OBTER ALTERNATIVAS DISPONÍVEIS
// =========================================

function obterAlternativasDisponiveis() {

    return [0, 1, 2, 3].filter(
        function(indice) {

            return !alternativasEliminadas
                .includes(indice);
        }
    );
}

// =========================================
// CALCULAR PROBABILIDADE DE CONHECIMENTO
// =========================================

function calcularProbabilidadeConhecimento(
    probabilidadeAcerto
) {

    const chanceChute = 1 / 4;

    return (
        (probabilidadeAcerto - chanceChute) /
        (1 - chanceChute)
    );
}

// =========================================
// SIMULAR VOTO INDIVIDUAL
// =========================================

function simularVoto(
    probabilidadeAcerto,
    respostaCorreta,
    disponiveis
) {

    const probabilidadeConhecimento =
        calcularProbabilidadeConhecimento(
            probabilidadeAcerto
        );

    const conheceResposta =
        Math.random() < probabilidadeConhecimento;

    if (conheceResposta) {

        return respostaCorreta;
    }

    const indiceAleatorio = Math.floor(
        Math.random() * disponiveis.length
    );

    return disponiveis[indiceAleatorio];
}

// =========================================
// SIMULAR VOTOS DA PLATEIA
// =========================================

function simularPlateia() {

    const dificuldade = obterDificuldade();

    const probabilidadeAcerto =
        probabilidadesPlateia[dificuldade];

    const respostaCorreta =
        perguntaAtual.resposta;

    const disponiveis =
        obterAlternativasDisponiveis();

    const votos = [0, 0, 0, 0];

    for (let i = 0; i < quantidadePlateia; i++) {

        const voto = simularVoto(
            probabilidadeAcerto,
            respostaCorreta,
            disponiveis
        );

        votos[voto]++;
    }

    return votos;
}

// =========================================
// RENDERIZAR GRÁFICO DA PLATEIA
// =========================================

function renderizarPlacas(votos) {

    const totalVotos = votos.reduce(
        function(total, quantidade) {

            return total + quantidade;
        },
        0
    );

    votos.forEach(function(quantidade, indice) {

        const percentual =
            (quantidade / totalVotos) * 100;

        percentuaisPlacas[indice].textContent =
            `${Number(percentual.toFixed(1))}%`;

        barrasPlacas[indice].style.height =
            `${percentual}%`;

        colunasPlacas[indice].classList.toggle(
            "eliminada",
            alternativasEliminadas.includes(indice)
        );
    });
}

// =========================================
// LIMPAR GRÁFICO DA PLATEIA
// =========================================

function limparGraficoPlacas() {

    barrasPlacas.forEach(function(barra) {

        barra.style.height = "0%";
    });

    percentuaisPlacas.forEach(function(percentual) {

        percentual.textContent = "0%";
    });

    colunasPlacas.forEach(function(coluna) {

        coluna.classList.remove("eliminada");
    });
}

// =========================================
// ABRIR AJUDA DA PLATEIA
// =========================================

function abrirPlacas() {

    if (
        !podeUsarAjuda("placas") ||
        modalPlacas.open
    ) {
        return;
    }

    // Consumir a ajuda

    ajudasDisponiveis.placas--;

    atualizarBotoesAjuda();

    // Simular os votos

    const votos = simularPlateia();

    // Preparar a interface

    limparGraficoPlacas();

    mensagemPlacas.textContent =
        "A decisão final continua sendo sua!";

    modalPlacas.showModal();

    // Animar o gráfico

    requestAnimationFrame(function() {

        requestAnimationFrame(function() {

            if (modalPlacas.open) {

                renderizarPlacas(votos);
            }
        });
    });

    console.log("Votos da plateia:", votos);

    console.log(
        "Resposta correta:",
        perguntaAtual.resposta + 1
    );

    console.log(
        "Ajudas disponíveis:",
        ajudasDisponiveis
    );
}

// =========================================
// FECHAR AJUDA DA PLATEIA
// =========================================

function fecharPlacas() {

    modalPlacas.close();
}

// =========================================
// SORTEAR ELEMENTOS SEM REPETIÇÃO
// =========================================

function sortearSemReposicao(lista, quantidade) {

    const disponiveis = [...lista];

    const sorteados = [];

    for (let i = 0; i < quantidade; i++) {

        const indice = Math.floor(
            Math.random() * disponiveis.length
        );

        const elemento = disponiveis.splice(
            indice,
            1
        )[0];

        sorteados.push(elemento);
    }

    return sorteados;
}

// =========================================
// SORTEAR UNIVERSITÁRIOS
// =========================================

function sortearUniversitarios() {

    const nomes = sortearSemReposicao(

        bancoUniversitarios.nomes,

        quantidadeUniversitarios
    );

    const cursos = sortearSemReposicao(

        bancoUniversitarios.cursos,

        quantidadeUniversitarios
    );

    universitariosSorteados = cursos.map(

        function(curso, indice) {

            return {
                nome: nomes[indice],
                curso: curso.nome,
                especialidades: [
                    ...curso.especialidades
                ],
                relacionadas: [
                    ...curso.relacionadas
                ]
            };
        }
    );

    console.table(
        universitariosSorteados
    );
}

// =========================================
// RENDERIZAR EQUIPE DE UNIVERSITÁRIOS
// =========================================

function renderizarEquipeUniversitarios() {

    equipeUniversitarios.replaceChildren();

    universitariosSorteados.forEach(

        function(universitario) {

            const card =
                document.createElement("div");

            card.className =
                "universitario-card";

            const icone =
                document.createElement("span");

            icone.className =
                "universitario-icone";

            icone.textContent = "🎓";

            const nome =
                document.createElement("strong");

            nome.className =
                "universitario-nome";

            nome.textContent =
                universitario.nome;

            const curso =
                document.createElement("span");

            curso.className =
                "universitario-curso";

            curso.textContent =
                universitario.curso;

            card.append(
                icone,
                nome,
                curso
            );

            equipeUniversitarios.appendChild(
                card
            );
        }
    );
}

// =========================================
// IDENTIFICAR NÍVEL DE CONHECIMENTO
// =========================================

function obterNivelConhecimento(
    universitario,
    categoria
) {

    if (
        universitario.especialidades.includes(
            categoria
        )
    ) {

        return "especialista";
    }

    if (
        universitario.relacionadas.includes(
            categoria
        )
    ) {

        return "relacionada";
    }

    return "semRelacao";
}

// =========================================
// SORTEAR FRASE DO UNIVERSITÁRIO
// =========================================

function sortearFraseUniversitario(
    nivel,
    voto
) {

    const frases =
        bancoUniversitarios.frases[nivel];

    const indice = Math.floor(
        Math.random() * frases.length
    );

    const frase = frases[indice];

    return frase.replace(
        "{alternativa}",
        String(voto + 1)
    );
}

// =========================================
// SIMULAR RESPOSTA DE UM UNIVERSITÁRIO
// =========================================

function simularUniversitario(universitario) {

    const categoria =
        perguntaAtual.categoria;

    const dificuldade =
        obterDificuldade();

    const nivel = obterNivelConhecimento(

        universitario,

        categoria
    );

    const probabilidadeAcerto =
        probabilidadesUniversitarios
            [dificuldade][nivel];

    const disponiveis =
        obterAlternativasDisponiveis();

    const voto = simularVoto(

        probabilidadeAcerto,

        perguntaAtual.resposta,

        disponiveis
    );

    const frase = sortearFraseUniversitario(

        nivel,

        voto
    );

    return {
        nome: universitario.nome,
        curso: universitario.curso,
        nivel: nivel,
        probabilidadeAcerto: probabilidadeAcerto,
        voto: voto,
        frase: frase
    };
}

// =========================================
// CONSULTAR EQUIPE
// =========================================

function simularUniversitarios() {

    return universitariosSorteados.map(

        function(universitario) {

            return simularUniversitario(
                universitario
            );
        }
    );
}


// =========================================
// RENDERIZAR RESPOSTAS DOS UNIVERSITÁRIOS
// =========================================

function renderizarRespostasUniversitarios(
    respostas
) {

    respostasUniversitarios.replaceChildren();

    respostas.forEach(function(resposta, indice) {

        const card =
            document.createElement("div");

        card.className =
            "resposta-universitario";

        card.style.animationDelay =
            `${indice * 0.25}s`;


        // Cabeçalho

        const cabecalho =
            document.createElement("div");

        cabecalho.className =
            "cabecalho-universitario";


        // Avatar

        const avatar =
            document.createElement("div");

        avatar.className =
            "avatar-universitario";

        avatar.textContent = "🎓";


        // Identificação

        const identificacao =
            document.createElement("div");

        identificacao.className =
            "identificacao-universitario";

        const nome =
            document.createElement("strong");

        nome.className =
            "universitario-nome";

        nome.textContent =
            resposta.nome;

        const curso =
            document.createElement("span");

        curso.className =
            "universitario-curso";

        curso.textContent =
            resposta.curso;

        identificacao.append(
            nome,
            curso
        );


        // Voto

        const voto =
            document.createElement("div");

        voto.className =
            "voto-universitario";

        voto.textContent =
            resposta.voto + 1;


        // Montar cabeçalho

        cabecalho.append(
            avatar,
            identificacao,
            voto
        );


        // Frase

        const frase =
            document.createElement("p");

        frase.className =
            "frase-universitario";

        frase.textContent =
            `"${resposta.frase}"`;


        // Montar cartão completo

        card.append(
            cabecalho,
            frase
        );

        respostasUniversitarios.appendChild(
            card
        );
    });
}

// =========================================
// ABRIR AJUDA DOS UNIVERSITÁRIOS
// =========================================

function abrirUniversitarios() {

    if (
        !podeUsarAjuda("universitarios") ||
        modalUniversitarios.open
    ) {

        return;
    }

    ajudasDisponiveis.universitarios--;

    atualizarBotoesAjuda();

    const respostas =
        simularUniversitarios();

    perguntaUniversitarios.textContent =
        perguntaAtual.pergunta;

    renderizarRespostasUniversitarios(
        respostas
    );

    modalUniversitarios.showModal();

    console.table(
        respostas.map(function(resposta) {

            return {
                nome: resposta.nome,
                curso: resposta.curso,
                nivel: resposta.nivel,
                probabilidade:
                    resposta.probabilidadeAcerto,
                voto: resposta.voto + 1,
                acertou:
                    resposta.voto === perguntaAtual.resposta
            };
        })
    );
}


// =========================================
// FECHAR AJUDA DOS UNIVERSITÁRIOS
// =========================================

function fecharUniversitarios() {

    modalUniversitarios.close();
}

function atualizarBotoesAjuda() {

    btnCartas.textContent =
        `Cartas (${ajudasDisponiveis.cartas})`;

    btnUniversitarios.textContent =
        `Universitários (${ajudasDisponiveis.universitarios})`;

    btnPlacas.textContent =
        `Placas (${ajudasDisponiveis.placas})`;

    btnPular.textContent =
        `Pular (${ajudasDisponiveis.pulos})`;

    btnCartas.disabled =
        !podeUsarAjuda("cartas");

    btnPular.disabled =
        !podeUsarAjuda("pulos") ||
        obterPerguntasDisponiveis().length === 0;

    btnPlacas.disabled =
        !podeUsarAjuda("placas");

    btnUniversitarios.disabled =
        !podeUsarAjuda("universitarios");

    painelUniversitarios.classList.toggle(

        "indisponivel",

        !podeUsarAjuda("universitarios")
    );
}

// =========================================
// EVENTOS DOS BOTÕES
// =========================================

alternativas.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const indice = Number(botao.dataset.index);

        selecionarAlternativa(indice);
    });
});

btnCartas.addEventListener(
    "click",
    abrirCartas
);

cartas.forEach(function(carta) {

    carta.addEventListener("click", function() {

        const indice = Number(
            carta.dataset.carta
        );

        escolherCarta(indice);
    });
});

btnFecharCartas.addEventListener(
    "click",
    fecharCartas
);

modalCartas.addEventListener(
    "cancel",
    function(evento) {

        evento.preventDefault();
    }
);

btnPular.addEventListener(
    "click",
    abrirPulo
);

btnCancelarPulo.addEventListener(
    "click",
    cancelarPulo
);

btnConfirmarPulo.addEventListener(
    "click",
    confirmarPulo
);

btnConfirmar.addEventListener(
    "click",
    confirmarResposta
);

btnProxima.addEventListener(
    "click",
    avancarRodada
);

btnParar.addEventListener(
    "click",
    pararJogo
);

btnPlacas.addEventListener(
    "click",
    abrirPlacas
);

btnFecharPlacas.addEventListener(
    "click",
    fecharPlacas
);

btnReiniciar.addEventListener(
    "click",
    iniciarJogo
);

btnUniversitarios.addEventListener(
    "click",
    abrirUniversitarios
);

btnFecharUniversitarios.addEventListener(
    "click",
    fecharUniversitarios
);


// =========================================
// INICIALIZAÇÃO
// =========================================

carregarPerguntas();
