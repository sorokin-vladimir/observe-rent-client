import { db } from "$lib/db";
import type { HousingDocType } from "$lib/types";
import { RentError, getUTCTimestamp, getUid, sanitizeFlatObj } from "$lib/utils";
import { _getUserId } from "../utils";

export type NewHousing = Partial<Omit<
  HousingDocType,
  'name' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'fields'
>> & Pick<HousingDocType, 'name'>;

export async function _createHousing(housing: NewHousing) {
  const userId = _getUserId();

  const id = await getUid();
  const currentTime = getUTCTimestamp();

  const sanitizedNewFields: Partial<HousingDocType> = sanitizeFlatObj(housing);
  if (!sanitizedNewFields.name) throw new RentError('HOUSING_NAME_REQUIRED');

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
