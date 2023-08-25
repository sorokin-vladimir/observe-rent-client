import { db } from "$lib/db";
import type { FieldDocType, HousingDocType } from "$lib/types";
import type { RxDocument } from "rxdb";
import { user } from "./user";

export function _getHousingById(housingId: string) {
  return db.get()._?.housings.findOne(housingId);
}

export function _getUserId() {
  const userId = user.get()?.id;
  if (!userId) throw new Error('User not logged in');
  return userId;
}

export function _checkOwner(doc: RxDocument<HousingDocType> | RxDocument<FieldDocType> | null) {
  const userId = _getUserId();

  if (!doc) throw new Error('Document not found');
  if (doc.createdBy !== userId) throw new Error('User not authorized');
}

export function clearData<T extends FieldDocType | HousingDocType>(value: T & Record<string, unknown>): T {
  const { _attachnets, _deleted, _meta, _ref, ...rest } = value;
  const clearedObject = rest;
  for (const key in rest) {
    if (key.startsWith('_')) delete clearedObject[key];
  }

  return clearedObject as T;
}
