import { computed } from 'nanostores';
import { fields } from './fields';
import { currentHousing } from './housing';

type TableDataCell = {
  name?: string;
  description?: string;
  fieldId: string | null;
  amount?: number;
  price?: number;
  unit?: string;
  month?: number;
  type: 'first-col' | 'header' | 'data';
};

export const tableData = computed(fields, (fields) => {
  if (!fields._) return [];

  const data: TableDataCell[] = [{ name: 'Name', fieldId: null, type: 'first-col' }];
  const sumByMonth = new Map<number, number>();
  const filledMonths = currentHousing.get()?.filledMonths ?? [];
  for (const filledMonth of filledMonths) {
    // TODO: change to human-readable format of date
    data.push({ month: filledMonth, fieldId: null, type: 'header' });
  }

  for (const field of fields._) {
    data.push({ name: field[1].name, fieldId: field[0], type: 'first-col', description: field[1].description });

    const map = new Map<number, TableDataCell>();
    for (const monthlyData of (field[1].data ?? [])) {
      if (!monthlyData.month) continue;

      map.set(monthlyData.month, {
        amount: monthlyData.amount,
        price: monthlyData.price,
        month: monthlyData.month,
        fieldId: field[0],
        unit: field[1].unit,
        type: 'data',
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
        data.push({ fieldId: null, type: 'data' });
      }
    }
  }

  data.push({ name: 'Sum', fieldId: null, type: 'first-col' });
  for (const month of filledMonths) {
    data.push({name: sumByMonth.get(month)?.toFixed(2) ?? '', fieldId: null, type: 'data'});
  }

  return data;
});
