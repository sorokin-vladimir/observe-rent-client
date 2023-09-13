import { db } from "$lib/db";
import { user } from "../user";

export function userLogin() {
  user.set({
    id: 'YKYo1qj9pHaJAnKgRumAtest',
    name: 'John Test',
    pwd: 'myPasswordTest',
  });
}

export async function clearDB() {
  return Promise.all([
    db.get()._?.collections.housings.remove(),
    db.get()._?.collections.fields.remove(),
    db.get()._?.collections.counters.remove(),
  ]);
}
