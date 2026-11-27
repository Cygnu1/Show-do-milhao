
// =========================================
// ELEMENTOS DA INTERFACE
// =========================================

const elementoTempoPartida = document.getElementById(
    "tempo-partida"
);

const painelCronometro = document.getElementById(
    "painel-cronometro"
);


// =========================================
// ESTADO DO CRONÔMETRO
// =========================================

let instanteInicioCronometro = null;

let tempoFinalCronometro = 0;

let intervaloCronometro = null;

let cronometroAtivo = false;


// =========================================
// FORMATAÇÃO DO TEMPO
// =========================================

function formatarTempoPartida(milissegundos) {

    const totalSegundos = Math.floor(
        Math.max(0, milissegundos) / 1000
    );

    const horas = Math.floor(
        totalSegundos / 3600
    );

    const minutos = Math.floor(
        (totalSegundos % 3600) / 60
    );

    const segundos = totalSegundos % 60;

    return [

        horas,

        minutos,

        segundos

    ].map(valor => {

        return String(valor).padStart(2, "0");

    }).join(":");

}


// =========================================
// OBTENÇÃO DO TEMPO DECORRIDO
// =========================================

function obterTempoPartida() {

    if (!cronometroAtivo) {

        return tempoFinalCronometro;

    }

    return Math.max(

        0,

        performance.now() - instanteInicioCronometro

    );

}


// =========================================
// ATUALIZAÇÃO DA INTERFACE
// =========================================

function atualizarCronometro() {

    const tempoFormatado = formatarTempoPartida(
        obterTempoPartida()
    );

    if (
        elementoTempoPartida.textContent !== tempoFormatado
    ) {

        elementoTempoPartida.textContent =
            tempoFormatado;

    }

}


// =========================================
// LIMPEZA DO INTERVALO
// =========================================

function limparIntervaloCronometro() {

    if (intervaloCronometro !== null) {

        clearInterval(intervaloCronometro);

        intervaloCronometro = null;

    }

}


// =========================================
// REINICIAR CRONÔMETRO
// =========================================

function reiniciarCronometro() {

    limparIntervaloCronometro();

    instanteInicioCronometro = null;

    tempoFinalCronometro = 0;

    cronometroAtivo = false;

    painelCronometro.classList.remove("encerrado");

    atualizarCronometro();

}


// =========================================
// INICIAR CRONÔMETRO
// =========================================

function iniciarCronometro() {

    reiniciarCronometro();

    instanteInicioCronometro = performance.now();

    cronometroAtivo = true;

    atualizarCronometro();

    intervaloCronometro = setInterval(

        atualizarCronometro,

        200

    );

}


// =========================================
// ENCERRAR CRONÔMETRO
// =========================================

function encerrarCronometro() {

    if (!cronometroAtivo) {

        return tempoFinalCronometro;

    }

    tempoFinalCronometro = obterTempoPartida();

    cronometroAtivo = false;

    instanteInicioCronometro = null;

    limparIntervaloCronometro();

    painelCronometro.classList.add("encerrado");

    atualizarCronometro();

    return tempoFinalCronometro;

}


// =========================================
// INICIALIZAÇÃO
// =========================================

reiniciarCronometro();
