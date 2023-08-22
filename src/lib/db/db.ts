import { dev, browser } from "$app/environment";

import { addRxPlugin, createRxDatabase, type RxDatabase } from "rxdb";

import { wrappedValidateZSchemaStorage } from 'rxdb/plugins/validate-z-schema';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

import type { HousingCollection, FieldCollection } from "$lib/types";
import { housingSchemaLiteral } from "./schema_housing";
import { deepMap } from "nanostores";
import { fieldSchemaLiteral } from "./schema_field";

export type DatabaseCollections = {
  housings: HousingCollection;
  fields: FieldCollection;
};
export type Database = RxDatabase<DatabaseCollections, any, any>;

export async function getDB(name: string, password: string) {
  if (!browser) {
    return null;
  }

  if (dev) {
    addRxPlugin(RxDBDevModePlugin);
  }
  addRxPlugin(RxDBUpdatePlugin);

  const db = await createDB(name, password);
  await addCollections(db);

  return db;
}

async function createDB(dbName: string, password: string) {
  const storageWithKeyCompression = wrappedKeyCompressionStorage({
    storage: getRxStorageDexie(),
  });

  const storageWithValidatorAndKeyCompression = wrappedValidateZSchemaStorage({
    storage: storageWithKeyCompression,
  })

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
    },
    fields: {
      schema: fieldSchemaLiteral
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
