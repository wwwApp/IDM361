/**
 * Funtion to populate past top scores
 */
function loadScores() {
  // Load curret score and history
  loadCurrentScore();
  loadScoreHistory();
}

/**
 * Funtion to display current score (for game you just played)
 */
function loadCurrentScore() {
  var temp = parseInt(localStorage.getItem("currentScore"));
  if (temp == 0) {
    document.querySelector(".c-score--title").innerHTML =
      "you didn't concentrate today";
    document.querySelector(".c-score--info--record").innerHTML = "concentrate!";
  } else {
    console.log(temp);
    var currentScore = formatScore(temp);

    // Display score
    var currentScoreBoard = document.querySelector(".c-score--info--record");
    currentScoreBoard.innerHTML = currentScore;

    // Compare with current score with today's top score
    // and update the record/history accordingly
    updateScoreHistory(temp);
    
}

/**
 * Funtion to set today's top score and update score history accordingly
 * @param {int} temp - unformatted score in time (in seconds)
 */
function updateScoreHistory(temp) {
  var scores = getScoreData();
  var currentScore = formatScore(temp);

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

    // Compare date with the latest date in score history 
    // When there is score history
    if (scores.length != 0) {
      //console.log(scores.length);
      if (scores[scores.length - 1].date == todayDate) {
        // Compare with current top score and update new top score
        var rawTopScore = scores[scores.length - 1].rawScore;
        if(temp<rawTopScore){
          scores[scores.length - 1].score = currentScore;
          scores[scores.length - 1].rawScore = temp;
        }
      } else {
        // If not, add as a new top score
        todayTopScore = {
          date: todayDate,
          score: currentScore,
          rawScore: temp
        };
        scores.push(todayTopScore);
      }
    } else {
      // When there is no score history, just add to the array/score history
      todayTopScore = {
        date: todayDate,
        score: currentScore,
        rawScore: temp
      };
      scores.push(todayTopScore);
    }

    // Update score history with updated array
    localStorage.setItem("scores", JSON.stringify(scores));

    // reset current score for next visit to score page
    localStorage.setItem("currentScore", "0");
}
}

/**
 * Funtion to load score history for past four days
 */
function loadScoreHistory() {
  var scoreGroup = document.querySelector(".c-rank");
  var scores = getScoreData();
  console.log(scores.length);
  var scoreHistory = "";

  if (scores.length < 4) {
    // If there is less than four data in score history
    for (var i = 3; i >= 0; i--) {
      if (i >= scores.length) {
        scoreHistory +=
          '<li class="c-rank__item c-rank--fourth shadow button">\
                        <p class="c-rank__item__record">no record</p>\
                        </li>';
      } else {
        var date = scores[i].date;
        var score = scores[i].score;

        scoreHistory +=
          '<li class="c-rank__item c-rank--fourth shadow button">\
                        <p class="c-rank__item__date">' +
          date +
          '</p>\
                        <p class="c-rank__item__record">' +
          score +
          "</p>\
                        </li>";
      }
    }
  } else {
    for (var i = scores.length - 1; i >= scores.length - 4; i--) {
      console.log("index:" + i);
      var date = scores[i].date;
      var score = scores[i].score;

      // If no score record, display no record
      if (date == undefined) {
        scoreHistory +=
          '<li class="c-rank__item c-rank--fourth shadow button">\
                        <p class="c-rank__item__record">no record</p>\
                        </li>';
      } else {
        // If score record exist, then display with correct date and score
        scoreHistory +=
          '<li class="c-rank__item c-rank--fourth shadow button">\
                        <p class="c-rank__item__date">' +
          date +
          '</p>\
                        <p class="c-rank__item__record">' +
          score +
          "</p>\
                        </li>";
      }
    }
  }

  // Replace current score history with updated one
  scoreGroup.innerHTML = scoreHistory;
}

/**
 * This will parse score history from localStorage
 */
function getScoreData() {
  var scores = localStorage.getItem("scores");
  var parsedScores = JSON.parse(scores);

  return parsedScores;
}

/**
 * Funcion to format and return score (in time) in proper format
 * @param {int} scoreInSec - timer value in seconds
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
