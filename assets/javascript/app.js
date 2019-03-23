const maxSeconds = 30;
const HIDE = true;
const SHOW = false;

var secondsRemaining;
var intervalTimer;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var totalQuestions = 0;
// var q1 = ["How many days in a week?", "5", "10", "7", "9", "7"];
// var q2 = ["How many weeks in a year?", "52", "25", "63", "48", "52"];
// var questions = [q1, q2];

function timerTick() {
    console.log('ticked');
    secondsRemaining -= 1;
    updateTimerDisplay();
    if (secondsRemaining <= 0) {
        stopTimer();
        gameOver();
    }
}

function gameOver() {
    calculateScore();
    updateScoreDisplay();
    toggleVisibility("#questions", HIDE);
    toggleVisibility("#results", SHOW);
    toggleVisibility("#timer-display", HIDE);
}

function calculateScore() {
    checkAnswer($('input[name=question-1]:checked').val(), "q1-answer-3");
    checkAnswer($('input[name=question-2]:checked').val(), "q2-answer-1");
    checkAnswer($('input[name=question-3]:checked').val(), "q3-answer-4");
    checkAnswer($('input[name=question-4]:checked').val(), "q4-answer-4");
}

function checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
        correctAnswers++;
    } else if (typeof(answer) === "undefined") {
        unanswered++;
    } else {
        incorrectAnswers++;
    }
    totalQuestions++;
}

function updateScoreDisplay() {
    $("#correct-answers").text(correctAnswers);
    $("#incorrect-answers").text(incorrectAnswers);
    $("#not-answered").text(unanswered);
    if (correctAnswers === totalQuestions) {
        $("#results").append("<div>Perfect Score!</div>")
    }

}

function stopTimer() {
    clearInterval(intervalTimer);
    console.log("stop");
}

function updateTimerDisplay() {
    $('#seconds-remaining').text(secondsRemaining);
}

function toggleVisibility(id, hide) {
    if (hide === true) {
        $(id).hide();
    } else {
        $(id).show();
    }
}

$(document).ready(function() {
    console.log('ready');

    // for (let index = 0; index < questions.length; index++) {
    //     const question = questions[index];
    //     console.log(question);
    //     $(".question-box").append("<span>" + question[0] + "</span> <br>"); 
    //     $(".question-box").append("<input type='radio' name='question-1' value=" + question[1] + "> "); 
    //     console.log("<div>" + question[0] + "</div>")  
    // }

    toggleVisibility("#results", HIDE);
    toggleVisibility("#questions", HIDE);
    toggleVisibility("#timer-display", HIDE);

    $('#start').on('click', function(){
        console.log('started');
        secondsRemaining = maxSeconds;
        intervalTimer = setInterval(timerTick, 1000);
        updateTimerDisplay();
        toggleVisibility("#start", HIDE);
        toggleVisibility("#questions", SHOW);
        toggleVisibility("#timer-display", SHOW);
    });

});