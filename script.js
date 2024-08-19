let score = 0;
let cross = true;

const audioGameover = new Audio("gameover.mp3");
const audioGamemusic = new Audio("music.mp3");

setTimeout(() => {
    audioGamemusic.play()
}, 1000);

function handleOrientationChange() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('gameContainer').style.display = 'none';
        alert('Please rotate your device to landscape mode for the best experience.');
    } else {
        document.getElementById('gameContainer').style.display = 'block';
    }
};

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange();
});

document.onkeydown = function (e) {
    console.log("Your key code is: ", e.keyCode);
    const dino = document.getElementById('dino');
    const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));

    if (e.keyCode == 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    };
    if (e.keyCode == 39) {
        dino.style.left = dinoX + 50 + "px";
        dino.style.transform = "scaleX(1)";
    };
    if (e.keyCode == 37) {
        dino.style.left = (dinoX - 50) + "px";
        dino.style.transform = "scaleX(-1)";

    };
};

setInterval(() => {
    const dino = document.getElementById('dino');
    const gameOver = document.getElementById('gameOver');
    const obstracle = document.getElementById('obstracle');
    const startBtn = document.getElementById('startBtn');

    const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    const dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    const obstracleX = parseInt(window.getComputedStyle(obstracle, null).getPropertyValue("left"));
    const obstracleY = parseInt(window.getComputedStyle(obstracle, null).getPropertyValue("top"));

    const offsetX = Math.abs(dinoX - obstracleX);
    const offsetY = Math.abs(dinoY - obstracleY);

    if (offsetX < 53 && offsetY < 22) {
        audioGameover.play();
        dino.style.bottom = "-100px";
        startBtn.style.display = 'block';
        obstracle.classList.remove('obstracleAni');
        gameOver.innerHTML = "GAME OVER -- Try Again";
        startBtn.addEventListener('click', () => window.location.reload());

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
            const aniDur = parseFloat(window.getComputedStyle(obstracle, null).getPropertyValue("animation-duration"));
            const newDur = aniDur - 0.01;
            obstracle.style.animationDuration = newDur + "s";
        }, 500);
    };
}, 1);

function updateScore(score) {
    scoreCont = document.getElementById("score");
    scoreCont.innerHTML = "Your Score :" + " " + score;
};