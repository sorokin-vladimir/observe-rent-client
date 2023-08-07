import { db } from "$lib/db";
import type { HousingDocType } from "$lib/types";
import { getUTCTimestamp, getUid } from "$lib/utils";

export async function createHousing(housing: Partial<Omit<HousingDocType, 'name' | 'id' | 'createdAt'>> & Pick<HousingDocType, 'name'>) {
  // TODO: Add validation!!!
  const id = await getUid();

  const newHousing: HousingDocType = {
    ...housing,
    id,
    createdAt: getUTCTimestamp(),
  };

  db?.update((_db) => {
    _db?.housings.insert(newHousing);
    return _db;
  })

  return newHousing;
}
