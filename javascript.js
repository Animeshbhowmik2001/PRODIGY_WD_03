const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const messageDisplay = document.getElementById('message'); // Select the message display area
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle user clicks on cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    
    // Check if the cell is already filled or the game is inactive
    if (boardState[index] || !gameActive) return;

    // Update board state
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWin()) {
        displayMessage(`${currentPlayer} wins! Hurray!`);
        gameActive = false;
        highlightWinningCells();
        return;
    } else if (boardState.every(cell => cell)) {
        displayMessage("It's a draw!");
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if the current player has won
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });
}

// Highlight winning cells
function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => boardState[index] === currentPlayer)) {
            combination.forEach(index => {
                cells[index].classList.add('winning');
            });
        }
    });
}

// Display a message in the message area
function displayMessage(message) {
    messageDisplay.textContent = message;
    messageDisplay.style.display = 'block'; // Ensure it's visible
}

// Restart the game
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });
    currentPlayer = 'X';
    gameActive = true;
    messageDisplay.textContent = ''; // Clear the message
}
