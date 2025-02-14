import Flashcard from "@/components/Flashcard";
import PracticeFlashcard from "@/components/PracticeFlashcard";
import { useMenuContext } from "@/components/MenuContext";
import words from "@/data/words.json";
import styles from "@/styles/page.module.css";
import { useState, useRef, use } from "react";

export default function HomeContent() {
  const { openMenu } = useMenuContext();

  const [wordList, setWordList] = useState(words.words);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const selectionStart = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isPracticeMode) {
      return;
    }
    if (event.button === 2) {
      return;
    }
    event.preventDefault();
    setSelectedWords([]);
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    const isOnFlashcard = elements.some((el) =>
      el.classList.contains("flashcard"),
    );

    if (!isOnFlashcard) {
      setIsSelecting(true);
      selectionStart.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handleMouseUp = (_event: React.MouseEvent) => {
    setIsSelecting(false);
    selectionStart.current = null;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isSelecting || isPracticeMode) return;
    event.preventDefault();
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    const selectedCards = elements
      .map((el) => el.getAttribute("data-word"))
      .filter((word): word is string => word !== null);

    setSelectedWords((prev) =>
      Array.from(new Set([...prev, ...selectedCards])),
    );
  };

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
    <main
      className={styles.main}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onContextMenu={openMenu}
    >
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
            <Flashcard
              key={word}
              word={word}
              isSelected={selectedWords.includes(word)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
