var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var base = new Image();
var pipetop = new Image();
var pipelow = new Image();

bird.src = "images/imgbrd.png";
bg.src = "images/bckg1.jpg";
base.src = "images/base.png";
pipetop.src = "images/pipe1.png";
pipelow.src = "images/pipe2.png";


// some variables

var gap = 75;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/chirp.mpeg";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipetop.height+gap;
        ctx.drawImage(pipetop,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipelow,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipetop.height)-pipetop.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipetop.width && (bY <= pipe[i].y + pipetop.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - base.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(base,0,cvs.height - base.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























