import { WordDictionary } from '@/types/words.ts';
import Flashcard from '@/components/Flashcard.tsx';
import words from '@/data/words.json';
import styles from '@/styles/page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.flashcardContainer}>
                {Object.entries(words).map(([word, definition]) => (
                    <Flashcard 
                        key={word} 
                        word={word} 
                        definition={definition} 
                    />
                ))}
            </div>
        </main>
    );
}