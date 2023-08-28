// import { goto } from "$app/navigation";
import type { HousingDocType } from "$lib/types";
import { action, atom, computed, deepMap } from "nanostores";

export const housings = deepMap<{_: Array<HousingDocType>}>({_: []});

export const updateHousings = action(housings, 'updateHousings', (store, updatedData) => {
  // TODO: Add deep comparation to more granular updates
  store.set({_: updatedData});
  return store.get();
});

export const currentHousingId = atom<string | null>(null);
export const currentHousing = computed([housings, currentHousingId], (housings, currentHousingId) => {
  if (!currentHousingId) return null;
  const housing = housings._.find((housing) => housing.id === currentHousingId);
  if (!housing) {
    // goto('/');
    return null;
  }
  return housing;
});
