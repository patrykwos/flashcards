"use client";

import { useState, useEffect } from "react";
import { getWordDefinition, extractMeanings } from "@/api/dictionary_api";
import styles from "@/styles/PracticeFlashcard.module.css";

interface PracticeFlashcardProps {
  word: string;
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export default function PracticeFlashcard({ word }: PracticeFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [meanings, setMeanings] = useState<Meaning[]>([]);
  const [selectedMeaning, setSelectedMeaning] = useState<Meaning | null>(null);
  const [error, setError] = useState("");

  const selectedDefinition = selectedMeaning?.definitions[0];
  const selectedExample = selectedDefinition?.example;

  useEffect(() => {
    async function fetchWordDefinition() {
      try {
        const wordDefinition = await getWordDefinition(word);
        const meanings = extractMeanings(wordDefinition);
        const selectedMeaning = meanings[0];
        setMeanings(meanings);
        setSelectedMeaning(selectedMeaning);
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
          <div className={styles.meaningButtons}>
            {meanings.map((meaning, index) => (
              <button
                key={meaning.partOfSpeech}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card from flipping
                  setSelectedMeaning(meaning);
                }}
                className={selectedMeaning === meaning ? styles.selected : ""}
              >
                {meaning.partOfSpeech}
              </button>
            ))}
          </div>
          {selectedMeaning && (
            <div className={styles.meaningContent}>
              <p className={styles.definition}>
                {selectedDefinition?.definition}
              </p>
              {selectedExample && (
                <p className={styles.example}>Example: {selectedExample}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
