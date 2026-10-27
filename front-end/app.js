let indiceAtual = 0;
let listaLeituras = [];

// Função para carregar os dados ficticios do JSON
async function iniciarSimulacao() {
  try {
    const resposta = await fetch('./dados.json');
    const dados = await resposta.json();
    listaLeituras = dados.leituras;

    // Atualiza a primeira vez imediatamente
    atualizarCamposNaTela();

    // Cria o loop continuo a cada 15 segundos (15000ms)
    setInterval(atualizarCamposNaTela, 15000);
  } catch (erro) {
    console.error('Erro ao ler dados.json:', erro);
  }
}

// Função que injeta os valores no HTML
function atualizarCamposNaTela() {
  if (listaLeituras.length === 0) return;

  const leituraAtual = listaLeituras[indiceAtual];

  // IMPORTANTE: Ajuste os IDs abaixo ('temp', 'umidade', 'peso') 
  // para baterem exatamente com os IDs dos elementos no seu HTML!
  const elTemp = document.getElementById('temp');
  const elUmidade = document.getElementById('umidade');
  const elPeso = document.getElementById('peso');

  if (elTemp) elTemp.innerText = `${leituraAtual.temperatura} °C`;
  if (elUmidade) elUmidade.innerText = `${leituraAtual.umidade} %`;
  if (elPeso) elPeso.innerText = `${leituraAtual.peso} kg`;

  // Avanca no array e volta para o inicio quando chega no fim (Loop Infinito)
  indiceAtual = (indiceAtual + 1) % listaLeituras.length;
}

// Inicia assim que a pagina e carregada pelo navegador
window.addEventListener('DOMContentLoaded', iniciarSimulacao);