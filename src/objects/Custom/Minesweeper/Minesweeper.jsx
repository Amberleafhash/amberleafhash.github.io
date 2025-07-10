import React, { useState, useEffect } from 'react';
import './Minesweeper.css';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

// Creates an empty board with default cell properties
const createEmptyBoard = () => {
    return Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
            isMine: false,
            revealed: false,
            flagged: false,
            adjacentMines: 0,
        }))
    );
};

// Randomly places MINES number of mines on the board
const placeMines = (board) => {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
    return board;
};

// Calculates the number of adjacent mines for each cell
const calculateAdjacents = (board) => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1],
    ];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col].isMine) continue;

            let count = 0;
            for (const [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;
                if (
                    newRow >= 0 && newRow < ROWS &&
                    newCol >= 0 && newCol < COLS &&
                    board[newRow][newCol].isMine
                ) {
                    count++;
                }
            }
            board[row][col].adjacentMines = count;
        }
    }

    return board;
};

// Recursively reveals empty cells and adjacent cells with zero adjacent mines
// Also tracks how many cells are revealed for scoring
const revealAndScore = (board, row, col, visited = {}, pointsRef = { points: 0 }) => {
    const key = `${row},${col}`;
    if (visited[key]) return;
    visited[key] = true;

    const cell = board[row][col];
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;
    pointsRef.points += 1;

    if (cell.adjacentMines === 0) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [ 0, -1],          [ 0, 1],
            [ 1, -1], [ 1, 0], [ 1, 1],
        ];
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            if (
                newRow >= 0 && newRow < ROWS &&
                newCol >= 0 && newCol < COLS
            ) {
                revealAndScore(board, newRow, newCol, visited, pointsRef);
            }
        }
    }
};

const Minesweeper = () => {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [score, setScore] = useState(0);

    // Initialize the board once on component mount
    useEffect(() => {
        const newBoard = calculateAdjacents(placeMines(createEmptyBoard()));
        setBoard(newBoard);
    }, []);

    // Handle left click on a cell to reveal it
    const handleLeftClick = (row, col) => {
        if (gameOver || win) return;

        // Deep copy board to avoid mutating state directly
        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        const cell = newBoard[row][col];

        // Ignore clicks on flagged or already revealed cells
        if (cell.flagged || cell.revealed) return;

        // If clicked on a mine, reveal it and end the game
        if (cell.isMine) {
            cell.revealed = true;
            setBoard(newBoard);
            setGameOver(true);
            return;
        }

        // Reveal empty cells recursively and track score points
        const pointsRef = { points: 0 };
        revealAndScore(newBoard, row, col, {}, pointsRef);

        setBoard(newBoard);
        setScore(prevScore => prevScore + pointsRef.points);

        checkWin(newBoard);
    };

    // Handle right click on a cell to toggle flag
    const handleRightClick = (e, row, col) => {
        e.preventDefault();
        if (gameOver || win) return;

        // Deep copy board
        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        const cell = newBoard[row][col];

        // Can't flag revealed cells
        if (cell.revealed) return;

        // Toggle flag
        cell.flagged = !cell.flagged;

        // Optional: Update score for correct flags
        // Increase score by 1 if flag placed on a mine
        // Decrease score by 1 if flag removed from a mine
        if (cell.isMine) {
            setScore(prevScore => prevScore + (cell.flagged ? 1 : -1));
        }

        setBoard(newBoard);
        checkWin(newBoard);
    };

    // Check if the player has won
    const checkWin = (board) => {
        let revealedCount = 0;
        let correctFlags = 0;

        board.forEach(row => {
            row.forEach(cell => {
                if (cell.revealed) revealedCount++;
                if (cell.flagged && cell.isMine) correctFlags++;
            });
        });

        // Win condition: all non-mine cells revealed or all mines flagged correctly
        if (
            revealedCount + MINES === ROWS * COLS ||
            correctFlags === MINES
        ) {
            setWin(true);
        }
    };

    // Render individual cells
    const renderCell = (cell, row, col) => {
        let content = '';
        if (cell.revealed) {
            content = cell.isMine ? '💣' : (cell.adjacentMines || '');
        } else if (cell.flagged) {
            content = '🚩';
        }

        return (
            <div
                key={`${row}-${col}`}
                className={`cell ${cell.revealed ? 'revealed' : ''} ${gameOver && cell.isMine ? 'mine' : ''}`}
                onClick={() => handleLeftClick(row, col)}
                onContextMenu={(e) => handleRightClick(e, row, col)}
            >
                {content}
            </div>
        );
    };

    return (
        <div className="minesweeper">
            <h2>{gameOver ? '💥 Game Over!' : win ? '🎉 You Win!' : 'Minesweeper'}</h2>
            {/* Display current score */}
            <h3>Score: {score}</h3>
            <div className="grid">
                {board.map((row, rIdx) =>
                    row.map((cell, cIdx) => renderCell(cell, rIdx, cIdx))
                )}
            </div>
        </div>
    );
};

export default Minesweeper;
