import { computed } from 'nanostores';
import { fields } from './fields';
import { counters } from './counters';
import { currentHousing } from './housing';
import type { TableDataCell } from '$lib/types';

export const tableData = computed([fields, counters], (fields, counters) => {
  if (!fields._ && !counters._) return [];

  const data: TableDataCell[] = [{ name: 'Field name', type: 'first-col' }];
  const sumByMonth = new Map<number, number>();
  const filledMonths = currentHousing.get()?.filledMonths ?? [];

  // months for fields
  for (const filledMonth of filledMonths) {
    data.push({ month: filledMonth, type: 'header' });
  }

  // TODO: вынести код циклов для полей и счетчиков в отдельные ф-ции
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

  data.push({ name: 'Sum', type: 'first-col' });
  for (const month of filledMonths) {
    data.push({value: sumByMonth.get(month)?.toFixed(2) ?? '', type: 'data-common'});
  }

  for (const _ of filledMonths) {
    data.push({ type: 'empty' });
  }
  // for first column
  data.push({ type: 'empty' });

  data.push({ name: 'Counter name', type: 'first-col' });
  // months for counters
  for (const filledMonth of filledMonths) {
    data.push({ month: filledMonth, type: 'header' });
  }

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

  return data;
});
