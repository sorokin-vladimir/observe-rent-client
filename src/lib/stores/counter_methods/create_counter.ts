import type { CounterDocType } from "$lib/types";
import { RentError, getUTCTimestamp, getUid, isValidId, sanitizeFlatObj } from "$lib/utils";
import { db } from "$lib/db";
import { _getHousingById, _getUserId } from "../utils";


export type NewCounter = Partial<Omit<
  CounterDocType, 'name' | 'housingId' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'ordering'
>> & Pick<CounterDocType, 'name' | 'housingId'>;

export async function _createCounter(counter: NewCounter) {
  const userId = _getUserId();

  const id = await getUid();
  const currentTime = getUTCTimestamp();

  if (!isValidId(counter.housingId)) throw new RentError('HOUSINGID_INVALID_FORMAT')
  const housingDoc = await _getHousingById(counter.housingId)?.exec();
  if (!housingDoc) throw new RentError('HOUSING_NOT_FOUND');
  const countersCount = housingDoc.counters?.length ?? 0;

  const sanitizedNewCounter: Partial<CounterDocType> = sanitizeFlatObj(counter);
  if (!sanitizedNewCounter.name) throw new RentError('COUNTER_NAME_REQUIRED')
  if (!sanitizedNewCounter.housingId) throw new RentError('HOUSINGID_REQUIRED');

  const newCounter: CounterDocType = {
    ...sanitizedNewCounter,
    name: sanitizedNewCounter.name,
    housingId: sanitizedNewCounter.housingId,
    ordering: (countersCount + 1) * 100,
    id,
    createdAt: currentTime,
    updatedAt: currentTime,
    createdBy: userId,
  };

  await housingDoc.update({ $push: { counters: id } });
  await db.get()._.counters.insert(newCounter);

  return newCounter;
}
