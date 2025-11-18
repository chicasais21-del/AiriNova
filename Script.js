const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const msg = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
];

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkGameResult();
}

function checkGameResult() {
    let won = false;

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;

        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        ) {
            won = true;
            break;
        }
    }

    if (won) {
        msg.textContent =
            currentPlayer === "X"
                ? "Yay~! You won, senpai! 💖"
                : "Kyaa~! Airi wins! ✨";

        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        msg.textContent = "Nyaaa~ It's a cute little tie! 🤍";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    msg.textContent =
        currentPlayer === "X"
            ? "Your turn, senpai~!"
            : "Airi's turn, teehee~!";
}

function resetGame() {
    gameState = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";
    msg.textContent = "Let's play, senpai~!";
    cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
