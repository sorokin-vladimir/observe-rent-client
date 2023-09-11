import { db } from "$lib/db";
import type { FieldDocType } from "$lib/types";
import type { DeepReadonlyObject } from "rxdb";
import { _getUserId } from "../utils";
import { RentError } from "$lib/utils";

export async function _getFieldsByIds(fieldIds: string[] | undefined) {
  const userId = _getUserId();
  const fields = new Map<string, DeepReadonlyObject<FieldDocType>>()
  if (!fieldIds || !fieldIds.length) return fields;

  const fieldsCollection = await db.get()._?.fields.findByIds(fieldIds).exec();

  for (const [id, fieldRaw] of fieldsCollection) {
    const field = fieldRaw.toJSON();
    if (field.createdBy !== userId) throw new RentError('USER_NOT_AUTHORIZED');

    fields.set(id, field);
  }

  return fields;
}
