// Get DOM elements
var highscores = document.querySelector("#highscores");
var clear = document.querySelector("#clear");

//===========//
// FUNCTIONS //
//===========//

function retrieveHighScores() {

    // Retrieve item(s) from localStorage
    var scoreArr = JSON.parse(localStorage.getItem("score"));

    // Loop through them and create list
    for(var i = 0; i < scoreArr.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = scoreArr[i];
        highscores.appendChild(liEl);
        highscores.add;
    }
}

retrieveHighScores();

//===========//
// LISTENERS //
//===========//

clear.addEventListener("click", function() {

    localStorage.clear(); // Clear localStorage

    while (highscores.hasChildNodes()) { // Clear li element(s)
        highscores.removeChild(highscores.firstChild);
    }

});
