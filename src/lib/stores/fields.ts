import type { FieldDocType } from "$lib/types";
import { action, deepMap, onSet } from "nanostores";
import type { Subscription } from 'rxjs';
import { currentHousing } from "./housing";
import { getFieldsByIds } from "./field_methods";
import { db } from "$lib/db";
import { clearData } from "./utils";

export const fields = deepMap<{_: Map<string, FieldDocType> | null}>({_: null});

export const reinsertFields = action(fields, 'reinsertFields', (store, updatedData) => {
  // TODO: Add deep comparation to more granular updates
  store.set({_: updatedData});
  return store.get();
});

export const addField = action(fields, 'addField', (store, updatedData) => {
  const fields = store.get()._;
  fields?.set(updatedData.id, updatedData);
  store.set({_: fields});
  return store.get();
});

function _subscriber(): Subscription {
  return db.get()._?.fields.$.subscribe((results) => {
    const field = clearData(results.documentData);
    switch (results.operation) {
      case 'INSERT': {
        addField(field);
        break;
      }
      case 'UPDATE': {
        break;
      }
      case 'DELETE': {
        break;
      }
    }
  })
}

let sub: Subscription;
// Set existing fields after opening a housing and subscribe to updates
onSet(currentHousing, async ({ newValue }) => {
  if (newValue.id) {
    const fieldsId = newValue.fields?.concat() ?? [];
    const fields = await getFieldsByIds(fieldsId);
    reinsertFields(fields);
    sub = _subscriber();
  } else {
    reinsertFields(null);
    sub.unsubscribe();
  }
});
