import { dbPromise } from "./db";
import type { Reminder } from "@structure-types";

export async function createReminder(rem: Reminder): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `
    INSERT INTO reminders (id, itemId, offsetMinutes, notificationId)
    VALUES (?, ?, ?, ?);
    `,
    [rem.id, rem.itemId, rem.offsetMinutes, rem.notificationId]
  );
}

export async function updateReminder(rem: Reminder): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `
    UPDATE reminders
    SET
      offsetMinutes = ?,
      notificationId = ?
    WHERE id = ?;
    `,
    [rem.offsetMinutes, rem.notificationId, rem.id]
  );
}

export async function getRemindersForItem(itemId: string): Promise<Reminder[]> {
  const db = await dbPromise;

  return db.getAllAsync<Reminder>(
    `
    SELECT * FROM reminders
    WHERE itemId = ?;
    `,
    [itemId]
  );
}

export async function deleteReminder(id: string): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `DELETE FROM reminders WHERE id = ?;`,
    [id]
  );
}

export async function getReminderById(id: string): Promise<Reminder | null> {
  const db = await dbPromise;

  return db.getFirstAsync<Reminder>(
    `SELECT * FROM reminders WHERE id = ? LIMIT 1;`,
    [id]
  );
}

export async function getAllReminders(): Promise<Reminder[]> {
  const db = await dbPromise;

  return db.getAllAsync<Reminder>(
    `SELECT * FROM reminders;`
  );
}

export async function updateReminderNotificationId(
  id: string,
  notificationId: string
): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `UPDATE reminders SET notificationId = ? WHERE id = ?;`,
    [notificationId, id]
  );
}