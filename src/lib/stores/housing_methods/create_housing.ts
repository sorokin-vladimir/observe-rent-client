import DOMPurify from 'dompurify';
import { db } from "$lib/db";
import type { HousingDocType } from "$lib/types";
import { getUTCTimestamp, getUid } from "$lib/utils";
import { user } from '$lib/stores';

type NewHousing = Partial<Omit<HousingDocType, 'name' | 'id' | 'createdAt'>> & Pick<HousingDocType, 'name'>;

export async function createHousing(housing: NewHousing) {
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
