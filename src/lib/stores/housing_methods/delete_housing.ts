import { _getHousingById, _checkOwner } from "../utils";

export async function deleteHousing(housingId: string) {
  const doc = await _getHousingById(housingId).exec();
  _checkOwner(doc);

  await doc?.remove();
  return true;
}
