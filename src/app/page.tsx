"use client";

import Flashcard from "@/components/Flashcard";
import PracticeFlashcard from "@/components/PracticeFlashcard";
import words from "@/data/words.json";
import styles from "@/styles/page.module.css";
import { useState } from "react";

export default function Home() {
  const [wordList, setWordList] = useState(words.words);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const newWords = text
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word !== "");
    setWordList(newWords);
  };

  const getNextWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWordIndex(randomIndex);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Flashcards</h1>
      <input
        name="Upload words"
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className={styles.fileInput}
      />
      <button
        className={styles.practiceModeButton}
        onClick={() => setIsPracticeMode(!isPracticeMode)}
      >
        {isPracticeMode ? "Switch to Study Mode" : "Switch to Practice Mode"}
      </button>

      {isPracticeMode ? (
        <div className={styles.practiceContainer}>
          <PracticeFlashcard word={wordList[currentWordIndex]} />
          <button onClick={getNextWord} className={styles.nextButton}>
            Next Card
          </button>
        </div>
      ) : (
        <div className={styles.flashcardContainer}>
          {wordList.map((word) => (
            <Flashcard key={word} word={word} />
          ))}
        </div>
      )}
    </main>
  );
}
