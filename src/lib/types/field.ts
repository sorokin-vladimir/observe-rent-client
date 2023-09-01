import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema,
  type RxDocument,
  type RxCollection,
} from 'rxdb';
import { fieldSchemaLiteral } from '$lib/db/schema_field';

const fieldSchemaTyped = toTypedRxJsonSchema(fieldSchemaLiteral);

// aggregate the document type from the schema
export type FieldDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof fieldSchemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const fieldSchema: RxJsonSchema<FieldDocType> = fieldSchemaLiteral;

export type FieldDocument = RxDocument<FieldDocType>;

export type FieldCollection = RxCollection<FieldDocType>;
