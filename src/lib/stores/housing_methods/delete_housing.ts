import { db } from "$lib/db";
import { _getHousingById, _checkOwner } from "../utils";

export async function _deleteHousing(housingId: string) {
  const doc = await _getHousingById(housingId).exec();
  _checkOwner(doc);

  const fieldsToRemove = doc?.fields ?? [];
  if (fieldsToRemove.length) {
    const result = await db.get()._.collections.fields.bulkRemove(fieldsToRemove);
    if (result.error) throw new Error('Error while removing fields');
  }
  const countersToRemove = doc?.counters ?? [];
  if (countersToRemove.length) {
    const result = await db.get()._.collections.counters.bulkRemove(countersToRemove);
    if (result.error) throw new Error('Error while removing counters');
  }

  await doc?.remove();
  return true;
}
