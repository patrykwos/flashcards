'use client';

import Flashcard from '@/components/Flashcard';
import words from '@/data/words.json';
import styles from '@/styles/page.module.css';
import { useState } from 'react';


export default function Home() {
    const [wordList, setWordList] = useState(words.words);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        const newWords = text.split('\n').map(word => word.trim()).filter(word => word !== '');
        setWordList(newWords);
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Flashcards</h1>
            <input name="Upload words" type="file" accept=".txt" onChange={handleFileUpload} className={styles.fileInput} />
            <div className={styles.flashcardContainer}>
                {wordList.map((word) => (
                    <Flashcard 
                        word={word} 
                    />
                ))}
            </div>
        </main>
    );
}
