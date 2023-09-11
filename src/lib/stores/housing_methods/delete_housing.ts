import { db } from "$lib/db";
import { RentError } from "$lib/utils";
import { _getHousingById, _checkOwner } from "../utils";

export async function _deleteHousing(housingId: string) {
  const doc = await _getHousingById(housingId).exec();
  _checkOwner(doc);

  const fieldsToRemove = doc?.fields ?? [];
  if (fieldsToRemove.length) {
    const result = await db.get()._.collections.fields.bulkRemove(fieldsToRemove);
    if (result.error) throw new RentError('FIELD_REMOVING')
  }
  const countersToRemove = doc?.counters ?? [];
  if (countersToRemove.length) {
    const result = await db.get()._.collections.counters.bulkRemove(countersToRemove);
    if (result.error) throw new RentError('COUNTER_REMOVING');
  }

  await doc?.remove();
  return true;
}
