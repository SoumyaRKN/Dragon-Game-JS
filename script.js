score = 0;
cross = true;

audioGameover = new Audio("gameover.mp3");
audioGamemusic = new Audio("music.mp3");

setTimeout(() => {
    audioGamemusic.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Your key code is: ", e.keyCode);
    if (e.keyCode == 38) {
        dino = document.getElementById('dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    };
    if (e.keyCode == 39) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX + 50 + "px";
        dino.style.transform = "scaleX(1)";
    };
    if (e.keyCode == 37) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX - 50) + "px";
        dino.style.transform = "scaleX(-1)";

    };
};

setInterval(() => {
    dino = document.getElementById('dino');
    gameOver = document.getElementById('gameOver');
    obstracle = document.getElementById('obstracle');

    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    obstracleX = parseInt(window.getComputedStyle(obstracle, null).getPropertyValue("left"));
    obstracleY = parseInt(window.getComputedStyle(obstracle, null).getPropertyValue("top"));

    offsetX = Math.abs(dinoX - obstracleX);
    offsetY = Math.abs(dinoY - obstracleY);

    if (offsetX < 53 && offsetY < 22) {
        dino = document.getElementById('dino');
        gameOver.innerHTML = "GAME OVER -- Reload To Start New Game"
        obstracle.classList.remove('obstracleAni');
        audioGameover.play();
        dino.style.bottom = "-100px";
        setTimeout(() => {
            audioGameover.pause()
            audioGamemusic.pause()
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstracle, null).getPropertyValue("animation-duration"));
            newDur = aniDur - 0.01;
            obstracle.style.animationDuration = newDur + "s";
        }, 500);
    };
}, 1);

function updateScore(score) {
    scoreCont = document.getElementById("score");
    scoreCont.innerHTML = "Your Score :" + " " + score
};