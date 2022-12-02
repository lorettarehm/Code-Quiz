// Create a code quiz that contains the following requirements:

// Variables to get DOM elements needed
var startScreen = document.querySelector("#start-screen");
var questions = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

// * A start button that when clicked a timer starts and the first question appears.
var startButton = document.querySelector("#start");
var time = document.querySelector("#time");
var timerStarted = false;
var timeCountdown = 30;

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Add questions to the page
    addQuestion(question1);

    // Hide start screen and show questions
    startScreen.setAttribute("class","hide");
    questions.setAttribute("class","show");

    // Start the timer
    if (!timerStarted) {
        timerStarted = true;
        var myTimer = setInterval(function () {
            if (timeCountdown === 0) {
                clearInterval(myTimer);
                alert("Time out!");
                // Hide questions and show end screen
                questions.setAttribute("class","hide");
                endScreen.setAttribute("class","start");
            } else {
                timeCountdown--;
            } time.textContent = timeCountdown + "s";
        }, 1000)
    }
});

// Logic to "feed" questions into the right area
function addQuestion(question) { // Add question text
    questionTitle.textContent = question[0];

    // Add list structure with possible answers
    var ulEl = document.createElement("ul");
    var choicesArr = question[1];
    var rightChoice = question[2];

    for (var i = 0; i < choicesArr.length; i++) {
        var liEl = document.createElement("li");
        if (i === rightChoice) {
            liEl.setAttribute("data-right-answer", true);
        } else {
            liEl.setAttribute("data-right-answer", false);
        } liEl.textContent = choicesArr[i];
        // TO DO * Questions contain buttons for each answer.
        ulEl.appendChild(liEl);
        ulEl.add;
        choices.appendChild(ulEl);
    }
    choices.add;
}


// *
// * When answer is clicked, the next question appears
// *
// * If the answer clicked was incorrect then subtract time from the clock

// * The quiz should end when all questions are answered or the timer reaches 0.

// * When the game ends, it should display their score and give the user the ability to save their initials and their score
