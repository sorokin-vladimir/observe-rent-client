import { db } from "$lib/db";
import type { CounterDocType } from "$lib/types";
import type { DeepReadonlyObject } from "rxdb";
import { _getUserId } from "../utils";
import { RentError } from "$lib/utils";

export async function _getCountersByIds(counterIds: string[] | undefined) {
  const userId = _getUserId();
  const counters = new Map<string, DeepReadonlyObject<CounterDocType>>()
  if (!counterIds || !counterIds.length) return counters;

  const countersCollection = await db.get()._?.counters.findByIds(counterIds).exec();

  for (const [id, counterRaw] of countersCollection) {
    const counter = counterRaw.toJSON();
    if (counter.createdBy !== userId) throw new RentError('USER_NOT_AUTHORIZED');

    counters.set(id, counter);
  }

  return counters;
}
