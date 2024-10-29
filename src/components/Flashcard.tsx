'use client';

import { useState } from 'react';
import styles from '@/styles/Flashcard.module.css';

interface FlashcardProps {
    word: string;
    definition: string;
}

export default function Flashcard({ word, definition }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={styles.flashcardInner}>
                <div className={styles.flashcardFront}>
                    <h2>{word}</h2>
                </div>
                <div className={styles.flashcardBack}>
                    <p>{definition}</p>
                </div>
            </div>
        </div>
    );
}
