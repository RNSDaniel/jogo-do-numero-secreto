//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'JOGO DO NÚMERO SECRETO';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = []; // criar a lista de numeros sorteados na funçaõ gerarNumeroAleatorio
let numeroLimite = 5;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

mensagemInicial();
botaoChute();

function botaoChute(){
    document.getElementById('botaoChute').removeAttribute('disabled'); 
}

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); //no codigo html tem uma tag src que
    // chama o resposiveVoice do site "https://code.responsivevoice.org/responsivevoice.js" que le textos a 
    // partir do javaScript. nessa estrutura colocamos o .speak para falar o texto
    //dentro do () primereiro selecionamos o texto, neste caso a funcao que escolhe o texto a ser exibido, 
    // depois a linguagem da fala (pode ser qualquer uma que contida no site "https://code.responsivevoice.org/responsivevoice.js")
    // e por ultimo usando o rate: entre {} ({rate:}), como no codigo acima, ecolhemos a velocidade da fala
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}



function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;

        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('botaoChute').setAttribute('disabled', true);       
        exibirTextoNaTela('p', mensagemTentativas);
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
    }
    tentativas++
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1); //criamo uma variavel para receber o numero aleatorio
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ // verificarmos se o numero aleatorio esta na lista 
        // com a funcao .includes
        return gerarNumeroAleatorio(); //se o numero ja faz parte da lista, geramos outro numero
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //se nao esta na lista incluimos o numeroEscolhido na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    botaoChute();
}
