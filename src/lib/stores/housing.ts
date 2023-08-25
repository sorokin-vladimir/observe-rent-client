import type { HousingDocType } from "$lib/types";
import { action, deepMap } from "nanostores";
import type { DeepReadonlyObject } from "rxdb";

export const housings = deepMap<{_: Array<HousingDocType>}>({_: []});

export const updateHousings = action(housings, 'updateHousings', (store, updatedData) => {
  // TODO: Add deep comparation to more granular updates
  store.set({_: updatedData});
  return store.get();
});

export const currentHousing = deepMap<DeepReadonlyObject<HousingDocType> | Record<string, never>>({});
