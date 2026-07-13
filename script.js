// Seleção de Elementos

// Divs
const divEntrada = document.querySelector('.main__entrada');
const divCarregamento = document.querySelector('.main__carregamento');
const divErro = document.querySelector('.main__erro');
const divSaida = document.querySelector('.main__saida');

// Entrada
const entradaInput = document.querySelector('.entrada__input');
const entradaButton = document.querySelector('.entrada__buscar');

// Erro
const saidaErro = document.querySelector('.saida__erro');
const erroButton = document.getElementById('erroButton');

// Saída
const saidaAvatar = document.querySelector('.saida__avatar');
const saidaUsername = document.querySelector('.saida__username');
const saidaNome = document.querySelector('.saida__nome');
const saidaBio = document.querySelector('.saida__bio');
const saidaEmpresa = document.querySelector('.saida__empresa');
const saidaRepos = document.querySelector('.saida__repos');
const saidaData = document.querySelector('.saida__data');
const saidaLink = document.querySelector('.saida__link');
const saidaButton = document.getElementById('saidaButton');

// Regex


// Funções

async function buscarPerfil(username) {

    // Verificação básica de username pesquisado
    const usernameDigitado = username.trim()

    if (usernameDigitado === '') {
        divEntrada.style.display = 'none';
        saidaErro.textContent = 'Digite algo para realizar a busca!'
        divErro.style.display = 'flex';
        return;
    }

    // Mostrar tela de carregamento enquanto faz requisição a API
    divEntrada.style.display = 'none';
    divCarregamento.style.display = 'flex';

    // Requisição a API
    const resposta = await fetch(`https://api.github.com/users/${usernameDigitado}`);

    // Checando status da Resposta

    if (resposta.status === 404) {
        divCarregamento.style.display = 'none';
        saidaErro.textContent = 'Erro! Usuário não encontrado!';
        divErro.style.display = 'flex';
        return;
    } else if (resposta.status === 403) {
        divCarregamento.style.display = 'none';
        saidaErro.textContent = 'Erro! Limite de pesquisas alcançado!';
        divErro.style.display = 'flex';
        return;
    }

    const dados = await resposta.json();

    // Esconder tela de carregamento 
    divCarregamento.style.display = 'none';

    // Mostrar elementos da Div de Saída
    divSaida.style.display = 'flex';

    // Exibir resultados
    exibirResultado(dados);
}

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = data.getDate();
    const mes = data.getMonth();
    const mesCorrigido = mes + 1;
    const ano = data.getFullYear();

    const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mesCorrigido).padStart(2, '0')}/${ano}`;
    return dataFormatada; 
}

function exibirResultado(dados) {
    saidaAvatar.src = dados.avatar_url;
    saidaUsername.textContent = dados.login;
    saidaNome.textContent = dados.name;
    saidaBio.textContent = dados.bio;
    if (dados.company === null) {
        saidaEmpresa.textContent = 'Empresa não informada';
    } else {
        saidaEmpresa.textContent = dados.company;
    }
    saidaRepos.textContent = dados.public_repos;
    saidaData.textContent = formatarData(dados.created_at);
    saidaLink.href = dados.html_url;
}

function realizarBusca() {
    const usernameDigitado = entradaInput.value;
    buscarPerfil(usernameDigitado);
}

function retornar() {
    entradaInput.value = '';
    divErro.style.display = 'none';
    divSaida.style.display = 'none';
    divEntrada.style.display = 'flex';
}

// Atribuição de Funções

entradaButton.addEventListener('click', realizarBusca);

entradaInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        realizarBusca();
    }
});

erroButton.addEventListener('click', retornar);
saidaButton.addEventListener('click', retornar);

