import { dbPromise } from "./db";
import type { CalendarItemType } from "@structure-types";

export async function createType(
  id: string,
  name: string
): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `
    INSERT OR IGNORE INTO calendar_types (id, name)
    VALUES (?, ?);
    `,
    [id, name]
  );
}

export async function getAllTypes(): Promise<CalendarItemType[]> {
  const db = await dbPromise;

  return db.getAllAsync<CalendarItemType>(
    `SELECT * FROM calendar_types;`
  );
}