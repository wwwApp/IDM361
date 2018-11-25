var gameBoard;
var gameBoardSize;
var game;

function init() {
  //console.log('Init Called');
  gameBoard = document.querySelectorAll(".c-game__box__number");
  gameBoardSize = gameBoard.length;
  initiateGame();
  initiateTimer();
}

init();

/**
 * Function to randomize/shuffle the numbers
 */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Function fill board from updated and shuffled array
 */
function fillBoard(startingNum) {
  array = [];
  for (var i = 0; i < gameBoardSize; i++) {
    array.push(startingNum + i);
  }
  shuffle(array);

  for (var i = 0; i < gameBoardSize; i++) {
    gameBoard[i].innerHTML = array[i];
  }
}

/**
 * Function to initiate the game
 */
function initiateGame() {
  fillBoard(1);
}

/**
 * Function to use 'shuffle chance'
 */
var shuffleChance = 1;
function shuffleGame() {
  if (shuffleChance > 0) {
    // Current number will be same as correct number to be clicked
    var currentNum = correctNum;
    fillBoard(currentNum);
    shuffleChance--;

    // Add class to deactivate
    const shuffleButton = document.querySelector(".c-play-menu--shuffle");
    shuffleButton.classList.add("is-deactivated");
  }
}

/**
 * Function to shuffle and fill gameboard when clicked correctly
 */
var correctNum = 1;
function validateNum(selectedButton) {
  // Get the child node - actual number para -
  var selectedNum = selectedButton.children[0].innerHTML;

  if (correctNum == selectedNum) {
    if (correctNum == 2) {
      /******************************************** change it after testing */
      saveRecord();
    } else {
      // Increment for next validation + fill in process
      correctNum++;

      // Get array of correct numbers and shuffle
      fillBoard(correctNum);
    }
  }
}

/**
 * Function to initiate timer and record
 */
var currentRecord = 0;
var timerObj;
var timer = 0;
function initiateTimer() {
  timer = 0;
  var gameRecord = document.querySelector(".c-timer");

  // Increment timer every one second and display it in the proper format
  timerObj = setInterval(function() {
    timer++;
    currentRecord = formatScore(timer);
    gameRecord.innerHTML = currentRecord;
  }, 1000);
}

/**
 * Function to save the score in localStorage for score page
 * and stop the timer
 */
function saveRecord() {
  clearInterval(timerObj);
  // Store timer value instead of currentRecord for top score comparison
  localStorage.setItem("currentScore", timer);

  location.href = "score.html";
}

/**
 * Funcion to format and return score in proper format
 */
function formatScore(scoreInSec) {
  var minuteNum = Math.floor(scoreInSec / 60);
  if (minuteNum < 10) {
    minuteNum = "0" + minuteNum;
  }

  var secondNum = scoreInSec % 60;
  if (secondNum < 10) {
    secondNum = "0" + secondNum;
  }

  return minuteNum + ":" + secondNum;
}
