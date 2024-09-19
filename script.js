const circle = document.getElementById('circle');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
let score = 0;
let timeLeft = 30;
let gameActive = true;

// Add an element to show the timer
const timerDisplay = document.createElement('p');
timerDisplay.textContent = `Time remaining: ${timeLeft}s`;
document.body.insertBefore(timerDisplay, gameContainer);

function moveCircle() {
    if (!gameActive) return;

    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const circleSize = circle.offsetWidth;

    const maxX = containerWidth - circleSize;
    const maxY = containerHeight - circleSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
}

function increaseScore() {
    if (!gameActive) return;

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveCircle();

    if (score >= 20) {
        endGame("You won!");
    }
}

function startTimer() {
    const timer = setInterval(() => {
        if (!gameActive) {
            clearInterval(timer);
            return;
        }

        timeLeft--;
        timerDisplay.textContent = `Time remaining: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame("Game over. You did not reach 20 points.");
        }
    }, 1000);
}

function endGame(message) {
    gameActive = false;
    alert(message);
}

function restartGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;

    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time remaining: ${timeLeft}s`;
    moveCircle();
    startTimer();
}

const gameInterval = setInterval(moveCircle, 1000);
circle.addEventListener('click', increaseScore);
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);
startTimer();
