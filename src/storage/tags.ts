import { dbPromise } from "./db";
import type { TagType } from "@structure-types";

export async function createTag(
  id: string,
  name: string,
  color: string
): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `
    INSERT OR IGNORE INTO tags (id, name, color)
    VALUES (?, ?, ?);
    `,
    [id, name, color]
  );
}

export async function addTagToItem(
  itemId: string,
  tagId: string
): Promise<void> {
  const db = await dbPromise;

  await db.runAsync(
    `
    INSERT OR IGNORE INTO calendar_item_tags (itemId, tagId)
    VALUES (?, ?);
    `,
    [itemId, tagId]
  );
}

export async function getTagsForItem(
  itemId: string
): Promise<TagType[]> {
  const db = await dbPromise;

  return db.getAllAsync<TagType>(
    `
    SELECT t.id, t.name, t.color
    FROM tags t
    JOIN calendar_item_tags cit ON t.id = cit.tagId
    WHERE cit.itemId = ?;
    `,
    [itemId]
  );
}

export async function getAllTags(): Promise<TagType[]> {
  const db = await dbPromise;

  return db.getAllAsync<TagType>(
    `SELECT * FROM tags;`
  );
}