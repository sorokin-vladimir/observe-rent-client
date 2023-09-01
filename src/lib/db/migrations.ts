import type { RxDocument } from "rxdb";

export const housingMigrations = {
  // added counters array to the schema
  1: (oldDoc: RxDocument) => oldDoc,
};

export const fieldMigrations = {};

export const counterMigrations = {};
