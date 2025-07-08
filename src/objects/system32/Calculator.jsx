import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [input, setInput] = useState('');

    const handleClick = (value) => {
        if (value === 'C') {
            setInput('');
        } else if (value === '=') {
            try {
                setInput(eval(input).toString());
            } catch {
                setInput('Error');
            }
        } else {
            setInput((prev) => prev + value);
        }
    };

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', 'C', '+',
        '='
    ];

    return (
        <div className="Calculator">
            <div className="display">{input || '0'}</div>
            <div className="buttons">
                {buttons.map((btn, i) => (
                    <button key={i} onClick={() => handleClick(btn)}>{btn}</button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
