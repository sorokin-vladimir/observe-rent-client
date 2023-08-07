import { dev } from '$app/environment';

export const housingSchemaLiteral = {
  title: 'Housing schema',
  // description: '',
  version: 0,
  keyCompression: !dev,
  primaryKey: 'id',
  type: 'object',
  properties: {
      id: {
          type: 'string',
          maxLength: 24,
          minLength: 24,
      },
      name: {
          type: 'string',

      },
      area: {
          type: 'number',
          minimum: 0,
          maximum: 10000,
      },
      livingArea: {
          type: 'number',
          minimum: 0,
          maximum: 10000,
      },
      createdAt: {
          type: 'number',
          minimum: 0,
          maximum: 5000000000000,
          multipleOf: 1,
      }
  },
  required: ['id', 'name', 'createdAt'],
  indexes: ['createdAt']
} as const;
