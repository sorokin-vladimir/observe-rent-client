import { dev, browser,  } from "$app/environment";
import type { HousingCollection, FieldCollection, CounterCollection } from "$lib/types";

import { deepMap } from "nanostores";
import { addRxPlugin, createRxDatabase, type RxDatabase } from "rxdb";
import { wrappedValidateZSchemaStorage } from 'rxdb/plugins/validate-z-schema';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import { getRxStorageDexie, RxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { getRxStorageMemory, type RxStorageMemory } from 'rxdb/plugins/storage-memory';

import { housingSchemaLiteral } from "./schema_housing";
import { fieldSchemaLiteral } from "./schema_field";
import { counterSchemaLiteral } from './schema_counter';
import { counterMigrations, fieldMigrations, housingMigrations } from "./migrations";

export type DatabaseCollections = {
  housings: HousingCollection;
  fields: FieldCollection;
  counters: CounterCollection;
};
export type Database = RxDatabase<DatabaseCollections, any, any>;

const env = process.env.NODE_ENV;

export async function getDB(name: string, password: string) {
  if (!browser && env !== 'test') {
    return null;
  }

  if (dev) {
    addRxPlugin(RxDBDevModePlugin);
  }
  addRxPlugin(RxDBUpdatePlugin);
  addRxPlugin(RxDBMigrationPlugin);

  const db = await createDB(name, password);
  await addCollections(db);

  return db;
}

async function createDB(dbName: string, password: string) {
  const storageWithValidatorAndKeyCompression = env === 'test' ?
    wrappedValidateZSchemaStorage({
      storage: wrappedKeyCompressionStorage({
        storage: getRxStorageMemory(),
      }),
    })
    :
    wrappedValidateZSchemaStorage({
      storage: wrappedKeyCompressionStorage({
        storage: getRxStorageDexie(),
      }),
    });

  return createRxDatabase<DatabaseCollections>({
    name: dbName,
    storage: storageWithValidatorAndKeyCompression,
    ignoreDuplicate: false,
    password,
    multiInstance: true
  });
}

async function addCollections(db: Database) {
  await setLeadership(db);

  await db.addCollections({
    housings: {
      schema: housingSchemaLiteral,
      migrationStrategies: housingMigrations,
    },
    fields: {
      schema: fieldSchemaLiteral,
      migrationStrategies: fieldMigrations,
    },
    counters: {
      schema: counterSchemaLiteral,
      migrationStrategies: counterMigrations,
    }
  });
}

async function setLeadership(db: Database) {
  addRxPlugin(RxDBLeaderElectionPlugin);
  db.waitForLeadership().then(function() {
    document.title = '♛ ' + document.title;
  });
}

export const db = deepMap<{ _: Database } | Record<string, never>>({});
