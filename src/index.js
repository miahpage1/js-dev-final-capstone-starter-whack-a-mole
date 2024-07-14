const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Query selector for the score element
const timerDisplay = document.querySelector('#timer'); // Query selector for the timer element

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  let index = Math.floor(Math.random() * holes.length);
  let hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes); // Recursive call to ensure we get a different hole
  }
  lastHole = hole;
  return hole;
}

/**
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 */
function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

/**
 * Calls the showAndHide() function with a specific delay and a hole.
 */
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole after delay
    gameOver();
  }, delay);
  return timeoutID;
}

/**
 * Adds or removes the 'show' class that is defined in styles.css to 
 * a given hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
}

/**
 * This function increments the points global variable and updates the scoreboard.
 */
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

/**
 * This function clears the score by setting `points = 0`.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the control board with the timer if time > 0.
 */
function updateTimer() {
  if (time > 0) {
    timerDisplay.textContent = time;
    time--;
  }
  return time;
}

/**
 * Starts the timer using setInterval. For each 1000ms (1 second)
 * the updateTimer function get called.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * This is the event handler that gets called when a player
 * clicks on a mole.
 */
function whack(event) {
  updateScore();
  toggleVisibility(event.target); // Hide the mole when clicked
}

/**
 * Adds the 'click' event listeners to the moles.
 */
function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
}

/**
 * Sets the duration of the game.
 */
function setDuration(duration) {
  time = duration;
  return time;
}

/**
 * This function is called when the game is stopped.
 */
function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

/**
 * This is the function that starts the game when the `startButton`
 * is clicked.
 */
function startGame() {
  clearScore();
  setDuration(30); // Example duration, adjust as needed
  startTimer();
  return "game started";
}

// Event listener for the Start button
startButton.addEventListener("click", startGame);

// Function exports for testing (do not modify)
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
