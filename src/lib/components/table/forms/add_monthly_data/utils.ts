import type { CounterDocType, FieldDocType } from "$lib/types";

export function generateDataObject(fields: Map<string, FieldDocType> | null, counters: Map<string, CounterDocType> | null) {
  const data: Record<string, Record<string, string>> = {};

  for (const [id, _field] of (fields ?? [])) {
    data[id] = {};
    data[id].amount = '';
    data[id].price = '';
  }

  for (const [id, _counter] of (counters ?? [])) {
    data[id] = {};
    data[id].value = '';
  }

  return data;
}
