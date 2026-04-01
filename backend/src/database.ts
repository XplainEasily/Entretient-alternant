import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'database.db');

export const db = new Database(DB_PATH);

export function initializeSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULLL,
      description TEXT NOT NULL,
      price       REAL NOT NULL,
      category    TEXT NOT NULL
    )
  `);
}
