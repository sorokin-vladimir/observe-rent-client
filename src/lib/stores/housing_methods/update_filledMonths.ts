import type { HousingDocType } from "$lib/types";
import { isRxDocument, type RxDocument } from "rxdb";

export async function pushFilledMonthHousing(housingDoc: RxDocument<HousingDocType>, month: number) {
  console.log(`housingDoc`, housingDoc);
  if (!isRxDocument(housingDoc)) throw new Error('Housing must be an RxDocument');

  // const housing = housingDoc.toJSON();
  // const filledMonths = new Set(housing.filledMonths ?? []);
  const filledMonths = new Set(housingDoc._data.filledMonths ?? []);
  if (filledMonths.has(month)) return true;

  filledMonths.add(month);
  const filledMonthsArray = Array.from(filledMonths).sort();

  await housingDoc?.update({
    $set: {
      filledMonths: filledMonthsArray,
    }
  });

  return true;
}
