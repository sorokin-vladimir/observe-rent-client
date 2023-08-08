import { dev } from '$app/environment';
import { HOUSING_NAME_MAX_LENGTH } from '$lib/constants';

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
            final: true,
        },
        name: {
            type: 'string',
            minLength: 1,
            maxLength: HOUSING_NAME_MAX_LENGTH,
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
        address: {
            type: 'string',
        },
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
    required: ['id', 'name', 'createdAt', 'updatedAt', 'createdBy'],
    indexes: ['name', 'createdAt', 'updatedAt', 'createdBy']
} as const;
