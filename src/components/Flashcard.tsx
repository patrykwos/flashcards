"use client";

import { useState, useEffect } from "react";
import { getWordDefinition, parseWordDefinition } from "@/api/dictionary_api";
import styles from "@/styles/Flashcard.module.css";

interface FlashcardProps {
  word: string;
  isSelected?: boolean;
}

export default function Flashcard({ word, isSelected }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [wordDefinition, setWordDefinition] = useState("");
  const [_error, setError] = useState("");

  useEffect(() => {
    async function fetchWordDefinition() {
      try {
        const wordDefinition = await getWordDefinition(word);
        const parsedWordDefinition = parseWordDefinition(wordDefinition);
        setWordDefinition(parsedWordDefinition);
      } catch (error) {
        setError("Failed to fetch word definition");
      }
    }

    fetchWordDefinition();
  }, [word]);

  return (
    <div
      className={`flashcard ${styles.flashcard} ${isFlipped ? styles.flipped : ""} ${isSelected ? styles.selected : ""}`}
      data-word={word}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles.flashcardInner}>
        <div className={styles.flashcardFront}>
          <h2>{word}</h2>
        </div>
        <div className={styles.flashcardBack}>
          <p>{wordDefinition}</p>
        </div>
      </div>
    </div>
  );
}
