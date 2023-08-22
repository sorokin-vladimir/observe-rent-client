import { db } from "$lib/db";
import type { FieldDocType, HousingDocType } from "$lib/types";
import type { RxDocument } from "rxdb";
import { user } from "./user";

export function _getHousingById(housingId: string) {
  return db.get()._?.housings.findOne(housingId);
}
export function _getFieldById(housingId: string) {
  return db.get()._?.fields.findOne(housingId);
}

export function _checkOwner(doc: RxDocument<HousingDocType> | RxDocument<FieldDocType> | null) {
  const userId = user.get()?.id;

  if (!userId) throw new Error('User not logged in');
  if (!doc) throw new Error('Document not found');
  if (doc.createdBy !== userId) throw new Error('User not authorized');
}
