import { _checkOwner, _getHousingById } from "../utils";

export async function getHousingById(housingId: string) {
  const doc = await _getHousingById(housingId)?.exec();
  _checkOwner(doc);

  return doc?.toJSON();
}
