import { _getById } from "./_get_by_id";

export async function deleteHousing(housingId: string) {
  const doc = await _getById(housingId).exec();
  if (doc) {
    await doc.remove();
    return true;
  }
  return false;
}
