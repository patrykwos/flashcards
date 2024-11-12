import { WordDictionary } from '@/types/words.ts';
import Flashcard from '@/components/Flashcard.tsx';
import words from '@/data/words.json';
import styles from '@/styles/page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.flashcardContainer}>
                {words.words.map((word) => (
                    <Flashcard 
                        key={word} 
                        word={word} 
                    />
                ))}
            </div>
        </main>
    );
}