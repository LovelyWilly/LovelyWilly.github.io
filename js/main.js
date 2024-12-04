/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board;
let boardWinCheck;
let turn = 'X';
let win;
let boardValues;
let oldturn = '';
let PopUpClose = false;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);
const Button = document.getElementById('ButtonFen');
Button.addEventListener('click', SKIBIDI);

/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (boardWinCheck[combo[0]] && boardWinCheck[combo[0]] === boardWinCheck[combo[1]] && boardWinCheck[combo[0]] === boardWinCheck[combo[2]]) winner = boardWinCheck[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};

function SKIBIDI()
{
    let PopUp = document.getElementById("PopUp");
    //PopUp PopUp
    PopUp.className = "PopUpNo";
    PopUpClose = true;
    
}

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    
    if ((board[idx] == '') && (messages.textContent == `C'est le tour du joueur ${turn}!`) && (PopUpClose == true))
    {
    board[idx] = turn;
    boardWinCheck[idx] = turn;
    boardValues[idx] = 6;
    
    
    for (let i = 0; i < 9; i++)
    {
        if (boardValues[i] > 0)
        {
            boardValues[i] = boardValues[i] - 1;
            if (boardValues[i] < 1)
                {
                    board[i] = '!'  + oldturn + '!' ;
                }
        }
        else
        {
            board[i] = '';
            boardWinCheck[i] = '';
        }
    }

    if (turn == 'O')
        {
            turn = 'X';
            oldturn = 'O';
        }
        else
        {
            turn = 'O';
            oldturn = 'X';
        }

    win = getWinner();
    render();
    }
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    boardValues = [0,0,0,
                   0,0,0,
                   0,0,0];
    boardWinCheck = [
    '', '', '',
    '', '', '',
    '', '', ''];
    win = 0;
    render();
};

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `Egaliter!` : win ? `${win} a gagner la partie!` : `C'est le tour du joueur ${turn}!`;

    

    };

init();