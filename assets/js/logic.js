// Create a code quiz that contains the following requirements:
var numberOfQuestions = listOfQuestions.length;
var currentQuestion = 0;
var pointsScored = 0;
var pointsToAdd = 10;

// Variables to get DOM elements needed
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var startScreen = document.querySelector("#start-screen");
var questions = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit");
var feedback = document.querySelector("#feedback");

// * A start button that when clicked a timer starts and the first question appears.
var startButton = document.querySelector("#start");
var time = document.querySelector("#time");
var timerStarted = false;
var timeCountdown = 60;
var timePenalty = 10;

//===========//
// FUNCTIONS //
//===========//

// Logic to "feed" questions into the right area
function addQuestion(question) { // Add question text
    questionTitle.textContent = question[0];

    //CLear UL element (if there is one)
    while (choices.hasChildNodes()) {
        choices.removeChild(choices.firstChild);
    }

    // Add list structure with possible answers
    var ulEl = document.createElement("ul");
    var choicesArr = question[1];
    var rightChoice = question[2];

    for (var i = 0; i < choicesArr.length; i++) {
        var liEl = document.createElement("li");
        if (i === rightChoice) { // Right choice was selected
            liEl.setAttribute("data-right-answer", true);
        } else { // Wrong choice was selected
            liEl.setAttribute("data-right-answer", false);
        }
        // * Questions contain buttons for each answer.
        var btn = document.createElement("button");
        btn.textContent = (i + 1) + ". " + choicesArr[i];
        liEl.appendChild(btn);
        ulEl.appendChild(liEl);
        ulEl.add;
        choices.appendChild(ulEl);
    }
    choices.add;
}

function endGame() { // * When the game ends, it should display their score and give the user the ability to save their initials and their score
    // Set timer to 0
    timeCountdown = 0;
    time.textContent = timeCountdown + "s";
    // Pass the points scored to the respective place on the page
    finalScore.textContent = pointsScored;

    // Hide questions and show end screen
    questions.setAttribute("class", "hide");
    endScreen.setAttribute("class", "start");

}

//===========//
// LISTENERS //
//===========//

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Add questions to the page
    addQuestion(listOfQuestions[currentQuestion]);

    // Hide start screen and show questions
    startScreen.setAttribute("class", "hide");
    questions.setAttribute("class", "show");

    // Start the timer
    if (! timerStarted) {
        timerStarted = true;
        var myTimer = setInterval(function () {
            if (timeCountdown <= 0) { 
                // * The quiz should end when the timer reaches 0
                clearInterval(myTimer);
                endGame();
            } else {
                timeCountdown--;
            }
            time.textContent = timeCountdown + "s";
        }, 1000)
    }
});

// * When answer is clicked, the next question appears
// Put a listener for the questions area
questions.addEventListener("click", function (event) {
    var element = event.target;

    // If the clicked item is a button
    if (element.matches("button") === true) { 
        
        if (element.parentElement.getAttribute("data-right-answer") === "true") { // Get the parent li element and check if data-right-answer is true
            
            pointsScored = pointsScored + pointsToAdd; // If is, add to the points scored
            currentQuestion++; // Increment the number of questions answered

            // Provide feedback to right answer
            var audioRight = new Audio("./assets/sfx/correct.wav");
            audioRight.play();
            feedback.textContent = "Right!"
            
            if (currentQuestion === numberOfQuestions) { // * The quiz should end when all questions are answered.
                endGame(); 
            } else { // Add next question
                addQuestion(listOfQuestions[currentQuestion]);
            }
        } else { 
            // * If the answer clicked was incorrect then subtract time from the clock
            timeCountdown = timeCountdown - timePenalty;

            // Provide feedback to wrong answer
            var audioWrong = new Audio("./assets/sfx/incorrect.wav");
            audioWrong.play();
            feedback.textContent = "Wrong!"
        }
        // Show feedback element
        feedback.setAttribute("class", "feedback");
    }
})

submitBtn.addEventListener("click", function() {

    // Create array to hold the score and retrieve any eventual scores already stored in the localStorage
    var scoreArr = JSON.parse(localStorage.getItem('score')) || [];

    // Add the current score to the array
    scoreArr.push(document.querySelector("#initials").value + " - " + pointsScored);

    //Get values from page and add them to localStorage
    localStorage.setItem("score", JSON.stringify(scoreArr));

});