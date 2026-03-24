import * as SQLite from "expo-sqlite";

export const migrations: Record<
  string,
  (db: SQLite.SQLiteDatabase) => Promise<void>
> = {
  "1.0.0": async (db) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS calendar_types (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS calendar_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date INTEGER NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT,
        typeId TEXT NOT NULL,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER,
        itemColor TEXT,
        FOREIGN KEY (typeId) REFERENCES calendar_types(id)
      );

      CREATE TABLE IF NOT EXISTS calendar_item_tags (
        itemId TEXT NOT NULL,
        tagId TEXT NOT NULL,
        PRIMARY KEY (itemId, tagId),
        FOREIGN KEY (itemId) REFERENCES calendar_items(id),
        FOREIGN KEY (tagId) REFERENCES tags(id)
      );

      CREATE TABLE IF NOT EXISTS reminders (
        id TEXT PRIMARY KEY,
        itemId TEXT NOT NULL,
        offsetMinutes INTEGER NOT NULL,
        notificationId TEXT NOT NULL,
        FOREIGN KEY (itemId) REFERENCES calendar_items(id)
      );
    `);
  },

  "1.1.0": async (db) => {
    await db.execAsync(`
      ALTER TABLE tags ADD COLUMN color TEXT;
    `);
  },

  "1.2.0": async (db) => {
    // Default calendar types
    await db.runAsync(
      `INSERT OR IGNORE INTO calendar_types (id, name) VALUES (?, ?);`,
      ["event", "Event"]
    );

    await db.runAsync(
      `INSERT OR IGNORE INTO calendar_types (id, name) VALUES (?, ?);`,
      ["note", "Note"]
    );

    await db.runAsync(
      `INSERT OR IGNORE INTO calendar_types (id, name) VALUES (?, ?);`,
      ["task", "Task"]
    );

    // Default tags
    await db.runAsync(
      `INSERT OR IGNORE INTO tags (id, name, color) VALUES (?, ?, ?);`,
      ["birthday", "Birthday", "#ff66aa"]
    );

    await db.runAsync(
      `INSERT OR IGNORE INTO tags (id, name, color) VALUES (?, ?, ?);`,
      ["holiday", "Holiday", "#33cc99"]
    );

    await db.runAsync(
      `INSERT OR IGNORE INTO tags (id, name, color) VALUES (?, ?, ?);`,
      ["important", "Important", "#ff4444"]
    );
  },

  "1.3.0": async (db) => {
    await db.execAsync(`
      ALTER TABLE calendar_items ADD COLUMN startAt INTEGER;
    `);

    await db.execAsync(`
      ALTER TABLE calendar_items ADD COLUMN endAt INTEGER;
    `);
  }
};