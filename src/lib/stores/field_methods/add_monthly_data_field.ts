import { db } from "$lib/db";
import type { ArrayElement, FieldDocType } from "$lib/types";
import { getUTCTimestamp } from "$lib/utils";
import { updateFilledMonths } from "../housing";
import { _checkOwner, _getHousingById } from "../utils";

type MonthlyFieldArrayElement = ArrayElement<FieldDocType['data']>;
type MonthlyDataField = {
  amount?: MonthlyFieldArrayElement['amount'];
  price?: MonthlyFieldArrayElement['price'];
  fieldId: string;
};

export async function addMonthlyDataField(month: MonthlyFieldArrayElement['month'], data: MonthlyDataField[]) {
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
  // if (housing?.filledMonths?.includes(month)) throw new Error('Housing already has monthly data');

  // check each field for owner and related housing
  for (const field of fieldsDoc) {
    _checkOwner(field[1]);
    if (field[1].housingId !== housingId) throw new Error('Field is not related to housing');

    const isFieldAlreadyHasMonthlyData = field[1].data?.some(({ month: fieldMonth }) => fieldMonth === month);
    if (isFieldAlreadyHasMonthlyData) throw new Error('Field already has monthly data');

    // update field with monthly data
    const dataToPush = data.find(({ fieldId }) => fieldId === field[0]);
    // if one of the presented numbers is not a number or is NaN - skip saving of this field
    if (
      !dataToPush ||
      typeof dataToPush.amount !== 'number' ||
      Number.isNaN(dataToPush.amount) ||
      typeof dataToPush.price !== 'number' ||
      Number.isNaN(dataToPush.price)
    ) continue;

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
  await updateFilledMonths('push', housingDoc, month);

  return true;
}