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

    let gameOver = false
})()
