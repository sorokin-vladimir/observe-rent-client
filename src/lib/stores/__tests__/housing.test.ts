import { beforeAll, describe, expect, test } from "vitest";
import { clearDB, userLogin } from "./util";
import { createHousing, deleteHousing, housings, updateHousing } from "../housing";
import { _getHousingById } from "../utils";
import { db } from "$lib/db";

describe('Housing flow', () => {
  let housingId: string | undefined;
  beforeAll(async () => {
    userLogin();
    await clearDB();
  });

  describe('Empty collection', () => {
    test('No housings', () => {
      expect(housings.get()._.length).toBe(0);
    });
  });

  describe('Happy path', () => {
    describe('Add Housing', () => {
      test('Add first housing', async () => {
        const newHousing = await createHousing({ name: 'First Housing' });

        expect(housings.get()._.length).toBe(1);
        expect(newHousing?.id).toBeDefined();
        expect(newHousing?.name).toBe('First Housing');
        housingId = newHousing?.id;
      });

      test('Add second housing', async () => {
        const newHousing = await createHousing({ name: 'Second Housing' });

        expect(housings.get()._.length).toBe(2);
        expect(newHousing?.id).toBeDefined();
        expect(newHousing?.name).toBe('Second Housing');
      });
    });

    describe('Update Housing', () => {
      test('Update first housing', async () => {
        const housing = await _getHousingById(housingId!).exec();
        expect(housing).toBeDefined();
        expect(housing?.address).toBeUndefined();
        expect(housing?.area).toBeUndefined();
        expect(housing?.livingArea).toBeUndefined();

        const result = await updateHousing(housing!.id, {
          name: 'Updated First Housing',
          address: 'Address',
          area: 99,
          livingArea: 88,
        });

        const updatedHousingFromDb = await _getHousingById(housing!.id).exec();

        expect(result).toBe(true);
        expect(updatedHousingFromDb?.name).toBe('Updated First Housing');
        expect(updatedHousingFromDb?.address).toBe('Address');
        expect(updatedHousingFromDb?.area).toBe(99);
        expect(updatedHousingFromDb?.livingArea).toBe(88);
      });

      test('Update currency of the first housing', async () => {
        const housing = await _getHousingById(housingId!).exec();
        expect(housing).toBeDefined();
        expect(housing?.currency).toBe('EUR');

        const result = await updateHousing(housing!.id, {
          currency: 'USD',
        });

        const updatedHousingFromDb = await _getHousingById(housing!.id).exec();

        expect(result).toBe(true);
        expect(updatedHousingFromDb?.currency).toBe('USD');
      });
    });

    describe('Delete Housing', () => {
      test('Delete first housing', async () => {
        const allHousings = await db.get()._.housings.find().exec();
        expect(allHousings.length).toBe(2);
        const result = await deleteHousing(housingId!);

        expect(result).toBe(true);
        const allHousingsAfterDelete = await db.get()._.housings.find().exec();
        expect(allHousingsAfterDelete.length).toBe(1);
      });
    });
  });
});
