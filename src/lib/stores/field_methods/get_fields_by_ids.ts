import { db } from "$lib/db";
import type { FieldDocType } from "$lib/types";
import { _getUserId } from "../utils";

export async function getFieldsByIds(fieldIds: string[] | undefined) {
  const userId = _getUserId();
  const fields = new Map<string, FieldDocType>()
  if (!fieldIds || !fieldIds.length) return fields;

  const fieldsCollection = await db.get()._?.fields.findByIds(fieldIds).exec();

  for (const [id, fieldRaw] of fieldsCollection) {
    const field = fieldRaw.toJSON();
    if (field.createdBy !== userId) throw new Error('User not authorized');

    fields.set(id, field);
  }

  return fields;
}
