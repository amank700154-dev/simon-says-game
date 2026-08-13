let gamseq = [];
let userseq = [];
let btns = ['yellow' , 'red' , 'purple' , 'green'];


let started = false;
let level  = 0;


let h2 = document.querySelector("h2");


let startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", function() {

    if (started == false) {
        console.log("game is started");
        started = true;
        levelup();
        startBtn.style.display = "none";
    }

});
// document.addEventListener("keypress" , function() {
//     if (started == false){
//         console.log("game is started");
//         started = true;
//         levelup();
//     }
// });

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    } , 250);
}

function userflash(btn){
btn.classList.add("userflash");
setTimeout(function () {
    btn.classList.remove("userflash");
} , 250);
}


function levelup(){
    userseq= [];
    level++;
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIdx];
    let randBtn = document.querySelector(`.${randcolor}`);
    gamseq.push(randcolor);
    console.log(gamseq);
    

  
    btnFlash(randBtn);  
}

function checkAns(idx){
   if (userseq[idx] === gamseq[idx]){
      if(userseq.length === gamseq.length){
        setTimeout(levelup , 1000);
      }
   } else{
    h2.innerHTML= `Game is over!  your score was <b> ${level} </b> <br>Press any key to restart`;
    document.querySelector("body").style.borderColor = "red";
    setTimeout(function () {
           document.querySelector("body").style.backgroundColor = "white";
 
    },150);
    reset();
   }  
}

function btnPress(){
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor); 
    
    checkAns(userseq.length -1);
}
  let allBtns = document.querySelectorAll(".btn");
  for (let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gamseq = [];
    userseq = [];
    level = 0; 
}
let menuBtn = document.querySelector("#menuBtn");
let howToPlay = document.querySelector("#howToPlay");

menuBtn.addEventListener("click", function () {

    howToPlay.classList.toggle("show");

});