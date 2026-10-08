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

