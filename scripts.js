/*function*/

function jogarNovamente() {
    document.location.reload(true);
}

function lostGame() {
    // mensagem de alerta
    // limpar tela e exibir tela para jogar novamente

    alert("Você perdeu!!!");

    jogarNovamente();
}

function gameWon() {
    // mensagem de alerta
    // limpar tela e exibir tela para jogar novamente
    alert("Você ganhou!!!");

    jogarNovamente();
}

function mostraPalavraErrada(l) {
    let span = document.createElement("span");

    let txt = document.createTextNode(l);

    span.appendChild(txt);

    let cxLtrErr = document.getElementById("cxLtrErr");

    cxLtrErr.appendChild(span);

    cont2 += 1;
    console.log(cont2);

    if (cont2 == 5) {
        setTimeout(() => {
            lostGame();
        }, 1);
    }
}

function coorDesenho(xM, yM, xL, yL) {
    pincel.fillStyle = "black";
    pincel.beginPath();
    pincel.moveTo(xM, yM);
    pincel.lineWidth = 50;
    pincel.lineCap = "round";
    pincel.lineTo(xL, yL);
    pincel.stroke();
}

function desenhaBoneco() {
    if (t == false) {
        coorDesenho(150, 0, 150, 150);
        t = true;
    } else if (bD == false) {
        coorDesenho(150, 0, 190, 75);
        bD = true;
    } else if (pD == false) {
        coorDesenho(150, 150, 190, 190);
        pD = true;
    } else if (bE == false) {
        coorDesenho(150, 0, 110, 75);
        bE = true;
    } else {
        coorDesenho(150, 150, 110, 190);
        pE = true;
    }
}

// resgata todos os elementos a qual eu quero manipular; para o numero do total de elementos, executo uma busca de zero, se caso encontrar a condição, executa a manipulação e retorna a busca
// se caso o contador igualar ao numero de letras da palavra, ele puxa a tela do vencedor
function mostraPalavraCerta(letra) {
    let tag = document.getElementsByTagName("span");

    for (var i = 0; i < tag.length; i++) {
        if (letra === tag[i].innerText) {
            tag[i].classList.add("displaySpan1");

            console.log(palavraEscolhida.length);
            cont1 += 1;
            if (cont1 == palavraEscolhida.length) {
                setTimeout(() => {
                    gameWon();
                }, 2);
            }
        }
    }
}

// verifica se a letra pressionada é uma letra da palavra ou não
function erroAcerto() {
    let idx = palavraEscolhida.indexOf(letraPress); // a tecla pressioanda é uma letra da palavra escolhida?

    // se acertou, senão errou
    if (idx != -1) {
        mostraPalavraCerta(letraPress);
    } else {
        desenhaBoneco();
        mostraPalavraErrada(letraPress);
    }
}

function letraPressionada() {
    let achei = false;

    for (var i = 0; i <= totLetraPress.length; i++) {
        if (letraPress === totLetraPress[i]) {
            achei = true;
            break;
        }
    }

    if (achei) {
    } else {
        totLetraPress.push(letraPress); // armazena em uma array a letra pressionada
    }

    return achei;
}

// verifica se a tecla pressionada é uma letra e se ja foi pressionada
function verificaTecla() {
    let novaLetra = false;

    for (var i = 0; i < letras.length; i++) {
        if (letraPress === arrLetras[i]) {
            novaLetra = letraPressionada();
        }
    }

    return novaLetra;
}

function teclaPressionada(e) {
    letraPress = e.key.toUpperCase();

    let caractere = arrLetras.indexOf(letraPress);
    if (caractere != -1) {
        let novaLetra = verificaTecla();

        if (novaLetra) {
            alert("A tecla ja foi pressionada!!!");
        } else {
            erroAcerto();
        }
    } else {
        alert("Use apenas letras!!!");
    }
}

function informaDica() {
    for (var i = 0; i < palavras.length; i++) {
        if (palavraEscolhida == palavras[i]) {
            idxDica = i;
        }
    }

    let txt = document.createTextNode(dicas[idxDica]);

    cxTxt.appendChild(txt);
}

function escolherPalavra() {
    let palavra = [];

    palavra = palavras[Math.floor(Math.random() * palavras.length)];

    return palavra;
}

function criaTabuleiro() {
    // sorteia a palavra
    palavraEscolhida = escolherPalavra();

    //criar traços de acordo com o total de letra da palavra
    for (var i = 0; i < palavraEscolhida.length; i++) {
        let span = document.createElement("span");
        let txt = document.createTextNode(palavraEscolhida[i]);
        span.appendChild(txt);
        span.classList.add("displaySpan");
        let tracos = document.getElementById("tracosPalavras");
        tracos.appendChild(span);
    }
}

function manipulaTela() {
    document.querySelector("#namegame").style.display = nG;
    document.querySelector(".btn-s").style.display = btns;
    document.querySelector(".manipularImg").style.width = iW;
    document.querySelector(".manipularImg").style.height = iH;
    document.querySelector(".manipularImg").style.margin = iM;
    document.querySelector(".spaceQuite").style.display = sQ;
    document.querySelector(".tracosPalavras").style.display = tP;
}

function limpaTela() {
    for (var i = 0; i < qtdSpan; i++) {
        let aux = 0;
        letter.removeChild(span[aux]);
    }
}

function iniciarJogo() {
    limpaTela();

    manipulaTela();

    criaTabuleiro();

    informaDica();

    document.body.addEventListener("keydown", function (e) {
        teclaPressionada(e);
    });
}

function adicionarPalavra() {
    const palavraAdicioanda = prompt("Digite a palavra desejada: ");
    const dicaPalavraAdd = prompt("Digite uma dica para a palavra: ");

    palavras.push(palavraAdicioanda.toUpperCase());
    dicas.push(dicaPalavraAdd.toUpperCase());
}

/*variable*/

// manipuladores do canva
let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");

// armazena as palavras secretas
let palavras = ["JAVASCRIPT", "CSS", "HTML"];
let palavraEscolhida = [];
let dicas = ["LINGUAGEM", "STYLE", "DOCUMENT"];
let idxDica;

// variavel auxiliar, global
let letraPress;

// variáveis auxiliares, função limpaTela
let letter = document.getElementById("namegame");
let span = letter.getElementsByTagName("span");
let qtdSpan = span.length;
let btn = document.querySelectorAll(".btn");

// variáveis auxiliares, função manipulaTela
let nG = "none";
let btns = "none";
let iW = "200px";
let iH = "210px";
let iM = "0px 0px -4.7px 0px";
let sQ = "flex";
let tP = "flex";

// variavel auxiliar, informaDica
let cxTxt = document.getElementById("txtDica");

// variável auxiliar, iniciaJogo
let clickLiberado = false;

// variaveis auxiliares, função verificaTecla
let letras = "QWERTYUIOPASDFGHJKLÇZXCVBNM";
let arrLetras = letras.split("");

// variavel auxiliar, letraPressionada
let totLetraPress = [];

// variáveis auxiliar, função desenhaBoneco
let t = false;
let bD = false;
let pD = false;
let bE = false;
let pE = false;

// variável auxiliar, função mostraPalavraCerta
let cont1 = 0;

// variável auxiliar, função mostraPalavraErrada
let cont2 = 0;

/*event*/

// eventos iniciais
btn[0].addEventListener("click", iniciarJogo);
btn[1].addEventListener("click", adicionarPalavra);
