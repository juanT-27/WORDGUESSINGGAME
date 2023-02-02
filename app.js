const wordInputs = document.getElementById("inputs"),
hints= document.getElementById("hint"),
entry= document.getElementById("entry"),
entryBtn= document.getElementById("entryBtn"),
btnReset = document.getElementById("btn-reset"),
btnCheck= document.getElementById("Check");


let lives = document.getElementById("lives"),
wrong= document.getElementById("wrong"),
gameOver= document.getElementById("gmOver"),
gameWin= document.getElementById("gmWon"),
restart = document.getElementById("restart"),
restart2 = document.getElementById("restart2");



let toGuess = "";
let livesPlayer= parseInt(lives.innerHTML) ;

let correctLetters= [];

const startGame= ()=>{
    
    let ranObj = wordsToGuess[Math.floor(Math.random()*wordsToGuess.length)]
     toGuess= ranObj.word;
    console.log(toGuess);

    let spaces= "";
    for(let i=0; i<toGuess.length; i++){
    spaces+=`<input type="text" class="letter" id="letter" disabled  >  ` 
    }

    wordInputs.innerHTML=spaces
    hints.innerHTML= ranObj.clue

}



function send(e){
    
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/)){
        console.log(key)
        if(toGuess.includes(key)){
            for(let i=0; i<toGuess.length; i++){
                if(toGuess[i] === key){
                wordInputs.querySelectorAll("#letter")[i].value= key
                correctLetters.push(key)
                
            }}
        } else {
            wrongLetter (key)
        }
    }

}


function wrongLetter(letter){

    wrong.innerHTML+= letter + " - ";
    
    livesPlayer-= 1;
    lives.innerHTML= livesPlayer;
    if(livesPlayer=== 0 ){

        modals ("gameLost")
        livesPlayer=10
    };






function modals (state){
    if(state=== "gameLost"){
        gameOver.style.display = "flex";
        restart.addEventListener("click", ()=>{
            closeModal("gameLost")
        })
    } 
    }

}

function closeModal(state){

    if(state === "gameLost"){
        gameOver.style.display= "none"
        reset()
    } if(state === "nextLevel"){
        gameWin.style.display= "none"
        reset()
    }
        
}

function checking(){
    if(correctLetters.length=== toGuess.length){
      gameWin.style.display= "flex"
    restart2.addEventListener("click", ()=>{
        closeModal("nextLevel")
    })
    }
    
}


function reset (){
    entry.value= "";
    wordInputs.innerHTML= "";
    hints.innerHTML="";
    lives.innerHTML = 10
    wrong.innerHTML= ""
    gameOver.style.display= "none"
    gameOver.style.display="none"
    correctLetters = []
    startGame ()
    
}




const btnStart= document.getElementById("btn-start").addEventListener("click",startGame)
btnReset.addEventListener("click", reset);
entry.addEventListener("input", send );
btnCheck.addEventListener("click", checking)
document.addEventListener("keydown", ()=> entry.focus());

