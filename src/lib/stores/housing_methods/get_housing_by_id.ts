import { db } from "$lib/db";

export async function getHousingById(housingId: string) {
  const doc = await db.get()._?.housings.findOne(housingId).exec();
  return doc ? doc.toJSON() : null;
}
