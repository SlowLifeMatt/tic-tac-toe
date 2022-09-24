// 1) Define required constants
// 2) Define required variables used to track the state of the game
// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
// 4) Upon loading the app should:
//     4.1) Initialize the state variables
//     4.2) Render those values to the page
//     4.3) Wait for the user to click a square
// 5) Handle a player clicking a square
// 6) Handle a player clicking the replay button

// Models
let currentPlayersTurn = 'X'; 
let playerXBoxes = [];
let playerOBoxes = [];
let resetButton = document.getElementById("reset-game");
let boxes = document.querySelectorAll('.box');
const winningCombos = [
    //left to right
    ['box-1', 'box-2', 'box-3'],
    ['box-4', 'box-5', 'box-6'],
    ['box-7', 'box-8', 'box-9'],
    // top to bottom
    ['box-1', 'box-4', 'box-7'],
    ['box-2', 'box-5', 'box-8'],
    ['box-3', 'box-6', 'box-9'],
    // diagonally
    ['box-1', 'box-5', 'box-9'],
    ['box-3', 'box-5', 'box-7']
]
boxes.forEach(function(box){
    box.addEventListener('click', function(){
        // if the box hasnt been played(its innerHTML is blank '')
        if(box.innerHTML === ''){
            box.innerHTML = currentPlayersTurn;
            if (currentPlayersTurn == 'X') {
                playerXBoxes.push(box.id)
            } else {
                playerOBoxes.push(box.id)
            }
        } else{
            alert("This is not a valid play!")
            return
        }
        isWinningMove();

        if (currentPlayersTurn === 'X') {
            currentPlayersTurn = 'O'
        } else {
            currentPlayersTurn = 'X'
        }
        renderViewWithCurrentPlayer();
    });
});

resetButton.addEventListener('click', function(){
    resetGameAndBoard();
    renderViewWithCurrentPlayer();
})

renderViewWithCurrentPlayer();
function isWinningMove() {
    let winner;
if(currentPlayersTurn === 'X') {
    winningCombos.forEach(function(comboArr){
        winner = comboArr.every(function(box){
            return playerXBoxes.includes(box);
        
    });
    if (winner) {
        alert('winner!')
        resetGameAndBoard();
        renderViewWithCurrentPlayer();
    }
});
} else {
    winningCombos.forEach(function(comboArr){
        winner = comboArr.every(function(box){
            return playerOBoxes.includes(box)
    });
    if(winner) {
        alert('winner!')
        resetGameAndBoard();
        renderViewWithCurrentPlayer();
    }
});
}

}

function renderViewWithCurrentPlayer() {
    document.getElementById('playersTurn').innerHTML =
    currentPlayersTurn;
}

function resetGameAndBoard() {
    boxes.forEach(function(box){
        box.innerHTML = '';
        playerXBoxes = [];
        playerOBoxes = [];
    });
    currentPlayersTurn = 'X'
    renderViewWithCurrentPlayer();
}
