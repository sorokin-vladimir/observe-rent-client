import { dev, browser } from "$app/environment";
import { writable } from 'svelte/store';

import type { HousingCollection } from "$lib/types";
import { addRxPlugin, createRxDatabase, type RxDatabase } from "rxdb";
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';

import { housingSchemaLiteral } from "./schema_housing";

export type DatabaseCollections = {
  housings: HousingCollection;
};
export type Database = RxDatabase<DatabaseCollections, any, any>;

export async function getDB(name: string, password: string) {
  if (!browser) {
    return null;
  }

  if (dev) {
    addRxPlugin(RxDBDevModePlugin);
  }

  const db = await createDB(name, password);
  await addCollections(db);

  return db;
}

async function createDB(dbName: string, password: string) {
  const storageWithKeyCompression = wrappedKeyCompressionStorage({
    storage: getRxStorageDexie(),
  });

  return createRxDatabase<DatabaseCollections>({
    name: dbName,
    storage: dev ? getRxStorageDexie() : storageWithKeyCompression,
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
    }
  });
}

async function setLeadership(db: Database) {
  addRxPlugin(RxDBLeaderElectionPlugin);
  db.waitForLeadership().then(function() {
    document.title = '♛ ' + document.title;
  });
}

export const db = writable<Database | null>(null);
