import { db, getDB } from "$lib/db";
import type { User } from "$lib/types";
import { deepMap, onSet } from "nanostores";
import { updateHousings } from "./housing";
import type { Subscription } from 'rxjs';
import { setFullscreenLoader } from "./ui";

export const user = deepMap<User | Record<string, never>>({});

let querySub: Subscription | undefined;
onSet(user, async ({ newValue }) => {
  if (newValue.id) {
    /** Create (or get) DB */
    const _db = await getDB('test_name', newValue.pwd);

    /** Set the DB in a store to easy access */
    if (!_db) throw new Error('DB is not defined');
    db.set({ _: _db });

    /** Subscribe to updates */
    const query = _db?.housings.find();
    querySub = query?.$.subscribe((results) => {
      updateHousings(results.map((result) => result.toJSON()))
    })
  } else {
    /** Unsubscribe from updates */
    querySub?.unsubscribe();

    /** Destroy the DB */
    await db.get()._.destroy();

    /** Remove the DB from a store */
    db.set({});
  }

  setFullscreenLoader(false);
});
