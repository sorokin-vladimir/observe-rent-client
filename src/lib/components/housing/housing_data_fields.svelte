<script lang="ts">
  import { currentHousing } from '$lib/stores';
	import { getHousingById, updateHousing } from '$lib/stores/housing_methods';
	import type { HousingDocType } from '$lib/types';
	import { Button, Input, Label } from 'yesvelte';

  async function handleSave() {
    const updatedData: Partial<HousingDocType> = {};
    if (name && name !== $currentHousing.name) updatedData.name = name;
    if (area && area !== $currentHousing.area) updatedData.area = area;
    if (livingArea && livingArea !== $currentHousing.livingArea) updatedData.livingArea = livingArea;
    if (address && address !== $currentHousing.address) updatedData.address = address;

    const result = await updateHousing($currentHousing.id, updatedData);

    if (!result) {
      // TODO: show error
      return;
    }
    // TODO: looks like this is some dirty hack. Think how it can be changed
    const h = await getHousingById($currentHousing.id);
    if (h) currentHousing.set(h);
  }

  let isReadonly = false;

  let name: HousingDocType['name'];
  let area: HousingDocType['area'];
  let livingArea: HousingDocType['livingArea'];
  let address: HousingDocType['address'];

  function reassignValues() {
    name = $currentHousing.name;
    area = $currentHousing.area;
    livingArea = $currentHousing.livingArea;
    address = $currentHousing.address;
  }

  $: $currentHousing, reassignValues();
</script>

<div>
  <div class="fields-wrapper">
    <Label mb="0" for="housing_name">Name</Label>
    <Input id="housing_name" bind:value={name} />
    <Label mb="0" for="housing_area">Area</Label>
    <Input id="housing_area" type="number" bind:value={area} />
    <Label mb="0" for="housing_living_area">Living area</Label>
    <Input id="housing_living_area" type="number" bind:value={livingArea} />
    <Label mb="0" for="housing_address">Address</Label>
    <Input id="housing_address" bind:value={address} />
  </div>
  <div class="buttons-wrapper">
    <Button color="primary" on:click={() => isReadonly = !isReadonly}>Edit</Button>
    <Button color="primary" on:click={handleSave}>
      Save
    </Button>
  </div>
</div>

<style lang="scss">
  .fields-wrapper {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 8px;
    align-items: center;
    margin-bottom: 2rem;
    max-width: 24rem;
  }
</style>
