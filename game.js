// Declarations 

let gamePattern = []
const buttonColours = ["red", "blue", "green", "yellow"]
let userClickedPattern = []
let started = false
let level = 0

$(".btn").on("click", (e) => {
    let userChosenColour = e.target.id
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour)

    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
    
})

function nextSequence() {


    let randomNumber = Math.floor(Math.random() * 4)

    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)

    console.log("Level " + level)

    level = level + 1;
    $("h1").text("Level " + level)

    
}

function playSound(sound) {
    const audio = new Audio('sounds/' + sound + '.mp3')
    audio.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

$(document).on("keydown", () => {
    if(!started) {
        nextSequence()  
        started = true
    }
      
})

function checkAnswer(currentLevel) {
    console.log(userClickedPattern)
    console.log(gamePattern)
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(() => {
                    nextSequence()
                    userClickedPattern = []
                }, 1000)
            }
    } else {
        playSound('wrong')
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
     
    function startOver() {
        started = false;
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
    }
    
}












