import { _getById } from "./_get_by_id";

export async function getHousingById(housingId: string) {
  const doc = await _getById(housingId).exec();
  return doc?.toJSON();
}
