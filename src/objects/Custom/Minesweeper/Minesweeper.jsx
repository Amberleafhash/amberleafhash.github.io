import React, { useState, useEffect } from 'react';
import './Minesweeper.css';
import { supabase } from "/src/objects/system32/dbConnect/supabaseClient.js";
import { updateMinesweeperHighScore } from '/src/objects/system32/userService.js';

const ROWS = 9;
const COLS = 10;
const MINES = 10;

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

const calculateAdjacents = (board) => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1],
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
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1],
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

const Minesweeper = ({ userId }) => {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [firstClick, setFirstClick] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const fetchHighScore = async () => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('minesweeper_high_score')
                    .eq('id', userId)
                    .single();
                if (!error && data) {
                    setHighScore(data.minesweeper_high_score || 0);
                }
            } catch (e) {
                console.error('Failed to fetch high score', e);
            }
        };
        fetchHighScore();
    }, [userId]);

    const initializeGame = (safeRow = null, safeCol = null) => {
        let newBoard;
        do {
            newBoard = calculateAdjacents(placeMines(createEmptyBoard()));
        } while (
            safeRow !== null &&
            safeCol !== null &&
            newBoard[safeRow][safeCol].isMine
            );
        setBoard(newBoard);
        setGameOver(false);
        setWin(false);
        setScore(0);
        setFirstClick(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleGameEnd = async (finalScore) => {
        if (!userId) return;
        if (finalScore > highScore) {
            try {
                await updateMinesweeperHighScore(userId, finalScore);
                setHighScore(finalScore);
            } catch (error) {
                console.error('Failed to update high score:', error);
            }
        }
    };

    const handleLeftClick = (row, col) => {
        if (gameOver || win) return;

        if (firstClick) {
            initializeGame(row, col);
            return;
        }

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        const cell = newBoard[row][col];

        if (cell.flagged || cell.revealed) return;

        if (cell.isMine) {
            cell.revealed = true;
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLS; j++) {
                    const c = newBoard[i][j];
                    if (c.isMine) c.revealed = true;
                }
            }
            setBoard(newBoard);
            setGameOver(true);
            handleGameEnd(score);
            return;
        }

        const pointsRef = { points: 0 };
        revealAndScore(newBoard, row, col, {}, pointsRef);

        setBoard(newBoard);
        const newScore = score + pointsRef.points;
        setScore(newScore);

        if (checkWin(newBoard)) {
            setWin(true);
            handleGameEnd(newScore);
        }
    };

    const handleRightClick = (e, row, col) => {
        e.preventDefault();
        if (gameOver || win) return;

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        const cell = newBoard[row][col];

        if (cell.revealed) return;

        cell.flagged = !cell.flagged;

        if (cell.isMine) {
            setScore(prevScore => prevScore + (cell.flagged ? 1 : -1));
        }

        setBoard(newBoard);
        checkWin(newBoard);
    };

    const checkWin = (board) => {
        let revealedCount = 0;
        let correctFlags = 0;

        board.forEach(row => {
            row.forEach(cell => {
                if (cell.revealed) revealedCount++;
                if (cell.flagged && cell.isMine) correctFlags++;
            });
        });

        const won = (revealedCount + MINES === ROWS * COLS) || (correctFlags === MINES);
        if (won) {
            setWin(true);
        }
        return won;
    };

    const renderCell = (cell, row, col) => {
        let display = '';
        if (cell.revealed) {
            if (cell.isMine) {
                display = '☼';  // classic Win98 mine symbol
            } else if (cell.adjacentMines > 0) {
                display = cell.adjacentMines;
            }
        } else if (cell.flagged) {
            display = '⚑';  // red flag
        }

        const classNames = ['cell'];
        if (cell.revealed) classNames.push('revealed');
        if (cell.flagged) classNames.push('flagged');
        if (gameOver && cell.isMine) classNames.push('mine');

        return (
            <div
                key={`${row}-${col}`}
                className={classNames.join(' ')}
                data-adjacent={cell.revealed ? cell.adjacentMines : 0}
                onClick={() => handleLeftClick(row, col)}
                onContextMenu={(e) => handleRightClick(e, row, col)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleLeftClick(row, col);
                }}
                aria-label={`Cell at row ${row + 1}, column ${col + 1} ${cell.revealed ? (cell.isMine ? 'Mine' : `${cell.adjacentMines} adjacent mines`) : (cell.flagged ? 'Flagged' : 'Hidden')}`}
            >
                {display}
            </div>
        );
    };

    return (
        <div className="minesweeper-wrapper">
            <div className="info-bar">
                <button onClick={() => initializeGame()}>Restart</button>
                <div>Score: {score}</div>
                <div>High Score: {highScore}</div>
                <div>Status: {gameOver ? 'Game Over' : win ? 'You Win!' : 'Playing'}</div>
            </div>
            <div
                className="minesweeper-grid"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 22px)`,
                    gridTemplateRows: `repeat(${ROWS}, 22px)`,
                }}
            >
                {board.map((row, i) =>
                    row.map((cell, j) => renderCell(cell, i, j))
                )}
            </div>
        </div>
    );
};

export default Minesweeper;
