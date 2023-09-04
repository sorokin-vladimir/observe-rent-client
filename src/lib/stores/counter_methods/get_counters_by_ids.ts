import { db } from "$lib/db";
import type { CounterDocType } from "$lib/types";
import type { DeepReadonlyObject } from "rxdb";
import { _getUserId } from "../utils";

export async function getCountersByIds(counterIds: string[] | undefined) {
  const userId = _getUserId();
  const counters = new Map<string, DeepReadonlyObject<CounterDocType>>()
  if (!counterIds || !counterIds.length) return counters;

  const countersCollection = await db.get()._?.counters.findByIds(counterIds).exec();

  for (const [id, counterRaw] of countersCollection) {
    const counter = counterRaw.toJSON();
    if (counter.createdBy !== userId) throw new Error('User not authorized');

    counters.set(id, counter);
  }

  return counters;
}
