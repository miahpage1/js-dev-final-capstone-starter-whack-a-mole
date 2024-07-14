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

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500; // 1500 milliseconds
  } else if (difficulty === "normal") {
    return 1000; // 1000 milliseconds
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200); // Random number between 600 and 1200 milliseconds
  } else {
    throw new Error("Invalid difficulty level");
  }
}


let lastHole = -1; // Initialize lastHole with an invalid index

function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];

  // Check if the chosen hole is the same as the last one
  if (index === lastHole) {
    // If it's the same, recursively call chooseHole again
    return chooseHole(holes);
  }

  // Update lastHole to the current index
  lastHole = index;
  return hole;
}

function startGame() {
  // Reset any game state
  points = 0;
  score.textContent = points;
  time = 30; // Example initial time in seconds
  timerDisplay.textContent = time;

  // Start game loop
  gameInterval = setInterval(showMole, setDelay(difficulty));
}

function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

/**

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}


function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole after delay
    gameOver();
  }, delay);
  return timeoutID;
}


function toggleVisibility(hole) {
  hole.classList.toggle('show');
}


function updateScore() {
  points++;
  score.textContent = points;
  return points;
}


function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}


function updateTimer() {
  if (time > 0) {
    timerDisplay.textContent = time;
    time--;
  }
  return time;
}


function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}


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
