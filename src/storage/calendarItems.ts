import { dbPromise } from "./db";
import type { CalendarItemFormat } from "@structure-types";

// No more rowsToArray needed

export async function getItemsForDay(
  dayTs: number
): Promise<CalendarItemFormat[]> {
  const db = await dbPromise;

  return db.getAllAsync<CalendarItemFormat>(
    `
    SELECT ci.*, ct.name AS typeName
    FROM calendar_items ci
    JOIN calendar_types ct ON ci.typeId = ct.id
    WHERE ci.date = ?
    ORDER BY ci.startTime ASC;
    `,
    [dayTs]
  );
}

export async function getMonthCounts(
  startTs: number,
  endTs: number
): Promise<any[]> {
  const db = await dbPromise;

  return db.getAllAsync(
    `
    SELECT date, COUNT(*) AS count
    FROM calendar_items
    WHERE date BETWEEN ? AND ?
    GROUP BY date;
    `,
    [startTs, endTs]
  );
}

export async function createCalendarItem(
  item: CalendarItemFormat,
  typeId: string
): Promise<void> {
  const db = await dbPromise;
  console.log("Creating calendar item:", item);

  await db.runAsync(
    `
    INSERT INTO calendar_items
    (id, title, description, date, startTime, endTime, typeId, createdAt, updatedAt, itemColor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      item.id,
      item.title,
      item.description ?? null,
      item.date.getTime(),
      item.startTime,
      item.endTime ?? null,
      typeId,
      item.createAt.getTime(),
      item.updatedAt?.getTime() ?? null,
      item.itemColor ?? null,
    ]
  );
}

export async function updateCalendarItem(
  item: CalendarItemFormat,
  typeId: string
): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `
    UPDATE calendar_items
    SET 
      title = ?,
      description = ?,
      date = ?,
      startTime = ?,
      endTime = ?,
      typeId = ?,
      updatedAt = ?,
      itemColor = ?
    WHERE id = ?;
    `,
    [
      item.title,
      item.description ?? null,
      item.date.getTime(),
      item.startTime,
      item.endTime ?? null,
      typeId,
      item.updatedAt?.getTime() ?? null,
      item.itemColor ?? null,
      item.id,
    ]
  );
}

export async function deleteCalendarItem(id: string): Promise<void> {
  const db = await dbPromise;

  // Keep atomic behavior
  await db.withTransactionAsync(async () => {
    await db.runAsync(`DELETE FROM calendar_items WHERE id = ?;`, [id]);
    await db.runAsync(`DELETE FROM calendar_item_tags WHERE itemId = ?;`, [id]);
    await db.runAsync(`DELETE FROM reminders WHERE itemId = ?;`, [id]);
  });
}

export async function getCalendarItemById(
  id: string
): Promise<CalendarItemFormat | null> {
  const db = await dbPromise;

  return db.getFirstAsync<CalendarItemFormat>(
    `
    SELECT ci.*, ct.name AS typeName
    FROM calendar_items ci
    JOIN calendar_types ct ON ci.typeId = ct.id
    WHERE ci.id = ?
    LIMIT 1;
    `,
    [id]
  );
}