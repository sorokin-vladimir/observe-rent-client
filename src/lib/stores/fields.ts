import type { FieldDocType } from "$lib/types";
import { action, deepMap } from "nanostores";

export const fields = deepMap<{_: Array<FieldDocType>}>({_: []});

export const updateFields = action(fields, 'updateFields', (store, updatedData) => {
  // TODO: Add deep comparation to more granular updates
  store.set({_: updatedData});
  return store.get();
});
