// import { goto } from "$app/navigation";
import type { HousingDocType } from "$lib/types";
import { action, atom, computed, deepMap } from "nanostores";
import type { DeepReadonlyObject, RxDocument } from "rxdb";
import { _addFilledMonthHousing, _createHousing, _deleteHousing, _updateHousing, type NewHousing, type UpdateHousingFields } from "./housing_methods";

export const housings = deepMap<{_: DeepReadonlyObject<Array<HousingDocType>>}>({_: []});

export const updateHousings = action(housings, 'updateHousings', (store, updatedData: DeepReadonlyObject<HousingDocType>[]) => {
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

export async function createHousing(housing: NewHousing) {
  try {
    const newHousing = await _createHousing(housing);
    return newHousing;
  } catch (err) {
    // TODO: Add error handling like notification
    console.error('handled err:', err);
  }
}

export async function deleteHousing(housingId: string) {
  try {
    const result = await _deleteHousing(housingId);
    return result;
  } catch (err) {
    // TODO: Add error handling like notification
    console.error(err);
  }
}

export async function updateHousing(housingId: string, updatedFields: UpdateHousingFields) {
  try {
    const result = await _updateHousing(housingId, updatedFields);
    return result;
  } catch (err) {
    // TODO: Add error handling like notification
    console.error(err);
  }
}
export async function updateFilledMonths(action: 'push', housingDoc: RxDocument<HousingDocType>, month: number) {
  try {
    if (action === 'push') {
      const result = await _addFilledMonthHousing(housingDoc, month);
      return result;
    }
  } catch (err) {
    // TODO: Add error handling like notification
    console.error(err);
  }
}
