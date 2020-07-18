var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gameStarted = false

var level = 0;


  $(document).on("keydown",function(){
    if(gameStarted === false){
      $("h1").text("Level "+ level);
      nextSequence();
      gameStarted = true;

       }
  });




function nextSequence(){

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  level++;
  $("h1").text("Level "+ level);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

$(".btn").click(function(){

var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
})


function playSound(soundName){
  var sound = "sounds/"+soundName+".mp3";
  var audio = new Audio(sound);
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
