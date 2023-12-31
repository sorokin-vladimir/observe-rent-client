import type { HousingDocType } from '$lib/types';
import { getUTCTimestamp, sanitizeFlatObj } from '$lib/utils';
import { _checkOwner, _getHousingById } from '../utils';

export type UpdateHousingFields = Partial<Omit<
  HousingDocType,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'fields' | 'counters'
>>

export async function _updateHousing(housingId: string, updatedFields: UpdateHousingFields) {
  const housingDoc = await _getHousingById(housingId).exec();
  _checkOwner(housingDoc);

  const currentTime = getUTCTimestamp();
  const sanitizedUpdatedFields: Partial<HousingDocType> = sanitizeFlatObj(updatedFields);
  sanitizedUpdatedFields.updatedAt = currentTime;

  await housingDoc?.incrementalPatch(sanitizedUpdatedFields);
  return true;
}
