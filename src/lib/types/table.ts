export type TableDataCell = {
  name: string;
  description?: string;
  fieldId?: string;
  amount?: undefined;
  price?: undefined;
  counterId?: string;
  counterValue?: undefined;
  unit?: undefined;
  month?: undefined;
  value?: undefined;
  type: 'first-col';
} | {
  name?: undefined;
  description?: undefined;
  fieldId?: undefined;
  amount?: undefined;
  price?: undefined;
  counterId?: undefined;
  counterValue?: undefined;
  unit?: undefined;
  month: number;
  value?: undefined;
  type: 'header';
} | {
  name?: undefined;
  description?: undefined;
  fieldId?: undefined;
  amount?: undefined;
  price?: undefined;
  counterId?: undefined;
  counterValue?: undefined;
  unit?: undefined;
  month?: undefined;
  value?: undefined;
  type: 'empty';
} | {
  name?: undefined;
  description?: undefined;
  fieldId: string;
  amount: number | undefined;
  price: number | undefined;
  counterId?: undefined;
  counterValue?: undefined;
  unit: string | undefined;
  month: number;
  value?: undefined;
  type: 'data-field';
} | {
  name?: undefined;
  description?: undefined;
  fieldId?: undefined;
  amount?: undefined;
  price?: undefined;
  counterId: string;
  counterValue: number | undefined;
  unit: string | undefined;
  month: number;
  value?: undefined;
  type: 'data-counter';
} | {
  name?: undefined;
  description?: undefined;
  fieldId?: undefined;
  amount?: undefined;
  price?: undefined;
  counterId?: undefined;
  counterValue?: undefined;
  unit?: undefined;
  month?: undefined;
  value: number | string;
  type: 'data-common';
};
