import { _getById, _checkOwner } from "../utils";

export async function deleteHousing(housingId: string) {
  const doc = await _getById('housings', housingId).exec();
  _checkOwner(doc);

  await doc?.remove();
  return true;
}
