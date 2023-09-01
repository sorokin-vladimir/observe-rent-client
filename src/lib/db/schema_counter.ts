import { dev } from '$app/environment';
import { FIELD_NAME_MAX_LENGTH } from '$lib/constants';
import { counterMigrations } from './migrations';

export const counterSchemaLiteral = {
    title: 'Counter schema',
    // description: '',
    version: parseInt(Object.keys(counterMigrations).at(-1) ?? '0', 10),
    keyCompression: !dev,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 24,
            minLength: 24,
            final: true,
        },
        // Self fields
        name: {
            type: 'string',
            minLength: 1,
            maxLength: FIELD_NAME_MAX_LENGTH,
        },
        description: {
            type: 'string',
            maxLength: FIELD_NAME_MAX_LENGTH * 5,
        },
        housingId: {
            type: 'string',
            maxLength: 24,
            minLength: 24,
            final: true,
        },
        ordering: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
        },
        unit: {
            type: 'string',
        },
        value: {
            type: 'number',
            minimum: 0,
        },
        // Meta fields
        createdAt: {
            type: 'number',
            minimum: 0,
            maximum: 5000000000000,
            multipleOf: 1,
            final: true,
        },
        updatedAt: {
            type: 'number',
            minimum: 0,
            maximum: 5000000000000,
            multipleOf: 1,
        },
        createdBy: {
            type: 'string',
            maxLength: 24,
            minLength: 24,
            final: true,
        }
    },
    required: ['id', 'name', 'housingId', 'createdAt', 'updatedAt', 'createdBy'],
    indexes: ['name', 'housingId', 'createdAt', 'updatedAt', 'createdBy']
} as const;
