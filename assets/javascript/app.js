const maxSeconds = 60;
const HIDE = true;
const SHOW = false;

var secondsRemaining;
var intervalTimer;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var totalQuestions = 0;

var questionEnd = '<br> <br> </br>';
var q1 = ['Which young jedi becomes Darth Vader', 'Luke Skywalker', 'Obi-Wan Kenobi', 'Anakin Skywalker', 'Qui-Gon Jinn', '3'];
var q2 = ['What is the name of Han Solo\'s ship', 'Millenium Falcon', 'Airforce One', 'USS Enterprise', 'Apollo 18', '1'];
var q3 = ['Who raises Princess Leia', 'Yoda', 'Luke Skywalker', 'Padme Amidala', 'Bail Organa', '4'];
var q4 = ['What planet is home to Chewbacca and the Wookies', 'Naboo', 'Tatooine', 'Dagobah', 'Kashyyk', '4'];
var q5 = ['What color is Mace Windu\'s lightsaber', 'Blue', 'Purple', 'Green', 'Red', '2'];
var q6 = ['Who is Luke and Leia\'s mother', 'Kit Fisto', 'Syfo Dias', 'Padme Amidala', 'Jar Jar Binks', '3'];
var q7 = ['How many sith can exist at one time', '1', '2', '10', '5', '2'];
var q8 = ['What US magazine declared Star Wars "the years best movie" in its May 30, 1977 issue', 'Sports Illustrated', 'People', 'Rolling Stone', 'Time', '4'];
var q9 = ['Who is Darth Tyranus also known as', 'Senator Palpatine', 'Count Dooku', 'Plo Kuun', 'Yoda', '2'];
var q10 = ['Whose DNA were the clones made from', 'Jango Fett', 'Lando Calrissian', 'Darth Vader', 'Ki-Andi Mundi', '1'];
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]

function formatQuestion(question) {
    return '<span>' + question + '?</span> <br> <br>';
}

function formatAnswer(questionNumber, answerValue, answerText) {
    return '&nbsp;&nbsp;<input type="radio" name="q' + questionNumber + '" value="' + answerValue + '">' + answerText;
}

function timerTick() {
    console.log('ticked');
    secondsRemaining -= 1;
    updateTimerDisplay();
    if (secondsRemaining <= 0) {
        gameOver();
    }
}

function gameOver() {
    calculateScore();
    updateScoreDisplay();
    setVisibility("#questions", HIDE);
    setVisibility("#results", SHOW);
    setVisibility("#timer-display", HIDE);
    setVisibility("#submit", HIDE);
    stopTimer();
}

function calculateScore() {

    for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        var inputName = 'input[name=q' + (index +1) + ']:checked'
        console.log(question[5] + ' ' + $(inputName).val());
        checkAnswer(index + 1, question[5])
    }
}

function checkAnswer(questionNumber, correctAnswer) {
    var inputName = 'input[name=q' + questionNumber + ']:checked'
    var selectedAnswer = $(inputName).val()
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
    } else if (typeof(selectedAnswer) === "undefined") {
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

function setVisibility(id, hide) {
    if (hide === true) {
        $(id).hide();
    } else {
        $(id).show();
    }
}

$(document).ready(function() {
    console.log('ready');
    
    for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        $('#question-box').append(formatQuestion(question[0]));
        $('#question-box').append(formatAnswer(index + 1, 1, question[1]));
        $('#question-box').append(formatAnswer(index + 1, 2, question[2]));
        $('#question-box').append(formatAnswer(index + 1, 3, question[3]));
        $('#question-box').append(formatAnswer(index + 1, 4, question[4]));
        $('#question-box').append(questionEnd);
    }

    setVisibility("#submit", HIDE);
    setVisibility("#results", HIDE);
    setVisibility("#questions", HIDE);
    setVisibility("#timer-display", HIDE);

    $('#start').on('click', function(){
        console.log('started');
        secondsRemaining = maxSeconds;
        intervalTimer = setInterval(timerTick, 1000);
        updateTimerDisplay();
        setVisibility("#start", HIDE);
        setVisibility("#questions", SHOW);
        setVisibility("#timer-display", SHOW);
        setVisibility("#submit", SHOW);
    });

    $('#submit').on('click', function() {
        gameOver();
    });

});