///constant variables
const grid = document.querySelector('.grid') ///puts whatever in the grid class in the html
const resultsDisplay = document.querySelector('.results') ///puts whatever in the results class in the html
///regular variables (in the form of let) that can be changed
let currentShooterIndex = 202 ///where the shooter is first placed when starting game
let width = 15 ///wdith of the border/game area
let direction = 1 ///movement of one for shooter and invader
let invadersId ///means nothing as it is, but a place holder to when I want to change the invader in some way
let goingRight = true ///makes it so the code knows from the start that the invaders will be moving right
let aliensRemoved = [] ///where the invaders go to be stored after they have been hit
let results = 0 ///score of how many aliens hit

for (let i = 0; i < 225; i++) { //allows for at maximum 224 sqaure grid
  const square = document.createElement('div') //creates a new div that in turn creates a new square each time the loop is run
  grid.appendChild(square) //puts the square into the actual grid to be seen and affected in game 
} //purpose to to have to the the player, the shot, and the invaders all perfectly fit in a grid so nothing can be slight off and miss/don't work 
//kind of like a the grid for snake

const squares = Array.from(document.querySelectorAll('.grid div'))//a name for the grid and the squares in it

const alienInvaders = [ //a named array that holds the number of "invaders" on the grid
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() { ///creates the invaders and a id class for it so the player can see/interact with them
  for (let i = 0; i < alienInvaders.length; i++) { 
    if(!aliensRemoved.includes(i)) { //sees if a space invader fills a spot where a square should be
      squares[alienInvaders[i]].classList.add('invader') ///replaces the square with invader by adding another invader class
    }
  }
}

draw() //calls the function draw so the invaders can be seen on website

function remove() { //removes the invader from screen/the class list
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter') ////replaces a square with the player shooter


function moveShooter(e) { ///keyboard controls for the player shooter
  squares[currentShooterIndex].classList.remove('shooter') ///in order to move the shooter, removes where it was so it can be replace to where it is going
  switch(e.key) { ///e is the parameter that will be replaced by the actual key from the object
    case 'ArrowLeft': ///the arrow left key value used in place of e
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1 ///as long as the shooter is not at the left most edge, aka divisble by 15 with no remainder, move left
      break ///stops the loop so it doesn't move left infinitely
    case 'ArrowRight' : ///arrow right key value used in place of e
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1 ///as long as the shooter is not at the right most edge, aka divisble by 15 with no remainder, move right
      break ///stops the loop so it doesn't move right infinitely
  }
  squares[currentShooterIndex].classList.add('shooter') ///replaces a square with the player shooter
}
document.addEventListener('keydown', moveShooter) ///if a person holds down the left or right arrow key,
                                                  ///keep on doing the function and do not break it unless the edge is hit or the key is no longer pressed down

function moveInvaders() { ///moves the enemy invaders
  const leftEdge = alienInvaders[0] % width === 0 ///checks if the invaders are on the left edge screen
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1 ///checks if the invaders are on the right edge screen
  remove() ///removes the invader on screen to later redraw left or right where it was to make it seem like it is moving, like with the shooter

  if (rightEdge && goingRight) { ///checks to see if the last invader is on the right edge of screen and is going the right direction
    for (let i = 0; i < alienInvaders.length; i++) { ///for all the invaders in the alienInvader array
      alienInvaders[i] += width +1 ///moves the invader down 1 by adding a whole width to the existing one, the plus one makes sure it doesn't skip the 1st square place
      direction = -1 ///changes the direction from rigght and makes the invaders go left
      goingRight = false ///makes it so the code knows the invaders are going left 
                        /// without the goingRight = false, the invaders would just keep going right and down due to the logic of the previous code and events
    }
  }

  if(leftEdge && !goingRight) { ///checks to see if the last invader is on the left edge of the screen and is going the left direction
    for (let i = 0; i < alienInvaders.length; i++) { ///for all invaders in the alienInvader array
      alienInvaders[i] += width -1 ///moves the invader down one by adding a whole width to the existing one, the minus one makes sure it doesn't skip the 1st square place
      direction = 1 ///changes the direction from negative (left) to postitive(right)
      goingRight = true ///makes it so the code knows the invaders are going right
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction ///moves each invaders in the array 1 square in either direction depending on the previous code
  } 

  draw() ///makes it so the invaders are seen in game

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) { ///checks to see if the invader and the player shooter share the same square, if so do: x 
    resultsDisplay.innerHTML = 'GAME OVER' ///displays a game over screen in text by putting it in the .result html
    clearInterval(invadersId) ///stops all code future execution that has anything to do with invadersID
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) { ///checks to see if the amount of invaders are bigger than the amount of squares, if so do x 
                                              ///aka if the invaders somehow hit the bottom of the grid, "if" since a shooter would have to be hit along the way causing the 
                                              ///the other game over screen that was made previously
      resultsDisplay.innerHTML = 'GAME OVER'  ///displays a game over screen in text by putting it in the .result html
      clearInterval(invadersId) ///stops all code future execution that has anything to do with invadersID
    }
  }
  if (aliensRemoved.length === alienInvaders.length) { ///checks to see if the amount of invaders inside the aliensRemoved array 
                                                      ///is the same as the amount of aliens in the alienInvaders array
    resultsDisplay.innerHTML = 'YOU WIN' ///displays a win screen in text by putting it in the .result html
    clearInterval(invadersId) ///stops all code future execution that has anything to do with invadersID
  }
}
invadersId = setInterval(moveInvaders, 600) ///moves the invaders every 600 miliseconds

function shoot(e) { ///makes the shooter fire a laser
  let laserId ///means nothing as it is, but a place holder to when I want to change the shooter in some way
  let currentLaserIndex = currentShooterIndex ///wherever the current shooter is, that is where the laser will be also
  function moveLaser() { ///gives the laser motion
    squares[currentLaserIndex].classList.remove('laser') ///removes the laser from where it is currently to later draw it in a later location
    currentLaserIndex -= width ///moves it up a whole square
    squares[currentLaserIndex].classList.add('laser') ///redraws the laser so it can be seen moving upwards

    if (squares[currentLaserIndex].classList.contains('invader')) { ///if the laser shares the same square as an invader|basically a collision function
      squares[currentLaserIndex].classList.remove('laser') ///remove the laser from the square
      squares[currentLaserIndex].classList.remove('invader') ///remove the invader from the square
      squares[currentLaserIndex].classList.add('boom') ///add a boom to where the sqaure is

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300) ///remove the boom from the square after 300 miliseconds
      clearInterval(laserId) ///reset the laser, for this case removes the laser/boom after hitting the invader to it doesn't stay on screen

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex) ///passes through the laser index in order to have the square the alien was in to be removed from the array
      aliensRemoved.push(alienRemoved) ///executes the code of alienRemoved 
      results++ ///increases by 1 everytime an invader has been hit
      resultsDisplay.innerHTML = results ///shows the score on screen via the html
      console.log(aliensRemoved) ///shows in the console what invader has been hit via its number value, the lists goes from 1st to last since the last invader has been hit
                                ///EXAMPLE///
                                  ///[24] 
                                  ///[24,17] 
                                  ///[24,17,21]
    }

  }
  switch(e.key) { ///key to use to fire the laser
    case 'ArrowUp': ///use arrow up key to fire laser
      laserId = setInterval(moveLaser, 100) ///move the laser every 100 miliseconds 
  }
}

document.addEventListener('keydown', shoot) ///when key is pressed, shoot the laser from the shooter
