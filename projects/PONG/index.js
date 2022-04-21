/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60; 
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE; 

  ////////////////
  ///Game Audio///
  ////////////////
  const Ambience = new Audio('walk.mp3');///music that plays for most of the game
  const MusicGameOver = new Audio('Game_over_yeah.mp3');///gameover music
  const SFXPaddle1Hit = new Audio("Wii Sports - Tennis Sound Effects _ V (mp3cut.net).mp3");///paddle1 hit sfx 
  const SFXPaddle2Hit = new Audio("Wii Sports - Tennis Sound Effects _ V (mp3cut.net) (1).mp3");///paddle2 hit sfx
  const GetThisOverWith = new Audio("Red Sun.mp3");///a very specific Audio file for when a certain score is met 
  const Reset = new Audio("DAISAN NO BAKUDAN BITES ZA DUSTO.mp3");///audio for reset button  
  const Skip = new Audio("Diavolo King Crimson sound effect.mp3");///audio for skip button 
  const SpeedUp = new Audio("closertoheaven.mp3"); ///audio for speed up button
  const NoPointsP2 = new Audio("Vine Boom Sound Effect.mp3"); ///sound for if the p1 is in lead by a lot 
  const NoPointsP1 = new Audio("VATS.mp3"); ///sound for if the p2 is in lead by a lot  
  const wallBounceSFX = new Audio("Wii Sports - Tennis Sound Effects _ V (mp3cut.net) (3).mp3"); ///sfx for ball bounce on top
  const wallBounceSFX2 = new Audio("Wii Sports - Tennis Sound Effects _ V (mp3cut.net) (2).mp3"); ///sfx for ball bounce bottom

  var KEYS = { ///gives name of the number value of the keys used in Pong to make it easier for others to read
    "up": 38,
    "down": 40,
    "w": 87,
    "s": 83, 
}; 

var BOARD_WIDTH = $('#board').width()- 20; ///the board's left and right most border
var BOARD_HEIGHT = $('#board').height()- 90;    ///the board's top and bottom most border
var BallBOARD_HEIGHT = $('#ball').height() - 90;   ///the board's top and bottom most border for the ball to bounce off
var BallBOARD_Width = $('#ball').width()- 15; ///the board left and right most border to score

var score1 = 0; ///starting score for player 1
var score2 = 0; ///starting score for player 2

  // Game Item Objects
  function GameItem(id,positionX,positionY,speedX,speedY) { ///the skeleton for the items used in the game (ball and paddle)
    var Item = {  
      id: id,
      positionX: positionX, 
      positionY: positionY,
      speedX: speedX,
      speedY: speedY, 
      width: $(id).width(), 
      height: $(id).height() 
    }; 
  return Item;
};

var paddle1 = GameItem("#paddle1", 5, BOARD_HEIGHT/2, 0, 0); ///left paddle starting position

var paddle2 = GameItem("#paddle2", BOARD_WIDTH- 5, BOARD_HEIGHT/2,0,0); ///right paddle starting position

var ball = GameItem("#ball", BOARD_WIDTH/2, BOARD_HEIGHT/2,(Math.random() > 0.5 ? -3: 3), (Math.random() > 0.5 ? -3: 3));  ///ball randomized start position

Ambience.play();///plays during most of the game
    
  // one-time setup
  let interval =  setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   /// decides how fast the game will be played by frames per second
  $(document).on('keydown', handleKeyDown);     ///makes sure keys are pressed
  $(document).on('keyup', handleKeyUp);         ///makes sure keys are released



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame(){ //calls the helper functions to use
    movement(paddle1);  
    movement(paddle2);   
    movement(ball);   
    redrawItems(paddle1);
    redrawItems(paddle2);
    redrawItems(ball); 
    wall(paddle1);
    wall(paddle2);  
    scorer();  
    paddleBallBounce(); 
    ballWallYAxis(); 
    ballWallXAxis(); 
    scoreToWin();
    getThisOverWith();
    noPoints();
} 
    

  
  /* 
  Called in response to events.
  */
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////  
 

  function wall(paddle){ ///detects if the paddle is inside the baord, if it is not put it back and take away its speed so it doesn't viberate on the edge
    if (paddle.positionY > BOARD_HEIGHT){ 
    paddle.positionY = BOARD_HEIGHT;
    }
     if (paddle.positionY <= 0) {
      paddle.positionY = 2;
     } 
    }
    
    function scorer(){ ///shows the score board
      $("#score2").text("player 1: "+score2); 
      $("#score1").text("player 2: "+score1); 
    }
    function paddleCollide(obj1,obj2){ 
      obj1.leftX = obj1.positionX;
      obj1.topY = obj1.positionY;
      obj1.rightX = obj1.leftX + $(obj1.id).width();
      obj1.bottomY = obj1.positionY + $(obj1.id).height(); ///collision factors for either paddle///
    
      obj2.leftX = obj2.positionX;
      obj2.topY = obj2.positionY;
      obj2.rightX = obj2.leftX + $(obj2.id).width();
      obj2.bottomY = obj2.positionY + $(obj2.id).height(); ///collision factors for ball///
    
    if((obj1.rightX > obj2.leftX)&& 
        (obj1.leftX < obj2.rightX)&& 
        (obj1.bottomY > obj2.topY)&& 
        (obj1.topY < obj2.bottomY)){ 
         return true; //check if any overlap between the two objects
        }else{ 
       return false ;
      }		  
    };  
    function paddleBallBounce(){  ///if the ball width/height overlaps with the paddle, reverse its direction while making it .69 faster
      if (paddleCollide(paddle1,ball)){ 
        ball.speedX = -ball.speedX; 
        ball.speedX += 0.69; 
        paddle1.speedY *= 1.50;
        SFXPaddle1Hit.play();

      } if (paddleCollide(paddle2,ball)){ 
        ball.speedX = -ball.speedX; 
        ball.speedX -= 0.69;  
        paddle2.speedY *= 1.50;
        SFXPaddle2Hit.play();
      }
    }  
    
    ////////////////////////////////////////////////////////////////// 
    //////Mark Cohn Helped with this part the 3 ball functions//////// 
    ////////////////////////////////////////////////////////////////// 
    
    function ballWallYAxis(){ ///detect if the ball hits the top/bottom wall and if so reverse its speed to "bounce" it off
      if(ball.positionY >= BOARD_HEIGHT - BallBOARD_HEIGHT){ 
        ball.speedY = -ball.speedY;  
        wallBounceSFX.play();
      } if (ball.positionY <= BOARD_HEIGHT - BOARD_HEIGHT){ 
        ball.speedY = -ball.speedY; 
         wallBounceSFX2.play();
      }
    } 
    function ballWallXAxis(){ ///detect if the ball hits the side walls and if so reset to middle and give one point to the scoring player
      if(ball.positionX >= BOARD_WIDTH - BallBOARD_Width){ 
        scorer(paddle1);  
        score1++;
        ballReset();
      } if(ball.positionX <= BOARD_WIDTH - BOARD_WIDTH){ 
        scorer(paddle2);  
        score2++;
        ballReset();
      }
    }
    
    function ballReset(){ ///once the ball hits either side wall, reset its position to the middle while also reseting its speed
      ball = GameItem("#ball", BOARD_WIDTH/2, BOARD_HEIGHT/2,(Math.random() > 0.5 ? -3: 3), (Math.random() > 0.5 ? -3: 3));
      paddle1.speedY = 0; 
      paddle2.speedY = 0;
    }
    
      function handleKeyDown(event) { 
        ///controls the right paddle "player 2"
        if (event.which === KEYS.up) {
        paddle2.speedY = -5; 
      }
       if (event.which === KEYS.down) {
        paddle2.speedY = 5; 
      }
      ///controls the left paddle "player 1"
      if (event.which === KEYS.w) {  
        paddle1.speedY = -5; 
      }
      if (event.which === KEYS.s) {
        paddle1.speedY = 5; 
        }
      }
    ///makes sure that the paddle stops when the key is no longer pressed in order to stop it from going up/down infinitely
    function handleKeyUp(event) {
      if (event.which === KEYS.up || event.which === KEYS.down) {
        paddle2.speedY = 0;    
      }
      if (event.which === KEYS.w || event.which === KEYS.s) {
        paddle1.speedY = 0;  
      }
    }  
    ////////////////////////////////////// 
    //////Origional Game Mechanics//////// 
    ////////////////////////////////////// 

   $("#hurry").on("mousedown", function(event){ 
    ball.speedX *= 1.9; 
    ball.speedY *=  1.9;
    SpeedUp.play();
   })

   $("#skip").on("mousedown", function(event){ 
    score1 = 11 + score1; 
    score2 = 11 + score2; 
    Skip.play();
   }); 

    ////////////////////////////////////// 
    //////GAME OVER & GAME VISUALS//////// 
    ////////////////////////////////////// 

      $("#reset").on("mousedown",function(event){ ///resets the game to the very begining    
        window.location.reload();
        });
        Reset.play();

    ///controls what either player's score must be in order for the game to end
    function scoreToWin(){ 
      if(score1 >= 24 || score2 >= 24){ ///can be player1 or player2 score to end the game 
        gameOver();
        return endGame(); 
      } else 
      return false
    }

function movement(obj){  ///moves the paddles/ball
  obj.positionX += obj.speedX; 
  obj.positionY += obj.speedY; 
} 
function redrawItems(obj){  ///starting positions of paddles/ball
  $(obj.id).css("top", obj.positionY);
  $(obj.id).css("left", obj.positionX);
} 
  function gameOver(){ ///gameover "screen" and sound
  $("#Background").attr("src","metal-gear-game-over.gif");   
  MusicGameOver.play();  
  $("#Background").width(BOARD_WIDTH + 20); 
  $("#Background").height(BOARD_HEIGHT + 90);   
  GetThisOverWith.pause();
  Ambience.pause(); 
  } 

  function getThisOverWith(){ ///a very specific change to when the game takes too long
    if(score1 >= 11 && score2 >= 11 ){ 
      $("#Background").attr("src","nanomachines, son..png"); 
      $("#Background").width(BOARD_WIDTH + 20); 
      $("#Background").height(BOARD_HEIGHT + 90);   
      GetThisOverWith.play();  
      ball.speedX *= 1.001;
      ball.speedY *= 1.001;
      paddle1.speedY *= 1.075; 
      paddle2.speedY *= 1.075;
      Ambience.pause();
    } if(score1 == 24 || score2 == 24){ 
      gameOver();  
    }
  } 

  function noPoints(){///changes the screen if one side is winning by a long shot
    if(score1 >= 8 && score2 <= 2){ 
      $("#Background").attr("src","p1nopoints.png"); 
      $("#Background").width(BOARD_WIDTH + 20); 
      $("#Background").height(BOARD_HEIGHT + 90); 
      NoPointsP1.play();   
    } if(score1 <= 2 && score2 >= 8){ 
      $("#Background").attr("src", "p2nopoints.png"); 
      $("#Background").width(BOARD_WIDTH + 20); 
      $("#Background").height(BOARD_HEIGHT + 90);     
      NoPointsP2.play();  
    } if(score1 == 24 || score2 == 24){ 
      gameOver(); 
    } if(score1 > 2 && score2 > 2 && score1 <=10 && score2 <= 10){    
     $("#Background").attr("src","Black.png"); 
     $("#Background").width(BOARD_WIDTH + 20); 
     $("#Background").height(BOARD_HEIGHT + 90);  
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
} 

//////////////////////////////////////////////////////////////////////////////// 
/////////////////////////Paddle Powers////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////// 

///something on the side to do if I have the time 