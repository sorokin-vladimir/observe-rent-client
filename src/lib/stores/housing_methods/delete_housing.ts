import { db } from "$lib/db";

export async function deleteHousing(housingId: string) {
  const doc = await db.get()._?.housings.findOne(housingId).exec();
  if (doc) {
    await doc.remove();
    return true;
  }
  return false;
}
