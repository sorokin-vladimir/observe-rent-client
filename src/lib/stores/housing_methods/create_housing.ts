import DOMPurify from 'dompurify';
import { db } from "$lib/db";
import type { HousingDocType } from "$lib/types";
import { getUTCTimestamp, getUid } from "$lib/utils";
import { user } from '$lib/stores';

export async function createHousing(housing: Partial<Omit<HousingDocType, 'name' | 'id' | 'createdAt'>> & Pick<HousingDocType, 'name'>) {
  const id = await getUid();
  const currentTime = getUTCTimestamp();

  const newHousing: HousingDocType = {
    ...housing,
    name: DOMPurify.sanitize(housing.name).trim(),
    id,
    createdAt: currentTime,
    updatedAt: currentTime,
    createdBy: user.get()?.id,
  };

  await db.get()._.housings.insert(newHousing);

  return newHousing;
}
