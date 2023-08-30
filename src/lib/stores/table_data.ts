import { computed } from 'nanostores';
import { fields } from './fields';
import { currentHousing } from './housing';

type TableDataCell = {
  name?: string;
  fieldId: string | null;
  amount?: number;
  price?: number;
  unit?: string;
  month?: number;
};

export const tableData = computed(fields, (fields) => {
  if (!fields._) return [];

  const data: TableDataCell[] = [{ name: 'Name', fieldId: null }];
  const filledMonths = currentHousing.get()?.filledMonths ?? [];
  for (const filledMonth of filledMonths) {
    // TODO: change to human-readable format of date
    data.push({ month: filledMonth, fieldId: null });
  }

  for (const field of fields._) {
    data.push({ name: field[1].name, fieldId: field[0] });

    const map = new Map<number, TableDataCell>();
    for (const monthlyData of (field[1].data ?? [])) {
      if (!monthlyData.month) continue;

      map.set(monthlyData.month, {
        amount: monthlyData.amount,
        price: monthlyData.price,
        month: monthlyData.month,
        fieldId: field[0],
        unit: field[1].unit,
      });
    }

    for (const month of filledMonths) {
      const cell = map.get(month);
      if (cell) {
        data.push(cell);
      } else {
        data.push({ fieldId: null });
      }
    }
  }

  return data;
});
