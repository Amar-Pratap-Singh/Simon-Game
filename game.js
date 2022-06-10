var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var count = 0;
var firstTime = true;

$(document).keypress(startGame);
$(".btn").click(handler);

function startGame() {
  if (!gameStarted) {
    console.log("Starting Game");
    nextSequence();
  }

  gameStarted = true;
}


function nextSequence() {
  count = 0;
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  // Select the button with same id as randomChosenColor
  var chosenButton = "#" + randomChosenColor;
  $(chosenButton).fadeOut(100).fadeIn(100);

  // Play a sound on animation
  playSound(randomChosenColor);

  // If any of the button is clicked
}



// Checking Answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
      return false;
  }

  return true;
}



// Button clicked handler
function handler(event) {
  // alert("In Handler Function");
  if (!gameStarted){
    console.log("Game Over");
    playSound("wrong");
    gameOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  var userChosenColor = event.target.id;
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  console.log(userClickedPattern);

  var result;

  // Checking answer and moving to next level on success
  if (userClickedPattern.length === level){
    result = checkAnswer(count);

    if (result) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);

      console.log("You Win");
    }

    else {
      // Game Over
      console.log("Game Over");
      playSound("wrong");
      gameOver();
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  else {
    result = checkAnswer(count);

    if (!result) {
      console.log("Game Over in else condition");
      playSound("wrong");
      gameOver();
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  count++;
}


// Animating Click
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  // Remove the animation after 100 ms
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);

}


// Game Over animation
function gameOver() {
  $("body").addClass("game-over");

  setTimeout(function () {
      $("body").removeClass("game-over");
  }, 200);
}



// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}


// Play Sound
function playSound(name) {
  var path = "sounds/" + name + ".mp3";
  var audio = new Audio(path);
  audio.play();
}
