import type { HousingDocType } from '$lib/types';
import { getUTCTimestamp, sanitizeFlatObj } from '$lib/utils';
import { _checkOwner, _getById } from '../utils';

type UpdateHousingFields = Partial<Omit<
  HousingDocType,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'fields'
>>

export async function updateHousing(housingId: string, updatedFields: UpdateHousingFields) {
  const housingDoc = await _getById('housings', housingId).exec();
  _checkOwner(housingDoc);

  const currentTime = getUTCTimestamp();
  const sanitizedUpdatedFields: Partial<HousingDocType> = sanitizeFlatObj(updatedFields);
  sanitizedUpdatedFields.updatedAt = currentTime;

  await housingDoc?.incrementalPatch(sanitizedUpdatedFields);
  return true;
}
