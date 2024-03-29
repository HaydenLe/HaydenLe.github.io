/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 15;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;  
  const appleEat = new Audio('poyo.mp3'); //audio for when the apple gets eaten
  const gameOver = new Audio('KirbyDeathSound.mp3');  //audio for the game over
  
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT= $('#board').height();

  var KEYS = { ///gives name of the number value of the keys used in Snake to make it easier for others to read
    W: 87,  
    A: 65,  
    S: 83,  
    D: 68, 
    R: 82
}; 
    
  // Game Item Objects


function snekParts(id, positionX, positionY, speedX, speedY){ //object function for the snakehead and body
  var noodle = { 
    id: id, 
    positionX: positionX, 
    positionY: positionY, 
    speedX: speedX, 
    speedY: speedY
  }; 
  return noodle;
}; 

var snekHed = snekParts("#snakeHead", 0, 0, 0, 0);  
var sneks = [snekHed]; 
var appy = snekParts("#apple", Math.floor(Math.random()*92) * 20, Math.floor(Math.random()*45) * 20, 0, 0); 
var score = 0; 


// one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                          
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() { ///holds the helper functions and calls them every time
    snakeCollide();
    crunch(); 
    moveBody(); 
    repositionGameItem(snekHed); 
    redrawGameItem(appy);  
    border();  
    scorer();
  }
  
  /* 
  Called in response to events.
  */

function handleKeyDown(event){ //keyboard functions for movement and reset button

   if (event.which === KEYS.A && snekHed.speedX <= 0){  
      snekHed.speedX = -20;
      snekHed.speedY = 0;
         console.log("left arrow pressed"); 
    } if (event.which === KEYS.W  && snekHed.speedY >= 0){ 
      snekHed.speedX = 0;  
      snekHed.speedY = -20; 
         console.log("up arrow pressed"); 
    } if (event.which === KEYS.D  && snekHed.speedX <= 0){  
       snekHed.speedX  = 20; 
       snekHed.speedY = 0;
         console.log("right arrow pressed"); 
    } if (event.which === KEYS.S  && snekHed.speedY >= 0){  
      snekHed.speedX  = 0;  
      snekHed.speedY = 20;
         console.log("down arrow pressed"); 
    } if (event.which === KEYS.R){   
      window.location.reload(); 
    }
}  


function crunch(){ //when the apple is eaten, increase score by 1 and redraw the apple somehwere else
  if (snekHed.positionY === appy.positionY && snekHed.positionX === appy.positionX){ 
    appy.positionX = Math.floor(Math.random()*92) * 20; 
    appy.positionY = Math.floor(Math.random()*45) * 20;   
    score++;    
    addBody();
    appleEat.play();
  } 
} 

function border(){ ///border collision to reset the game/game over
  if (snekHed.positionY > BOARD_HEIGHT - 20 || snekHed.positionY < 0 || snekHed.positionX > BOARD_WIDTH - 20 || snekHed.positionX < 0) {   
    console.log("hit");
    return endGame(); 
  }
}; 
  
  function snakeCollide(){ ///ends the game if the snakehead overlaps the snakebody
    for(var i = 1; i < sneks.length; i++){ 
      if(snekHed.positionY === sneks[i].positionY && snekHed.positionX === sneks[i].positionX) 
     return endGame();
    }
  } 

  function scorer(){ //visible score board
    $("#score").text("player apples eaten: " + score); 
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /////////////Mark Cohn Helped///////////////// 

  
  function addBody(){ //when the apple is eaten,a snake body is replaced where the apple was 
    var newBody = "snakeHead" + sneks.length;  

    $("<div>").addClass("snake").attr("id", newBody).appendTo("#board"); 

    var snekTail = sneks[sneks.length - 1]; 
    
    var pieceMaker = snekParts("#" + newBody, snekTail.positionX, snekTail.positionY, 0,0); 

    redrawGameItem(pieceMaker);

    sneks.push(pieceMaker);
  } 
 
  function moveBody(){   //moves the body one block behind the head so it doesn overlap
    for(var i = sneks.length - 1; i >= 1; i--){ 
      sneks[i].positionX = sneks[i - 1].positionX; 
      sneks[i].positionY = sneks[i - 1].positionY; 
      redrawGameItem(sneks[i]);
    }
  }

  ////////////No More Help/////////////////////

 function repositionGameItem(obj) { //moves the snake/snakebody
    obj.positionX += obj.speedX;
    obj.positionY += obj.speedY; 
    redrawGameItem(snekHed);  
  } 
  
  function redrawGameItem(obj) { //starting positions of snake/apple
    $(obj.id).css("top", obj.positionY);
    $(obj.id).css("left", obj.positionX); 
  }  

/////////////////////////
/////GAME ATTRIBUTES///// 
///////////////////////// 





//////////////////
/////END GAME///// 
//////////////////
  function endGame() {  
    $("#background-video").attr("src","Markiplier there will be bloodshed.mp4"); //video plays when gameover
     gameOver.play();   //audio plats when gameover
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    //$(document).off();
  }
  
}
