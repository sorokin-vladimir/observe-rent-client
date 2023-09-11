// import { goto } from "$app/navigation";
import type { HousingDocType } from "$lib/types";
import { action, atom, computed, deepMap } from "nanostores";
import type { DeepReadonlyObject, RxDocument } from "rxdb";
import {
  _addFilledMonthHousing,
  _createHousing,
  _deleteHousing,
  _updateHousing,
  type NewHousing,
  type UpdateHousingFields } from "./housing_methods";
import { ui } from "./ui";
import type { RentError } from "$lib/utils";

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
    if (newHousing.id) {
      ui.get().pushNotification({
        text: `Housing "${newHousing.name}" was successfully created`,
        type: 'success',
      });
    }
    return newHousing;
  } catch (error) {
    ui.get().pushNotification({
      text: error as RentError,
      type: 'error',
    });
    console.error(error);
  }
}

export async function deleteHousing(housingId: string) {
  try {
    const result = await _deleteHousing(housingId);
    if (result) {
      ui.get().pushNotification({
        text: `Housing and all linked fields and counters was deleted`,
      });
    }
    return result;
  } catch (error) {
    ui.get().pushNotification({
      text: error as RentError,
      type: 'error',
    });
    console.error(error);
  }
}

export async function updateHousing(housingId: string, updatedFields: UpdateHousingFields) {
  try {
    const result = await _updateHousing(housingId, updatedFields);
    if (result) {
      ui.get().pushNotification({
        text: `Housing's was successfully updated`,
      });
    }
    return result;
  } catch (error) {
    ui.get().pushNotification({
      text: error as RentError,
      type: 'error',
    });
    console.error(error);
  }
}
export async function updateFilledMonths(action: 'push', housingDoc: RxDocument<HousingDocType>, month: number) {
  try {
    if (action === 'push') {
      const result = await _addFilledMonthHousing(housingDoc, month);
      // Notification was already shown for fields and counters
      return result;
    }
  } catch (error) {
    ui.get().pushNotification({
      text: error as RentError,
      type: 'error',
    });
    console.error(error);
  }
}
