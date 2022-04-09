// intial  data
let square = {
    a1: '' , a2: '' , a3: '' ,
    b1: 'x' , b2: 'o' , b3: '' ,
    c1: '' , c2: '' , c3:''
};
let player = '' ;
let warning = '';
let playing = false;


// Events
document.querySelector('.reset').addEventListener('click',reset)
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener('click',itemClick)
})
// Funçtion
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing==true && square[item] === ''){
        square[item] = player;
        renderSquare();
        tooglePlayer();
    }
}

function reset(){
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0)? 'x' :'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true;
    renderSquare();
    renderInformation();
}

function renderSquare(){   
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.textContent = square[i];
    }

    checkgame()
}

function renderInformation(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function tooglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInformation();
}

function checkgame(){
    if(checkWinnerfor('x')){
        warning = 'O "x" venceu'
        playing =  false;
    } else if (checkWinnerfor('o')){
        warning = 'o "o" venceu';
        playing = false;
    } else if (isfull()){
        warning = 'deu empate'
    }
}

function checkWinnerfor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c3',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon){
            return true;
        }
    }
    return false;
}

function isfull() {
    for(let i in square) {
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}