const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('.score'); 
const timerDisplay = document.querySelector('.timer'); 

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500; // 1500 milliseconds
  } else if (difficulty === "normal") {
    return 1000; // 1000 milliseconds
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200); // Random integer between 600 and 1200 milliseconds
  } else {
    // Handle unexpected input, maybe default to normal difficulty
    return 1000;
  }
}


function chooseHole(holes) {
  const maxIndex = holes.length - 1;
  let index = randomInteger(0, maxIndex);

  // Ensure we don't pick the same hole consecutively
  while (index === lastHole) {
    index = randomInteger(0, maxIndex);
  }

  lastHole = index;
  return holes[index];
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  const time = getTime(); // Assume this function returns the remaining time

  if (time > 0) {
    const timeoutId = showUp(); // Continue the game with a new delay and hole
    return timeoutId;
  } else {
    const gameStopped = stopGame(); // Stop the game if time is up
    return gameStopped;
  }
}


function showUp() {
  const delay = setDelay(); // Assume setDelay() returns the desired delay
  const hole = chooseHole(); // Assume chooseHole() returns the index of the hole
  return showAndHide(hole, delay);
}

 
function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole by adding the 'show' class

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole after delay by removing the 'show' class
    gameOver(); // Check if game should continue or stop
  }, delay);

  return timeoutID;
}

  
  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    
function gameOver() {
  const time = getTime(); // Assume this function returns the remaining time

  if (time > 0) {
    const timeoutId = showUp(); // Continue the game with a new delay and hole
    return timeoutId;
  } else {
    const gameStopped = stopGame(); // Stop the game if time is up
    return gameStopped;
  }
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here

  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // TODO: Write your code here
  // points = 0;
  // score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  // TODO: Write your code here
  // timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // TODO: Write your code here.
  // call updateScore()
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  // TODO: Write your code here

  return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame() {
  setDuration(10); // Set the game duration to 10 seconds
  showUp(); // Start showing moles
  return "game started";
}


startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
