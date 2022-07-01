var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];




//initialized The Start the game
var start = false;
//set level
var level = 0;

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
    }
});





$('.btn').on("click", function () {

    var userChosenColour = $(this).attr("id")


    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);


    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})




const checkAnswer = (currentlevel) => {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {

        console.log("succes")
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    }
    else {
        console.log("Wrong");

        playSound("wrong");


        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}


const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);


    var randomNumber = Math.floor(Math.random() * (3 + 1));;


    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    console.log(gamePattern)

    var selectColor = $(`#${randomChosenColour}`);


    $(document).ready(() => {
        selectColor.fadeIn(100);
        selectColor.fadeOut(100);
        selectColor.fadeIn(100);
    });


    playSound(randomChosenColour);


}




function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function startOver() {
    start = false;
    level = 0;
    gamePattern = [];
}



const animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}



