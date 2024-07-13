var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence()
{
    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //continue from step 3
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("level "+level);

}

$("body").keydown(function(){
    if(level == 0)
    {
        nextSequence();
    }
});//done


///////////////step 4///////////////////////
$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});//done




function playSound(name)
{
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length)
            {
                setTimeout(function(){
                    nextSequence();
                },1000);
                
            }
    }
    
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
    }

}//done

function startOver()
{
    level = 0;
    gamePattern = [];
}

