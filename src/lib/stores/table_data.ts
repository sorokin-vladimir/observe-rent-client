import { computed } from 'nanostores';
import { fields } from './fields';
import { counters } from './counters';
import { currentHousing } from './housing';
import type { CountersStore, FieldsStore, TableDataCell } from '$lib/types';
import type { DeepReadonlyArray } from 'rxdb/dist/types/types';

export const tableData = computed([fields, counters, currentHousing], (fields, counters, currentHousing) => {
  if (!(fields._?.size || counters._?.size)) return [];

  const data: TableDataCell[] = [];
  const sumByMonth = new Map<number, number>();
  const filledMonths = currentHousing?.filledMonths ?? [];

  if (fields._?.size) {
    data.push({ name: 'Field name', type: 'first-col' });
    // months for fields
    fillMonths(data, filledMonths);

    // fields data
    fillFields(data, { sumByMonth, fields, filledMonths });

    // Sum row
    data.push({ name: 'Sum', type: 'first-col' });
    fillSum(data, sumByMonth, filledMonths);
  }

  if (fields._?.size && counters._?.size) {
    // row as devider
    // for first column
    data.push({ type: 'empty' });
    fillMonths(data, filledMonths, true);
  }

  if (counters._?.size) {
    data.push({ name: 'Counter name', type: 'first-col' });
    // months for counters
    fillMonths(data, filledMonths);

    // counters data
    fillCounters(data, { counters, filledMonths });
  }

  return data;
});

function fillMonths(data: TableDataCell[], filledMonths: DeepReadonlyArray<number>, fillEmpty = false) {
  for (const filledMonth of filledMonths) {
    data.push(fillEmpty ? { type: 'empty' } : { month: filledMonth, type: 'header' });
  }
}

function fillSum(data: TableDataCell[], sumByMonth: Map<number, number>, filledMonths: DeepReadonlyArray<number>) {
  for (const month of filledMonths) {
    data.push({value: sumByMonth.get(month)?.toFixed(2) ?? '', type: 'data-common'});
  }
}

function fillFields(data: TableDataCell[], { sumByMonth, fields, filledMonths }: FillFieldsProp) {
  for (const field of (fields._ ?? [])) {
    data.push({ name: field[1].name, type: 'first-col', description: field[1].description });

    const map = new Map<number, TableDataCell>();
    for (const monthlyData of (field[1].data ?? [])) {
      if (!monthlyData.month) continue;

      map.set(monthlyData.month, {
        amount: monthlyData.amount,
        price: monthlyData.price,
        month: monthlyData.month,
        fieldId: field[0],
        unit: field[1].unit,
        type: 'data-field',
      });
      sumByMonth.set(
        monthlyData.month,
        (sumByMonth.get(monthlyData.month) ?? 0) + (monthlyData.amount ?? 0) * (monthlyData.price ?? 0)
      );
    }

    for (const month of filledMonths) {
      const cell = map.get(month);
      if (cell) {
        data.push(cell);
      } else {
        data.push({ type: 'empty' });
      }
    }
  }
}

function fillCounters(data: TableDataCell[], { counters, filledMonths } : FillCountersProp) {
  for (const counter of (counters._ ?? [])) {
    data.push({ name: counter[1].name, type: 'first-col', description: counter[1].description });

    const map = new Map<number, TableDataCell>();
    for (const monthlyData of (counter[1].data ?? [])) {
      if (!monthlyData.month) continue;

      map.set(monthlyData.month, {
        counterValue: monthlyData.value,
        month: monthlyData.month,
        counterId: counter[0],
        unit: counter[1].unit,
        type: 'data-counter',
      });
    }

    for (const month of filledMonths) {
      const cell = map.get(month);
      if (cell) {
        data.push(cell);
      } else {
        data.push({ type: 'empty' });
      }
    }
  }
}

type FillFieldsProp = {
  sumByMonth: Map<number, number>;
  fields: FieldsStore;
  filledMonths: DeepReadonlyArray<number>;
};

type FillCountersProp = {
  counters: CountersStore;
  filledMonths: DeepReadonlyArray<number>;
};
