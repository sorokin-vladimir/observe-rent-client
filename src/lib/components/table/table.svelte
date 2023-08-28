<script lang="ts">
	import { Button, Popover, PopoverBody } from "yesvelte";
  import AddFieldForm from "./add_field_form.svelte";
	import { addMonthlyData, createField } from "$lib/stores/field_methods";
	import { currentHousing, currentHousingId, fields, tableData } from "$lib/stores";
  import Cell from './cell.svelte';
	import { getTimestampForMonthlyData } from "$lib/utils";

  async function addField(event: CustomEvent<{ name: string; }>) {
    if (!$currentHousingId) return;
    await createField({ name: event.detail.name, housingId: $currentHousingId });
	}

  async function addMonth() {
    const dataToUpdate: {fieldId: string; amount: number; price:number}[] = [];
    $fields._?.forEach((val, key) => {
      dataToUpdate.push({ fieldId: key, amount: (Math.random() * 100)^0, price: (Math.random() * 100)^0 });
    })
    addMonthlyData(getTimestampForMonthlyData(), dataToUpdate);
  }

  $: document.documentElement.style.setProperty('--table-rows', ($fields._?.size ?? 0).toString());
  $: document.documentElement.style.setProperty('--table-columns', (($currentHousing?.filledMonths ?? []).length).toString());
</script>

<div>
  <div class="table">
    {#if $fields._?.size}
    <!-- <div class="cell first-col">Name</div> -->
      {#each $tableData as data}
        <Cell
          name={data.name}
          fieldId={data.fieldId}
          month={data.month}
          amount={data.amount}
          price={data.price}
          unit={data.unit}
        />
      {/each}
    {:else}
      <div class="cell">No fields</div>
    {/if}
  </div>
  <div>
    <Button ghost color="primary">
      Add Field
    </Button>
    <Popover trigger="click">
      <PopoverBody>
        <AddFieldForm on:addfield={addField} />
      </PopoverBody>
    </Popover>
  </div>
  <Button on:click={addMonth}>
    Add Month
  </Button>
</div>

<style lang="scss">
  .table {
    display: grid;
    grid-template-columns: repeat(calc(var(--table-columns) + 1), 200px);
    grid-template-rows: repeat(calc(var(--table-rows) + 1), 50px);
    // row-gap: 1rem;
    overflow-x: auto;
    position: relative;
  }
  .first-col {
    position: sticky;
    left: 0;
  }
</style>
