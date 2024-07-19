const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Query selector for the score element
const timerDisplay = document.querySelector('#timer'); // Query selector for the timer element
const difficultySelector = document.querySelector('#difficulty');

difficultySelector.addEventListener('change', function() {
  difficulty = this.value;
  clearInterval(gameInterval); 
  startGame(); 
});


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
    return 1500; 
  } else if (difficulty === "normal") {
    return 1000; 
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200); // Random number between 600 and 1200 milliseconds
  } else {
    throw new Error("Invalid difficulty level");
  }
}


function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];


  if (index === lastHole) {
    // If it's the same, recursively call chooseHole again
    return chooseHole(holes);
  }

 
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


function showMole() {
  const hole = chooseHole(holes);
  const mole = hole.querySelector('.mole');

  mole.classList.add('show');
  setTimeout(() => {
    mole.classList.remove('show');
  }, 500); // Example hide delay
}

startButton.addEventListener('click', startGame);

function gameOver() {
  if (time > 0) {
    return showUp(); 
  } else {
    return stopGame(); 
  }
}


function showUp() {
  let delay = setDelay(difficulty); 
  const hole = chooseHole(holes); 

  return showAndHide(hole, delay);
}


function showAndHide(hole, delay) {
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); 
    gameOver();
  }, delay);

  return timeoutID;
}


function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}


function updateScore() {
  points++;
  score.textContent = points;
  return points;



function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}


let time = 60; 

function updateTimer() {
  if (time >= 0) {
    timerDisplay.textContent = time; 
    time--;
  } else {
    clearInterval(timer); 
 }
}


let time = 60;
let timer;
function startTimer() {
  timer = setInterval(updateTimer, 1000);  
 return timer;
}


function whack(event) {
  updateScore();
  return points;
}


function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
}


function setDuration(duration) {
  time = duration;
  return time;
}


function stopGame() {
  clearInterval(timer);
  return "game stopped";
}


function startGame() {
  clearScore(); 
  setDuration(30); 
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
