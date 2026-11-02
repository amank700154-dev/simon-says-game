const gameSequence = [];
const userSequence = [];
const colors = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let isShowingSequence = false;

const statusText = document.querySelector("#gameStatus");
const startButton = document.querySelector("#startBtn");
const menuButton = document.querySelector("#menuBtn");
const instructions = document.querySelector("#howToPlay");
const gameButtons = document.querySelectorAll(".btn");

function flashButton(button, className = "flash", duration = 350) {
    button.classList.add(className);
    window.setTimeout(() => button.classList.remove(className), duration);
}

function wait(ms) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

async function playSequence() {
    isShowingSequence = true;
    statusText.textContent = "Watch the sequence.";
    for (const color of gameSequence) {
        const button = document.getElementById(color);
        flashButton(button, "flash", 350);
        await wait(550);
    }
    isShowingSequence = false;
    statusText.textContent = "Your turn. Repeat the sequence.";
}

function startGame() {
    gameSequence.length = 0;
    userSequence.length = 0;
    level = 0;
    started = true;
    startButton.hidden = true;
    nextLevel();
}

async function nextLevel() {
    userSequence.length = 0;
    level += 1;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(nextColor);
    statusText.textContent = `Level ${level}: watch carefully.`;
    await wait(450);
    await playSequence();
}

function endGame() {
    started = false;
    isShowingSequence = false;
    statusText.textContent = `Game over. Your score was ${level}. Press Start Again to play.`;
    startButton.textContent = "Start Again";
    startButton.hidden = false;
}

function handlePlayerMove(event) {
    if (!started || isShowingSequence) return;

    const selectedColor = event.currentTarget.id;
    const expectedColor = gameSequence[userSequence.length];

    flashButton(event.currentTarget, "userflash", 180);
    userSequence.push(selectedColor);

    if (selectedColor !== expectedColor) {
        endGame();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        statusText.textContent = `Correct! Get ready for level ${level + 1}.`;
        window.setTimeout(nextLevel, 850);
    }
}

startButton.addEventListener("click", startGame);

gameButtons.forEach(button => {
    button.addEventListener("click", handlePlayerMove);
});

menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open game instructions" : "Close game instructions");
    instructions.hidden = isOpen;
    instructions.setAttribute("aria-hidden", String(isOpen));
});