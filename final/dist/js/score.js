// Save initial scores array to localStorage
//var scores = new Array(4);
var scores = [
    {'date':'11/12/18', 'score':'05:33'},
    {'date':'11/13/18', 'score':'08:33'}
];
//localStorage.setItem('scores', scores);

/**
 * Init() function to display current score and
 * set top score of the day on page load
 */
var topScore = 0;
function init() {
  var temp = localStorage.getItem("currentScore");
  if (!temp) {
    document.querySelector(".c-score--title").innerHTML =
      "you didn't concentrate today";
    document.querySelector(".c-score--info--record").innerHTML = "concentrate!";
  } else {
    localStorage.removeItem("currentScore");
    var currentScore = formatScore(temp);

    // Display score
    var currentScoreBoard = document.querySelector(".c-score--info--record");
    currentScoreBoard.innerHTML = currentScore;

    // Compare and set top score for today
    if (temp > topScore) {
      topScore = temp;

      // Get formatted today's date to be stored
      var date = new Date();
      var todayDate =
        date.getMonth() +
        "/" +
        date.getDate() +
        "/" +
        date
          .getFullYear()
          .toString()
          .substr(-2);

      // Store today's top score and date, so they can be displayed as past scores
      /* var yesterdayScore = { topScore, todayDate };
      localStorage.setItem("yesterdayScore", yesterdayScore); */
    }
  }

  // If today's date is different from 'yesterdayScore', add yesterday record to scores array
  /* if (todayDate.localeCompare(yesterdayScore[1])) {
    if (scores.length > 4) {
      scores.push(yesterdayScore);
    } else {
      scores.pop(scores[0]);
      scores.push(yesterdayScore);
    }
  } */
  // Populate past scores
  populateScores();
}

init();

/**
 * Funtion to populate past top scores
 */
function populateScores() {
  var yesterdayScore = localStorage.getItem("yesterdayScore");
  var pastScoreBoards = document.querySelectorAll(".c-rank__item__record");
  /* var pastScores = JSON.parse(localStorage.getItem("scores"));

  if (yesterdayScore) {
    for (var i = 0, j=pastScores.length; j >= 0; i++, j--) {
        pastScoreBoards[i].innerHTML = pastScores[j].score;
    }
  } else {
  } */
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
