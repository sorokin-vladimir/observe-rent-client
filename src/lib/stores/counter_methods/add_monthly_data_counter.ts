import { db } from "$lib/db";
import type { ArrayElement, CounterDocType } from "$lib/types";
import { RentError, getUTCTimestamp } from "$lib/utils";
import { updateFilledMonths } from "../housing";
import { _checkOwner, _getHousingById } from "../utils";

type MonthlyCounterArrayElement = ArrayElement<CounterDocType['data']>;
type MonthlyData = {
  value?: MonthlyCounterArrayElement['value'];
  counterId: string;
};

export async function addMonthlyDataCounter(month: MonthlyCounterArrayElement['month'], data: MonthlyData[]) {
  if (!month) throw new RentError('MONTH_REQUIRED');
  if (!data.length) throw new RentError('DATA_REQUIRED');

  const currentTime = getUTCTimestamp();

  const countersId = data.map(({ counterId }) => counterId);
  // get counters from db
  const countersDoc = await db.get()._.collections.counters.findByIds(countersId).exec();

  // get housing from db
  const housingId = countersDoc.get(data[0].counterId)?.housingId;
  if (!housingId) throw new RentError('HOUSINGID_NOT_FOUND')
  const housingDoc = await _getHousingById(housingId)?.exec();
  if (!housingDoc) throw new RentError('HOUSING_NOT_FOUND');

  // check each counter for owner and related housing
  for (const counter of countersDoc) {
    _checkOwner(counter[1]);
    if (counter[1].housingId !== housingId) throw new RentError('COUNTER_NOT_RELATED_TO_HOUSING');

    const isCounterAlreadyHasMonthlyData = counter[1].data?.some(({ month: counterMonth }) => counterMonth === month);
    if (isCounterAlreadyHasMonthlyData) throw new RentError('COUNTER_ALREADY_HAS_DATA');

    // update counter with monthly data
    const dataToPush = data.find(({ counterId }) => counterId === counter[0]);
    // if one of the presented numbers is not a number or is NaN - skip saving of this counter
    if (
      !dataToPush ||
      typeof dataToPush.value !== 'number' ||
      Number.isNaN(dataToPush.value)
    ) continue;
    await counter[1].update({
      $push: {
        data: {
          month,
          value: dataToPush?.value,
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
