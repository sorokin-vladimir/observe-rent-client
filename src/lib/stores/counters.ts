import type { CountersStore } from "$lib/types";
import type { Subscription } from 'rxjs';
import { action, deepMap, onSet } from "nanostores";
import { db } from "$lib/db";
import { clearData } from "./utils";
import { currentHousing } from "./housing";
import { getCountersByIds } from "./counter_methods";

export const counters = deepMap<CountersStore>({_: null});

const reinsertCounters = action(counters, 'reinsertCounters', (store, updatedData) => {
  // TODO: Add deep comparation to more granular updates
  store.set({_: updatedData});
  return store.get();
});

const addCounter = action(counters, 'addCounter', (store, updatedData) => {
  const counters = store.get()._;
  counters?.set(updatedData.id, updatedData);
  store.set({_: counters});
  return store.get();
});

const updateCounter = action(counters, 'updateCounter', (store, updatedData) => {
  const counters = store.get()._;
  counters?.set(updatedData.id, updatedData);
  store.set({_: counters});
  return store.get();
});

function _subscriber(): Subscription {
  return db.get()._?.counters.$.subscribe((results) => {
    const counter = clearData(results.documentData);
    switch (results.operation) {
      case 'INSERT': {
        addCounter(counter);
        break;
      }
      case 'UPDATE': {
        updateCounter(counter);
        break;
      }
      case 'DELETE': {
        break;
      }
    }
  })
}

let sub: Subscription | undefined;
// Set existing fields after opening a housing and subscribe to updates
onSet(currentHousing, async ({ newValue }) => {
  if (newValue?.id) {
    const countersId = newValue.counters?.concat() ?? [];
    const counters = await getCountersByIds(countersId);
    reinsertCounters(counters);
    sub = _subscriber();
  } else {
    reinsertCounters(null);
    sub?.unsubscribe();
  }
});
