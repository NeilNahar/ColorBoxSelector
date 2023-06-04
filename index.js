var colorList = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  level += 1;
  userClickedPattern = [];
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var newColorGenerated = colorList[randomNumber];
  gamePattern.push(newColorGenerated);
  $("#" + newColorGenerated)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(newColorGenerated);
  console.log("gamePattern");
  console.log(gamePattern);
}
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      startAgain();
      break;
    }
  }
  if (userClickedPattern.length == gamePattern.length && level != 0) {
    setTimeout(function () {
      nextSequence();
    }, 500);
  }
}
function startAgain() {
  level = 0;
  $("h1").html("Press A key to Start");
  gamePattern = [];
  userClickedPattern = [];
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
}

$("body").on("keydown", function () {
  if (level == 0) {
    nextSequence();
  }
});
$(".box").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  $("#" + userChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(userChosenColor);
  checkAnswer();
});
