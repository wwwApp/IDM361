var gameBoard;
var gameBoardSize;
var game;

function init() {
  //console.log("Init Called");
  gameBoard = document.querySelectorAll(".c-game__box__number");
  gameBoardSize = gameBoard.length;
  initiateGame();
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
    const shuffleButton = document.querySelector('.c-play-menu--shuffle');
    shuffleButton.classList.add('is-deactivated');
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
    if (correctNum == 100) {
      // Code for when completed the game
    } else {
      // Increment for next validation + fill in process
      correctNum++;

      // Get array of correct numbers and shuffle
      fillBoard(correctNum);
    }
  }
}
