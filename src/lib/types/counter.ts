import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema,
  type RxDocument,
  type RxCollection,
} from 'rxdb';
import { counterSchemaLiteral } from '$lib/db/schema_counter';

const counterSchemaTyped = toTypedRxJsonSchema(counterSchemaLiteral);

// aggregate the document type from the schema
export type CounterDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof counterSchemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const counterSchema: RxJsonSchema<CounterDocType> = counterSchemaLiteral;

export type CounterDocument = RxDocument<CounterDocType>;

export type CounterCollection = RxCollection<CounterDocType>;
