import { db } from "$lib/db";

export function _getById(housingId: string) {
  return db.get()._?.housings.findOne(housingId);
}
