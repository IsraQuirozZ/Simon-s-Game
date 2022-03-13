//Create a variable with an array of the colors we have in the game.
var buttonColors = ['green', 'red', 'yellow', 'blue'];


// Game Pattern
var gamePattern = [];
var userClickedPattern = [];

//Levels
var started = false;
var level = 0;

//Detect a key press
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        started = true;
    }
})

//Check if the answer is correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        $("#level-title").text("Game Over, press any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");
        startOver();
    };
}

//Add clicked pattern to the uCP list
$("button").click(function() {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

// Random
function nextSequence() {

    userClickedPattern = []

    level++;

    $("#level-title").text("Level  " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Audio
    playSound(randomChosenColor);
}

//Play Sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animations
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}