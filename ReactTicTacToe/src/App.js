import {useState} from "react";

function Square({value, onClick}) {

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

function Board({squares, isXturn, onTurn }) {

    const winner = calculateWinner(squares)

    function handleClick(i) {
        if (squares[i] || winner) {
            return;
        }
        let futureState = squares.slice(); //Important to create a copy to preserve immutability of the state
        if (isXturn) {
            futureState[i] = 'X';
        } else {
            futureState[i] = 'O';
        }

        onTurn(futureState)
    }

    let status;

    if (winner) {
        status = `Winner: ${winner}`
    } else {
        status = `Next player: ${isXturn ? 'X' : 'O'}`
    }

    return (
        <>
            <p className="statusP">{status}</p>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)}/>
                <Square value={squares[1]} onClick={() => handleClick(1)}/>
                <Square value={squares[2]} onClick={() => handleClick(2)}/>
            </div>

            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)}/>
                <Square value={squares[4]} onClick={() => handleClick(4)}/>
                <Square value={squares[5]} onClick={() => handleClick(5)}/>
            </div>

            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)}/>
                <Square value={squares[7]} onClick={() => handleClick(7)}/>
                <Square value={squares[8]} onClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentGame = history[currentMove];
    const isXturn = currentMove % 2 === 0;

    function handleTurn(futureSquares) {
        setHistory([...history.slice(0, currentMove + 1), futureSquares]);
        setCurrentMove(currentMove + 1)
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move)=> {
        let description;
        if (move > 0) {
            description = "Go to move #" + move
        } else {
            description = "Go to Game Start"
        }

        return (
            <li key={move}>
                <button onClick={()=>{jumpTo(move)}}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="gameBoard">
                <Board squares={currentGame} isXturn={isXturn} onTurn={handleTurn} ></Board>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const line of lines) {
        const [a,b,c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}
