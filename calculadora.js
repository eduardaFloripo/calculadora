const resultado = document.querySelector(".resultado span");
const numeros = document.querySelectorAll(".numeros");
const operadores = document.querySelectorAll(".item3");
const igual = document.querySelector(".igual");
const limpar = document.querySelector(".limpar");
const negativo = document.querySelector(".negativo");
const porcentagem = document.querySelector(".porcentagem");
const virgula = document.querySelector(".virgula");
const raiz = document.querySelector(".raiz");
const potencia = document.querySelector(".potencia");
const fatorial = document.querySelector(".fatorial");

let valorAtual = "";
let valorAnterior = "";
let operador = "";
let resultadoFinal = false;

// Função para formatar números para exibição (pt-BR com vírgulas)
function formatNumber(num) {
return parseFloat(num).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
});
}

// Função para substituir vírgulas por pontos para cálculos
function sanitizeNumber(num) {
  return num.replace(",", "."); // Substitui a vírgula pelo ponto para cálculos
}

numeros.forEach((botao) => {
botao.addEventListener("click", (e) => {
    const valor = e.target.innerText;

    if (valorAtual === "0" && valor === "0") return;

    if (resultadoFinal) {
    valorAtual = valor;
    resultadoFinal = false;
    } else {
    valorAtual += valor;
    }

    resultado.innerText = formatNumber(sanitizeNumber(valorAtual));
});
});

operadores.forEach((botao) => {
botao.addEventListener("click", (e) => {
    if (valorAtual === "" && valorAnterior !== "") {
        operador = e.target.innerText;
        return;
    }
    if (valorAtual === "") return;

    if (valorAnterior !== "") {
        calcular();
    } else {
        valorAnterior = valorAtual;
    }

    operador = e.target.innerText;
    valorAtual = "";
});
});

igual.addEventListener("click", () => {
    if (valorAtual === "" || valorAnterior === "") return;

    calcular();
    resultadoFinal = true;
});

limpar.addEventListener("click", () => {
    valorAtual = "";
    valorAnterior = "";
    operador = "";
    resultado.innerText = "0";
});

negativo.addEventListener("click", () => {
if (valorAtual !== "") {
    valorAtual = (-parseFloat(sanitizeNumber(valorAtual))).toString();
    resultado.innerText = formatNumber(sanitizeNumber(valorAtual));
}
});

porcentagem.addEventListener("click", () => {
    if (valorAtual !== "") {
    const atual = parseFloat(sanitizeNumber(valorAtual));

    // Se existe um operador, aplicamos a porcentagem ao valor anterior
    if (valorAnterior !== "" && operador !== "") {
        const anterior = parseFloat(sanitizeNumber(valorAnterior));

      // Aplica a porcentagem sobre o valor anterior
      valorAtual = ((anterior * atual) / 100).toString();
    } else {
      // Caso não tenha valor anterior, aplica a porcentagem diretamente ao valor atual
        valorAtual = (atual / 100).toString();
    }

    // Exibe o valor formatado na tela
    resultado.innerText = formatNumber(valorAtual);
    resultadoFinal = true;
}
});




virgula.addEventListener("click", () => {
    if (!valorAtual.includes(",")) {
    valorAtual += ",";
    resultado.innerText = valorAtual;
    }
});

function calcular() {
let calculo = 0;
const anterior = parseFloat(sanitizeNumber(valorAnterior));
const atual = parseFloat(sanitizeNumber(valorAtual));

switch (operador) {
    case "+":
        calculo = anterior + atual;
        break;
    case "-":
        calculo = anterior - atual;
        break;
    case "x":
      calculo = anterior * atual;
        break;
    case "÷":
        if (atual === 0) {
        calculo = "Erro";
        } else {
        calculo = anterior / atual;
        }
        break;
    }

    if (calculo === "Erro") {
    resultado.innerText = "Erro";
    valorAtual = "";
    valorAnterior = "";
    operador = "";
    } else {
    valorAtual = calculo.toString().replace(".", ",");
    operador = "";
    valorAnterior = valorAtual;
    resultado.innerText = formatNumber(sanitizeNumber(valorAtual));
    }
}
