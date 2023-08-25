import type { FieldDocType } from "$lib/types";
import { getUTCTimestamp, getUid, isValidId, sanitizeFlatObj } from "$lib/utils";
import { db } from "$lib/db";
import { _getHousingById, _getUserId } from "../utils";


type NewField = Partial<Omit<
  FieldDocType, 'name' | 'housingId' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'ordering'
>> & Pick<FieldDocType, 'name' | 'housingId'>;

export async function createField(field: NewField) {
  const userId = _getUserId();

  const id = await getUid();
  const currentTime = getUTCTimestamp();

  if (!isValidId(field.housingId)) throw new Error("Invalid format: housingId");
  const housingDoc = await _getHousingById(field.housingId)?.exec();
  if (!housingDoc) throw new Error("Housing not found");
  const fieldsCount = housingDoc.fields?.length ?? 0;

  const sanitizedNewFields: Partial<FieldDocType> = sanitizeFlatObj(field);
  if (!sanitizedNewFields.name) throw new Error('Field name is required');
  if (!sanitizedNewFields.housingId) throw new Error('Field housingId is required');

  const newField: FieldDocType = {
    ...sanitizedNewFields,
    name: sanitizedNewFields.name,
    housingId: sanitizedNewFields.housingId,
    ordering: (fieldsCount + 1) * 100,
    id,
    createdAt: currentTime,
    updatedAt: currentTime,
    createdBy: userId,
  };

  await housingDoc.update({ $push: { fields: id } });
  await db.get()._.fields.insert(newField);

  return newField;
}
