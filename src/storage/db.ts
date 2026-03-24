import * as SQLite from "expo-sqlite";
import { migrations } from "./migrations";

// Open DB (async)
export const dbPromise = SQLite.openDatabaseAsync("calendar.db");

// Compare semantic versions (unchanged)
function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);

  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

// Run migrations (async version)
async function runMigrations(
  db: SQLite.SQLiteDatabase,
  currentVersion: string
) {
  const versions = Object.keys(migrations).sort(compareVersions);

  for (const version of versions) {
    if (compareVersions(version, currentVersion) > 0) {
      console.log("Running migration:", version);

      // Migrations must now accept (db) and be async
      await migrations[version](db);

      await db.runAsync(
        `UPDATE meta SET value = ? WHERE key = 'schema_version';`,
        [version]
      );
    }
  }
}

// Initialize DB
export async function initDB() {
  try {
    const db = await dbPromise;

    // Enable FK
    await db.execAsync(`PRAGMA foreign_keys = ON;`);

    // Ensure meta table exists
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `);

    // Ensure schema version exists
    await db.runAsync(`
      INSERT OR IGNORE INTO meta (key, value)
      VALUES ('schema_version', '0.0.0');
    `);

    // Get current schema version
    const row = await db.getFirstAsync<{ value: string }>(
      `SELECT value FROM meta WHERE key = 'schema_version';`
    );

    const currentVersion = row?.value ?? "0.0.0";

    console.log("Current schema version:", currentVersion);

    // Run migrations inside a transaction
    await db.withTransactionAsync(async () => {
      await runMigrations(db, currentVersion);
    });

    console.log("DB INIT COMPLETE");
  } catch (error) {
    console.error("DB INIT ERROR:", error);
  }
}