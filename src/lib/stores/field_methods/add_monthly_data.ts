import { db } from "$lib/db";
import type { ArrayElement, FieldDocType } from "$lib/types";
import { getUTCTimestamp } from "$lib/utils";
import { _checkOwner, _getHousingById } from "../utils";

type MonthlyArrayElement = ArrayElement<FieldDocType['data']>;
type MonthlyData = {
  amount: MonthlyArrayElement['amount'];
  price: MonthlyArrayElement['price'];
  fieldId: string;
};

export async function addMonthlyData(month: MonthlyArrayElement['month'], data: MonthlyData[]) {
  if (!month) throw new Error('Month is required');
  if (!data.length) throw new Error('Data is required');

  const currentTime = getUTCTimestamp();

  const fieldsId = data.map(({ fieldId }) => fieldId);
  // get fields from db
  const fieldsDoc = await db.get()._.collections.fields.findByIds(fieldsId).exec();

  // get housing from db
  const housingId = fieldsDoc.get(data[0].fieldId)?.housingId;
  if (!housingId) throw new Error('housingId not found');
  const housingDoc = await _getHousingById(housingId)?.exec();
  if (!housingDoc) throw new Error('Housing not found');
  const housing = housingDoc.toJSON();

  // check if housing already has current monthly data
  if (housing?.filledMonths?.includes(month)) throw new Error('Housing already has monthly data');

  // check each field for owner and related housing
  for (const field of fieldsDoc) {
    _checkOwner(field[1]);
    if (field[1].housingId !== housingId) throw new Error('Field is not related to housing');

    const isFieldAlreadyHasMonthlyData = field[1].data?.some(({ month: fieldMonth }) => fieldMonth === month);
    if (isFieldAlreadyHasMonthlyData) throw new Error('Field already has monthly data');

    // update field with monthly data
    const dataToPush = data.find(({ fieldId }) => fieldId === field[0]) ?? { amount: null, price: null };
    await field[1].update({
      $push: {
        data: {
          month,
          amount: dataToPush?.amount,
          price: dataToPush?.price,
        }
      },
      $set: {
        updatedAt: currentTime,
      }
    });
  }

  // update housing with filled months
  await housingDoc?.update({
    $push: {
      filledMonths: month,
    }
  })
}
