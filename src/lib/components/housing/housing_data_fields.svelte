<script lang="ts">
  import { currentHousing } from '$lib/stores';
	import { updateHousing } from '$lib/stores/housing_methods';
	import type { HousingDocType } from '$lib/types';
	import { Button, Input, Label, Select } from 'yesvelte';

  async function handleSave() {
    const updatedData: Partial<HousingDocType> = {};
    if (name && name !== $currentHousing?.name) updatedData.name = name;
    if (currency && currency !== $currentHousing?.currency) updatedData.currency = currency;
    if (area && area !== $currentHousing?.area) updatedData.area = area;
    if (livingArea && livingArea !== $currentHousing?.livingArea) updatedData.livingArea = livingArea;
    if (address && address !== $currentHousing?.address) updatedData.address = address;

    if (!$currentHousing?.id) return;
    const result = await updateHousing($currentHousing.id, updatedData);

    if (!result) {
      // TODO: show error
      return;
    }
    isReadonly = true;
  }

  let isReadonly = true;
  let props: { disabled?: boolean } = {};
  const currency_items = ['EUR', 'USD'];

  let name: HousingDocType['name'];
  let currency: HousingDocType['currency'] = currency_items[0];
  let area: HousingDocType['area'];
  let livingArea: HousingDocType['livingArea'];
  let address: HousingDocType['address'];


  function reassignValues() {
    name = $currentHousing?.name ?? '';
    currency = $currentHousing?.currency ?? currency_items[0];
    area = $currentHousing?.area;
    livingArea = $currentHousing?.livingArea;
    address = $currentHousing?.address;
  }

  $: $currentHousing, reassignValues();
  $: props = isReadonly ? { disabled: true } : {};
</script>

<div>
  <div class="fields-wrapper">
    <Label mb="0" for="housing_name">Name</Label>
    <Input id="housing_name" bind:value={name} { ...props } />
    <Label mb="0" for="housing_currency">Currency</Label>
    <Select id="housing_currency" bind:value={currency} items={currency_items} { ...props } />
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
