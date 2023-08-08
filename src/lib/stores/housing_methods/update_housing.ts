import type { HousingDocType } from '$lib/types';
import { getUTCTimestamp, sanitizeFlatObj } from '$lib/utils';
import { _getById } from './_get_by_id';

type UpdateHousingFields = Partial<Omit<HousingDocType, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>

export async function updateHousing(housingId: string, updatedFields: UpdateHousingFields) {
  const housingDoc = await _getById(housingId).exec();
  if (!housingDoc) return false;

  const currentTime = getUTCTimestamp();
  const sanitizedUpdatedFields: Partial<HousingDocType> = sanitizeFlatObj({ ...updatedFields, updatedAt: currentTime });
  await housingDoc.incrementalPatch(sanitizedUpdatedFields);
  return true;
}
