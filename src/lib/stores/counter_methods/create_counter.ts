import type { CounterDocType } from "$lib/types";
import { getUTCTimestamp, getUid, isValidId, sanitizeFlatObj } from "$lib/utils";
import { db } from "$lib/db";
import { _getHousingById, _getUserId } from "../utils";


type NewCounter = Partial<Omit<
  CounterDocType, 'name' | 'housingId' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'ordering'
>> & Pick<CounterDocType, 'name' | 'housingId'>;

export async function createCounter(counter: NewCounter) {
  const userId = _getUserId();

  const id = await getUid();
  const currentTime = getUTCTimestamp();

  if (!isValidId(counter.housingId)) throw new Error("Invalid format: housingId");
  const housingDoc = await _getHousingById(counter.housingId)?.exec();
  if (!housingDoc) throw new Error("Housing not found");
  const countersCount = housingDoc.counters?.length ?? 0;

  const sanitizedNewCounter: Partial<CounterDocType> = sanitizeFlatObj(counter);
  if (!sanitizedNewCounter.name) throw new Error('Counter name is required');
  if (!sanitizedNewCounter.housingId) throw new Error('Counter housingId is required');

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
