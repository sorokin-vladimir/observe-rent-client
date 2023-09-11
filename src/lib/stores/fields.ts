import type { FieldsStore } from "$lib/types";
import { action, deepMap, onSet } from "nanostores";
import type { Subscription } from 'rxjs';
import { currentHousing } from "./housing";
import {
  _addMonthlyDataField,
  _createField,
  _getFieldsByIds,
  type MonthlyDataField,
  type MonthProp,
  type NewField } from "./field_methods";
import { db } from "$lib/db";
import { clearData } from "./utils";
import { ui } from "./ui";
import { RentError, timestampToReadableDate } from "$lib/utils";

export const fields = deepMap<FieldsStore>({_: null});

const reinsertFields = action(fields, 'reinsertFields', (store, updatedData) => {
  // TODO: Add deep comparation to more granular updates
  store.set({_: updatedData});
  return store.get();
});

const addField = action(fields, 'addField', (store, updatedData) => {
  const fields = store.get()._;
  fields?.set(updatedData.id, updatedData);
  store.set({_: fields});
  return store.get();
});

const updateField = action(fields, 'updateField', (store, updatedData) => {
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
        updateField(field);
        break;
      }
      case 'DELETE': {
        break;
      }
    }
  })
}

let sub: Subscription | undefined;
// Set existing fields after opening a housing and subscribe to updates
onSet(currentHousing, async ({ newValue }) => {
  if (newValue?.id) {
    const fieldsId = newValue.fields?.concat() ?? [];
    const fields = await _getFieldsByIds(fieldsId);
    reinsertFields(fields);
    sub = _subscriber();
  } else {
    reinsertFields(null);
    sub?.unsubscribe();
  }
});

export async function addMonthlyDataField(month: MonthProp, data: MonthlyDataField[]) {
  try {
    const result = await _addMonthlyDataField(month, data);
    if (result) {
      ui.get().pushNotification({
        text: `Fields' data for ${timestampToReadableDate(month, 'long')} was successfully added`,
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

export async function createField(field: NewField) {
  try {
    const result = await _createField(field);
    if (result.id) {
      ui.get().pushNotification({
        text: `Field "${result.name}" was successfully added`,
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
