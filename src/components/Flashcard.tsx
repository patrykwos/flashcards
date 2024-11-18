"use client";

import { useState, useEffect } from "react";
import { getWordDefinition, parseWordDefinition } from "@/api/dictionary_api";
import styles from "@/styles/Flashcard.module.css";

interface FlashcardProps {
  word: string;
}

export default function Flashcard({ word }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [wordDefinition, setWordDefinition] = useState("");
  const [error, setError] = useState("");

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
      className={`${styles.flashcard} ${isFlipped ? styles.flipped : ""}`}
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
