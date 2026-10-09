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
    const player1 = createPlayer("Jean", "X")
    const player2 = createPlayer("John", "O")
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
    }
    
    return {
        playTurn,
        resetGame
    }
})()


