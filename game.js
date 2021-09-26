//all divs which has class of hole
const holes = document.querySelectorAll('.hole');
//divs inside of holes which are indikators of moles/pokemons poping up
const moles = document.querySelectorAll('.mole');
//span with amount of points which You're going to collect
const scoreBoard = document.querySelector('.score');
//initial setup 
let timeUp= false;
let score = 0;
//base of the link to random pokemon sprites (images which, then are randomized by randomPok function)
const baseURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;

let lastHole;
//function for randomizing the pop up frequency
    function randomTime(min,max) {
    return Math.round(Math.random()*(max-min)+min);
}
//function which returns the random hole using indexing of node element 'holes' 
function randomHole(holes) {
    //math.random gives back number between 0(included) and 1(excluded), do after multiplication and rounding result will be a integer x, 0<=x=>5
    const idx = Math.floor(Math.random() * 6);
    //we have 6 elements in holes node, which we are targeting by their indexes, just like in an array
    const hole = holes[idx];
    //if new random hole is the same as the last one, we are looking for another one, to avoid possibility of two moles in the same hole
    if(hole===lastHole){
        console.log('pick another hole!')
        return randomHole(holes);
    }
    lastHole=hole;
    return hole;
    
}

function popup() {

//declaring variables
//time variable describe the frequency of pokemons poping up (numbers in ms)
    const time = randomTime(700,1400);
    // variable used to keep the randomised position of the mole on the grid
    const hole = randomHole(holes)
    // variable of poping up mole div inside of the hole div node
    const mole = hole.querySelector('.mole')
    //there is over 500 pokemons to pick a picture from
    const randomPok = Math.floor(Math.random()*550);
    //setting up the visual of the mole div using base URL/{number}.png notation
    mole.style.background =`url( ${baseURL}${randomPok}.png) `;
    mole.style.backgroundSize = 'cover';
    //adding the class 'up' to know which mole is up and make it easier to stylle the animation
    hole.classList.add('up')
    //after 'time'(variable) mole is getting back to the hole(losing 'up class)
    setTimeout(()=>{
        hole.classList.remove('up');
        //calls function until the time of the round is up
        if(!timeUp) popup();
    },time);
}
//reset of the game - reset the score, calling popup function and setting the time limit for the round for 20s
function startGame() {
    const button = document.querySelector('.start');
    button.disabled = true;

    scoreBoard.textContent= 0;
    score = 0;
    
    timeUp= false;
    popup();
    setTimeout(()=>{
        timeUp=true;
        button.disabled = false;}, 20000)

}
//function responsible for counting points and hiding moles after hit 
function hit (e) {
    //this is the mole node
    const hitBox=this; 
    //adding points for hitting the mole
    score++;
    //updating the score as a text content of the span on the scoreBoard
    scoreBoard.textContent = score;
    //removing the 'up' class from hole div, to hide the mole, and prevent getting more points for one mole
    hitBox.parentElement.classList.remove('up');
}
//handling the click events on moles which are showing, up by hit function
moles.forEach(mole=> mole.addEventListener('mousedown', hit));