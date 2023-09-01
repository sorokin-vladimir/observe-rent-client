<script lang="ts">
	import { Button, Popover, PopoverBody } from "yesvelte";
  import AddFieldForm from "./add_field_form.svelte";
  import AddMonthlyData from './add_month_modal.svelte';
	import { createField } from "$lib/stores/field_methods";
	import { currentHousing, currentHousingId, fields, tableData } from "$lib/stores";
  import Cell from './cell.svelte';

  let showAddFieldPopover = false;
  let showModal = false;

  async function addField(event: CustomEvent<{ name: string; description: string; unit: string; }>) {
    if (!$currentHousingId) return;
    await createField({
      name: event.detail.name,
      housingId: $currentHousingId,
      description: event.detail.description,
      unit: event.detail.unit,
    });
	}

  async function openAddMonthlyDataModal() {
    showModal = true;
  }
  function closeAddMonthlyDataModal() {
    showModal = false;
  }
  function toggleAddFieldPopover() {
    showAddFieldPopover = !showAddFieldPopover;
    showAddFieldPopover = !showAddFieldPopover;
  }

  $: document.documentElement.style.setProperty('--table-rows', ($fields._?.size ?? 0).toString());
  $: document.documentElement.style.setProperty('--table-columns', (($currentHousing?.filledMonths ?? []).length).toString());
</script>

<div>
  <div class="table">
    {#if $fields._?.size}
      {#each $tableData as data ((data.fieldId || '_') + data.month + data.name)}
        <Cell
          name={data.name}
          fieldId={data.fieldId}
          month={data.month}
          amount={data.amount}
          price={data.price}
          unit={data.unit}
          type={data.type}
          description={data.description}
        />
      {/each}
    {:else}
      <div class="cell">No fields</div>
    {/if}
  </div>
  <div>
    <Button ghost color="primary" on:click={toggleAddFieldPopover}>
      Add Field
    </Button>
    <Popover bind:show={showAddFieldPopover}>
      <PopoverBody>
        <AddFieldForm on:addfield={addField} on:closeAddFieldPopover={toggleAddFieldPopover} />
      </PopoverBody>
    </Popover>
  </div>
  <Button on:click={openAddMonthlyDataModal}>
    Add Month
  </Button>
  <AddMonthlyData on:closeAddMonthlyDataModal={closeAddMonthlyDataModal} show={showModal} />
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
