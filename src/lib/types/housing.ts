import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema,
  type RxDocument,
  type RxCollection,
} from 'rxdb';
import { housingSchemaLiteral } from '$lib/db';

const housingSchemaTyped = toTypedRxJsonSchema(housingSchemaLiteral);

// aggregate the document type from the schema
export type HousingDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof housingSchemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const housingSchema: RxJsonSchema<HousingDocType> = housingSchemaLiteral;

export type HousingDocument = RxDocument<HousingDocType>;

export type HousingCollection = RxCollection<HousingDocType>;
