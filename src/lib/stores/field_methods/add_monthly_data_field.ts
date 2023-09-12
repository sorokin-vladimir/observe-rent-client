import { db } from "$lib/db";
import type { ArrayElement, FieldDocType } from "$lib/types";
import { RentError, getUTCTimestamp } from "$lib/utils";
import { updateFilledMonths } from "../housing";
import { _checkOwner, _getHousingById } from "../utils";

type MonthlyFieldArrayElement = ArrayElement<FieldDocType['data']>;
export type MonthPropField = NonNullable<MonthlyFieldArrayElement['month']>;
export type MonthlyDataField = {
  amount?: MonthlyFieldArrayElement['amount'];
  price?: MonthlyFieldArrayElement['price'];
  fieldId: string;
};

export async function _addMonthlyDataField(month: MonthPropField, data: MonthlyDataField[]) {
  if (!month) throw new RentError('MONTH_REQUIRED');
  if (!data.length) throw new RentError('DATA_REQUIRED');

  const currentTime = getUTCTimestamp();

  const fieldsId = data.map(({ fieldId }) => fieldId);
  // get fields from db
  const fieldsDoc = await db.get()._.collections.fields.findByIds(fieldsId).exec();

  // get housing from db
  const housingId = fieldsDoc.get(data[0].fieldId)?.housingId;
  if (!housingId) throw new RentError('HOUSINGID_NOT_FOUND');
  const housingDoc = await _getHousingById(housingId)?.exec();
  if (!housingDoc) throw new RentError('HOUSING_NOT_FOUND');

  // check each field for owner and related housing
  for (const field of fieldsDoc) {
    _checkOwner(field[1]);
    if (field[1].housingId !== housingId) throw new RentError('FIELD_NOT_RELATED_TO_HOUSING');

    const isFieldAlreadyHasMonthlyData = field[1].data?.some(({ month: fieldMonth }) => fieldMonth === month);
    if (isFieldAlreadyHasMonthlyData) throw new RentError('FIELD_ALREADY_HAS_DATA');

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
