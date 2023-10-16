let gameseg=[];
let userseq=[];

let btns=["red","yellow","green","blue"];

let started=false;
let level=0;
let highestscore=0;//...............................


let h3=document.querySelector("h3");
let btn=document.querySelectorAll(".btn");
btn=document.querySelector(".start")
btn.addEventListener("click",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelup();
    }
    
});
if (started==true){
     btn.addEventListener("click",reset());
}

//reset..............................................
restart=document.querySelector(".restart");
restart.addEventListener("click",function(){
    reset();
    h3.innerHTML=`Level ${level}`;
});



//.........for button flash......................
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
//user flash .............................
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
//...for level up....................
function levelup(){
    userseq=[];
    h3.innerText=`Level ${level}`
    level++;

    //random flash button
    let randomInx=Math.floor(Math.random()*4);
    let randcolor=btns[randomInx];
    let ranbtn=document.querySelector(`.${randcolor}`);
    gameseg.push(randcolor);
    console.log(gameseg);
    gameFlash(ranbtn);//
}
//check match...................
function checkAns(idx){
    if(userseq[idx]===gameseg[idx]){
        if (userseq.length==gameseg.length){
            setTimeout(levelup, 250);
            updatehighestscore();//.................
        }
    }
    else{
        if(level>0){
            h3.innerHTML=`Game over! Your score is <b>${(level-1)*5}</b><br>Press Start and Play the GAME!`;
        }
        document.querySelector("body").style.backgroundColor = "#DC143C";
        sound();
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="black";
        },250);
        reset();
        updatehighestscore();//.....
        
        
    }
}
//...........game over//.........................
function sound(){
    let mySound = new Audio('img/over.mp3');
    mySound.play()
}
//...................button press...................
function btnpress(idx){
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);

    checkAns(userseq.length-1);
}

let allbtn=document.querySelectorAll(".btn");
for (let btn of allbtn){
    btn.addEventListener("click",btnpress);
}
//.....reset after game over...............
function reset() {
    started = false;
    gameseg = [];
    userseq = [];
    level = 0;
}
//.............highest score...............,
let highestScore=document.querySelector("#highest-score");
function updatehighestscore(){
    console.log(level);
    if(level>highestscore){
        highestscore=level;
        highestScore.innerText=`Highest Score:${highestscore*5}`;
        console.log(level+".");
    }
}

