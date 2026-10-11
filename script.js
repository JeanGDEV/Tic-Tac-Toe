const squares = document.querySelectorAll(".square")
const turnDisplay = document.querySelector("#next-turn")
const winnerDisplay = document.querySelector("#show-winner")

const firstPlayerName = window.prompt("Player's 1 name")
const secondPlayerName = window.prompt("Player's 2 name")

//BUTTONS
const restartBtn = document.querySelector("#restart-btn")


const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  
    [0, 4, 8], [2, 4, 6]              
]

// Handling gameboard
const gameBoard = (function(){
    let board = ["", "", "", "", "", "", "", "", ""]

    function placeMark(index, mark){
        if(board[index] === ""){
            board[index] = mark
            return true
        }
        return false
    }

    function displayBoard(){
        return board.slice()
    }

    function resetBoard(){
        board = ["", "", "", "", "", "", "", "", ""]
    }

    return {
        placeMark,
        displayBoard,
        resetBoard
    }
})()

// Setting up the player names and markers
const createPlayer = function (name, marker) {
    return {
        name,
        marker,
        getName: function(){
            return name
        },
        getMarker: function(){
            return marker
        }
    }
}

const gameController = (function(){
    let player1 = createPlayer(firstPlayerName, "X")
    let player2 = createPlayer(secondPlayerName, "O")
    checkNamePlayer(player1, player2)
    let currentPlayer = player1
    let gameWinner = null

    let gameOver = false

    function checkWinner(){
        let board = gameBoard.displayBoard()
        let winner = null
        for(const combo of winningCombos){
            const [a, b, c] = combo
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                winner = board[a]
                break
            }
        }
        return winner
    }

    function checkTie(){
        const board = gameBoard.displayBoard()
        return (!board.includes(""))
    }

    function switchTurn(){
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    function endGame(winner) {
        gameOver = true
        gameWinner = winner
    }

    function resetGame() {
        gameBoard.resetBoard()
        currentPlayer = player1
        gameOver = false
        gameWinner = null

    }
    
    function playTurn(index) {

        if (gameOver) return false
        // Check if it's there an empty square
        if (!gameBoard.placeMark(index, currentPlayer.marker)) return false

        const winner = checkWinner()
        if(winner){
            endGame(winner)
        } else if (checkTie()){
            endGame(null)
        } else {
            switchTurn()
        }
        return true
    }
    
    return {
        playTurn,
        resetGame,
        getCurrentPlayer: function() {return currentPlayer},
        getGameOver: function() {return gameOver},
        getWinner: function() {return gameWinner}
    }
})()

function renderBoard(){
    let board = gameBoard.displayBoard()
    for(let i = 0; i < squares.length; i++){
        squares[i].textContent = board[i]
    }
}

function renderTurn(){
    let currentPlayer = gameController.getCurrentPlayer()
    turnDisplay.textContent = `${currentPlayer.name}'s turn ( ${currentPlayer.marker} )`
}

function renderWinner(){
    const isGameOver = gameController.getGameOver()
    const winner = gameController.getWinner()
    const currentPlayer = gameController.getCurrentPlayer()

    if (isGameOver){
        if(winner === null){
            winnerDisplay.textContent = "Draw!"
        } else if (winner === "X" || winner === "O"){
            winnerDisplay.textContent = `${currentPlayer.name} wins!`
        }
    } else {
        winnerDisplay.textContent = ""
    }
}

function renderAll(){
    renderBoard()
    renderTurn()
    renderWinner()

}

squares.forEach((square) => {
    square.addEventListener("click", (event) => {
        let index = Number(event.currentTarget.dataset.index)
        let playTurn = gameController.playTurn(index)
        if(playTurn){
            renderAll()
        }
    })
})

// Buttons Event Listeners

restartBtn.addEventListener("click", () => {
    gameController.resetGame()
    renderAll()
})

function checkNamePlayer(player1, player2){
    // Here we ensure if the prompt is empty
    // so we give them a default name for both

    if(player1.name === null || player1.name === "") {
        player1.name = "John"
    }

    if(player2.name === null || player2.name === ""){
        player2.name = "Doe"
    } 
}

renderAll()