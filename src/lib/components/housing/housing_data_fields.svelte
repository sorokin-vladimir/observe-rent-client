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
    isReadonly = true;
  }

  let isReadonly = true;
  let props: { disabled?: boolean } = {};

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
  $: props = isReadonly ? { disabled: true } : {};
</script>

<div>
  <div class="fields-wrapper">
    <Label mb="0" for="housing_name">Name</Label>
    <Input id="housing_name" bind:value={name} { ...props } />
    <Label mb="0" for="housing_area">Area</Label>
    <Input id="housing_area" type="number" bind:value={area} { ...props } />
    <Label mb="0" for="housing_living_area">Living area</Label>
    <Input id="housing_living_area" type="number" bind:value={livingArea} { ...props } />
    <Label mb="0" for="housing_address">Address</Label>
    <Input id="housing_address" bind:value={address} { ...props } />
  </div>
  <div class="buttons-wrapper">
    <Button outline style="width: 5rem;" color="primary" on:click={() => isReadonly = !isReadonly}>
      {#if isReadonly}
        Edit
      {:else}
        Cancel
      {/if}
    </Button>
    {#if !isReadonly}
      <Button color="primary" on:click={handleSave}>
        Save
      </Button>
    {/if}
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
    margin-bottom: 1rem;
    max-width: 24rem;
  }
  .buttons-wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 10rem;
    margin-left: 14rem;
    margin-bottom: 2rem;
  }
</style>
