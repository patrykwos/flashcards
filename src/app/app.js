import Database from "better-sqlite3";

const db = new Database("flashcards.db");

db.exec(
  `
    CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        definition TEXT NOT NULL
    )
    `,
);

export default db;
