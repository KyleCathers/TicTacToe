// X O X
// O X O
// X O X

const gridBoxArray = document.querySelectorAll('.gridBox');
const restartButton = document.querySelector('.restart');
const messageBox = document.querySelector('.message');

const gameBoard = (() => {
    let gameBoardArray = [];
    const rows = 3;
    const columns = 3;
    let arrayIndex = 0;

    // reset board array to dashes
    const initializeBoard = () => {
        arrayIndex = 0;
        for(let i = 0; i < rows; i++) {
            gameBoardArray[i] = [];
            for(let j = 0; j < columns; j++) {
                gameBoardArray[i].push("");
            }
        }
        updateTiles();
    }

    // place turn into array
    const enterTurn = (row, column, icon) => {
        if(checkTurn(row, column)) { // only enter in empty tiles
            gameBoardArray[row][column] = icon;
            updateTiles();
            return true;
        } else {
            return false;
        }
    }

    // check if selected tile is already entered into
    const checkTurn = (row, column) => {
        return gameBoardArray[row][column] == "" ? true : false;
    }

    // print board array to console
    const printBoard = () => {
        let printString = "";
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                printString += gameBoardArray[i][j];
            }
            printString += '\n';
        }

        console.log(printString);
    }

    // update DOM with current array
    const updateTiles = () => {
        arrayIndex = 0;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                gridBoxArray[arrayIndex].innerHTML = gameBoardArray[i][j];
                arrayIndex++;
            }
        }
    }

    const getBoardArray = () => gameBoardArray;

    initializeBoard();

    return { enterTurn, initializeBoard, printBoard, getBoardArray }
})();

// Player factory object with its own name and icon (X or O);
const player = (name, icon) => {
    return { name, icon };
}

const game = (() => {
    let turn = 0;
    let gameOver = false;
    let totalTurns = 0;

    // players[0/1].name/icon
    const players = [player('Player One', 'X'), 
                      player('Player Two', 'O')];

    // start game function, initializing buttons, loops until game is over
    const play = () => {
        updateMessage();
        restartButton.addEventListener('click', restart);
        
        for(let i = 0; i < 9; i++) {
            gridBoxArray[i].addEventListener('click', () => {
                if(!gameOver) {
                    if(gameBoard.enterTurn(Math.floor(i / 3), i % 3, players[turn].icon)) {
                        totalTurns++;
                        checkGame();
                        if(!gameOver) changeTurns();
                        updateMessage();
                    };
                }
            });
        }
    };

    // change between player one and player twos turn
    const changeTurns = () => {
        turn == 0 ? turn = 1 : turn = 0;
    }

    // update message box with gameover message or current players turn
    const updateMessage = () => {
        totalTurns == 9 ? messageBox.innerHTML = `Game over! The game is a draw :|` :
            gameOver ? messageBox.innerHTML = `Game over! ${players[turn].name} wins` : 
            messageBox.innerHTML = `It is ${players[turn].name}'s move!`;
    };

    // restart to beginning
    const restart = () => {
        gameBoard.initializeBoard();
        turn = 0;
        totalTurns = 0;
        gameOver = false;
        updateMessage();
    };

    // check if somebody won or if its a draw
    const checkGame = () => {
        let arrayCheck1 = ['X', 'X', 'X'];
        let arrayCheck2 = ['O', 'O', 'O'];

        if(totalTurns == 9) {   // draw
            gameOver = true;
        }

        // check rows
        for(let i = 0; i < 3; i++) {
            if((gameBoard.getBoardArray()[i][0] == 'X') &&
                (gameBoard.getBoardArray()[i][1] == 'X') &&
                (gameBoard.getBoardArray()[i][2] == 'X')) {
                gameOver = true;
            } else if ((gameBoard.getBoardArray()[i][0] == 'O') &&
                        (gameBoard.getBoardArray()[i][1] == 'O') &&
                        (gameBoard.getBoardArray()[i][2] == 'O')) {
                gameOver = true;
            }
        }

        // check collumns
        for(let j = 0; j < 3; j++) {
            if((gameBoard.getBoardArray()[0][j] == 'X') &&
                (gameBoard.getBoardArray()[1][j] == 'X') &&
                (gameBoard.getBoardArray()[2][j] == 'X')) {
                gameOver = true;

            } else if ((gameBoard.getBoardArray()[0][j] == 'O') &&
                        (gameBoard.getBoardArray()[1][j] == 'O') &&
                        (gameBoard.getBoardArray()[2][j] == 'O')) {
                gameOver = true;
            }
        }
        
        // check diagonals
        if((gameBoard.getBoardArray()[0][0] == 'X') &&
            (gameBoard.getBoardArray()[1][1] == 'X') &&
            (gameBoard.getBoardArray()[2][2] == 'X')) {
            gameOver = true;

        } else if ((gameBoard.getBoardArray()[0][2] == 'X') &&
                    (gameBoard.getBoardArray()[1][1] == 'X') &&
                    (gameBoard.getBoardArray()[2][0] == 'X')) {
            gameOver = true;

        } else if ((gameBoard.getBoardArray()[0][0] == 'O') &&
                    (gameBoard.getBoardArray()[1][1] == 'O') &&
                    (gameBoard.getBoardArray()[2][2] == 'O')) {
            gameOver = true;
        } else if ((gameBoard.getBoardArray()[0][2] == 'O') &&
                    (gameBoard.getBoardArray()[1][1] == 'O') &&
                    (gameBoard.getBoardArray()[2][0] == 'O')) {
            gameOver = true;
        };
    };

    return { play };
})();

game.play();