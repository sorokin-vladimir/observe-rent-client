import { _checkOwner, _getById } from "../utils";

export async function getHousingById(housingId: string) {
  const doc = await _getById('housings', housingId).exec();
  _checkOwner(doc);

  return doc?.toJSON();
}
