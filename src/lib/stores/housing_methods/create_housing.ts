import { db } from "$lib/db";
import type { HousingDocType } from "$lib/types";
import { getUTCTimestamp, getUid, sanitizeFlatObj } from "$lib/utils";
import { user } from '$lib/stores';

type NewHousing = Partial<Omit<
  HousingDocType,
  'name' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'fields'
>> & Pick<HousingDocType, 'name'>;

export async function createHousing(housing: NewHousing) {
  const userId = user.get()?.id
  if (!userId) throw new Error('User not found');

  const id = await getUid();
  const currentTime = getUTCTimestamp();

  const sanitizedNewFields: Partial<HousingDocType> = sanitizeFlatObj(housing);
  if (!sanitizedNewFields.name) throw new Error('Housing name is required');

  const newHousing: HousingDocType = {
    ...sanitizedNewFields,
    name: sanitizedNewFields.name,
    id,
    createdAt: currentTime,
    updatedAt: currentTime,
    createdBy: userId,
  };

  await db.get()._.housings.insert(newHousing);

  return newHousing;
}
