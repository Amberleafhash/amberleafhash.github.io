import "./Notepad.css"
import React, { useState, useEffect } from 'react';

const notesStoreKey = 'notesStore';
let notesStore = {};

// Load notesStore from localStorage once at the start
const loadNotesStore = () => {
    const stored = localStorage.getItem(notesStoreKey);
    if (stored) {
        try {
            notesStore = JSON.parse(stored);
        } catch {
            notesStore = {};
        }
    }
};
loadNotesStore();

async function generateHash(content) {
    const msgBuffer = new TextEncoder().encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const Notepad = () => {
    const [note, setNote] = useState('');
    const [hashKey, setHashKey] = useState('');

    const saveNote = async () => {
        const hash = await generateHash(note);
        notesStore[hash] = note;
        localStorage.setItem(notesStoreKey, JSON.stringify(notesStore));  // Persist here
        setHashKey(hash);
        try {
            await navigator.clipboard.writeText(hash);
            alert(`Your note's hash key is:\n${hash}\n\nThe key has also been copied to your clipboard.`);
        } catch (err) {
            alert(`Your note's hash key is:\n${hash}\n\nFailed to copy to clipboard.`);
        }
    };

    const loadNote = () => {
        const inputHash = prompt("Enter your note's hash key:");
        if (!inputHash) return; // User cancelled or empty input

        if (inputHash in notesStore) {
            setNote(notesStore[inputHash]);
            setHashKey(inputHash);
        } else {
            alert('Note not found. Make sure the key is correct.');
        }
    };

    return (
        <div className="Notepad">
            <div>
                <button onClick={saveNote}>Gen Key</button>
                <button onClick={loadNote}>Load Key</button>
            </div>

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="CMD Commands: bgedit, color 2, color 6, calc"
            />

            {hashKey && (
                <p><strong>Hash Key:</strong> {hashKey}</p>
            )}
        </div>
    );
};

export default Notepad;
