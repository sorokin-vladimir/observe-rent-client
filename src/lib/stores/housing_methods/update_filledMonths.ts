import type { HousingDocType } from "$lib/types";
import { isRxDocument, type RxDocument } from "rxdb";

export async function _addFilledMonthHousing(housingDoc: RxDocument<HousingDocType>, month: number) {
  if (!isRxDocument(housingDoc)) throw new Error('Housing must be an RxDocument');

  const housing = housingDoc.toJSON();
  const filledMonths = new Set(housing.filledMonths ?? []);
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
