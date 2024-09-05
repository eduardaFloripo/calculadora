
const resultado = document.querySelector(".resultado span");

// Seleciona todos os botões que têm a classe 'numeros', ou seja, os números da calculadora.
const numeros = document.querySelectorAll(".numeros");

// Seleciona todos os botões que têm a classe 'item3', que são os operadores matemáticos (+, -, ÷, X).
const operadores = document.querySelectorAll(".item3");

// Seleciona o botão de igual, que tem a classe 'igual'.
const igual = document.querySelector(".igual");

// Seleciona o botão de limpar (AC), que tem a classe 'limpar'.
const limpar = document.querySelector(".limpar");

// Seleciona o botão que altera o sinal (+/-), que tem a classe 'negativo'.
const negativo = document.querySelector(".negativo");

// Seleciona o botão de porcentagem (%), que tem a classe 'porcentagem'.
const porcentagem = document.querySelector(".porcentagem");

// Seleciona o botão de vírgula (,) para números decimais, que tem a classe 'virgula'.
const virgula = document.querySelector(".virgula");

// Variável para armazenar o valor atual digitado (número que está sendo construído).
let valorAtual = "";

// Variável para armazenar o valor anterior, que será usado para operações matemáticas.
let valorAnterior = "";

// Variável para armazenar o operador selecionado (+, -, *, /).
let operador = "";

// Variável booleana para indicar se o cálculo foi finalizado e o resultado foi mostrado.
let resultadoFinal = false;

// Adiciona um evento de clique para cada botão de número.
numeros.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    const valor = e.target.innerText; // Obtém o texto do botão clicado (número).

    // Evita que "0" seja adicionado várias vezes (para evitar algo como "000").
    if (valorAtual === "0" && valor === "0") return;

    // Se o cálculo foi finalizado e o resultado está sendo mostrado, reinicia o valorAtual.
    if (resultadoFinal) {
      valorAtual = valor;
      resultadoFinal = false;
    } else {
      valorAtual += valor; // Adiciona o número clicado ao valorAtual.
    }

    resultado.innerText = valorAtual; // Exibe o valorAtual no display da calculadora.
  });
});

// Adiciona um evento de clique para cada botão de operador.
operadores.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    // Se nenhum número foi digitado, não faz nada.
    if (valorAtual === "") return;

    // Se já existe um valorAnterior e o operador foi escolhido, realiza o cálculo.
    if (valorAnterior !== "") {
      calcular(); // Realiza o cálculo.
    } else {
      valorAnterior = valorAtual; // Armazena o valor atual como valor anterior.
    }
    operador = e.target.innerText; // Define o operador selecionado.
    valorAtual = ""; // Limpa o valorAtual para que o usuário possa digitar o próximo número.
  });
});

// Adiciona um evento de clique para o botão de igual.
igual.addEventListener("click", () => {
  // Se não há valor atual ou valor anterior, não faz nada.
  if (valorAtual === "" || valorAnterior === "") return;

  calcular(); // Realiza o cálculo final.
  resultadoFinal = true; // Define que o cálculo foi finalizado.
});

// Adiciona um evento de clique para o botão de limpar (AC).
limpar.addEventListener("click", () => {
  valorAtual = ""; // Limpa o valorAtual.
  valorAnterior = ""; // Limpa o valorAnterior.
  operador = ""; // Limpa o operador.
  resultado.innerText = "0"; // Reseta o display para "0".
});

// Adiciona um evento de clique para o botão de alterar sinal (+/-).
negativo.addEventListener("click", () => {
  if (valorAtual !== "") {
    // Se há um valor atual digitado...
    valorAtual = (-parseFloat(valorAtual)).toString(); // Inverte o sinal do número.
    resultado.innerText = valorAtual; // Exibe o número com o sinal alterado.
  }
});

// Adiciona um evento de clique para o botão de porcentagem (%).
porcentagem.addEventListener("click", () => {
  if (valorAtual !== "") {
    // Se há um valor atual digitado...
    valorAtual = (parseFloat(valorAtual) / 100).toString(); // Calcula a porcentagem do valor atual.
    resultado.innerText = valorAtual; // Exibe o valor como porcentagem.
    resultadoFinal = true; // Define que o cálculo foi finalizado.
  }
});

// Adiciona um evento de clique para o botão de vírgula (,).
virgula.addEventListener("click", () => {
  if (!valorAtual.includes(",")) {
    // Se o valor atual não contém uma vírgula...
    valorAtual += ","; // Adiciona a vírgula ao valor atual.
    resultado.innerText = valorAtual; // Exibe o valor com a vírgula.
  }
});

// Função que realiza os cálculos matemáticos.
function calcular() {
  let calculo = 0; // Variável para armazenar o resultado do cálculo.
  const anterior = parseFloat(valorAnterior.replace(",", ".")); // Converte valorAnterior para um número.
  const atual = parseFloat(valorAtual.replace(",", ".")); // Converte valorAtual para um número.

  // Verifica qual operador foi selecionado e realiza a operação correspondente.
  switch (operador) {
    case "+":
      calculo = anterior + atual; // Soma.
      break;
    case "-":
      calculo = anterior - atual; // Subtração.
      break;
    case "X":
      calculo = anterior * atual; // Multiplicação.
      break;
    case "÷":
      calculo = anterior / atual; // Divisão.
      break;
  }

  valorAtual = calculo.toString().replace(".", ","); // Converte o resultado de volta para uma string e substitui o ponto por vírgula.
  operador = ""; // Reseta o operador.
  valorAnterior = ""; // Reseta o valorAnterior.
  resultado.innerText = valorAtual; // Exibe o resultado no display.
}
