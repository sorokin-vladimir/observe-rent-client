<script lang="ts">
	import { Button, Popover, PopoverBody } from "yesvelte";
  import AddFieldForm from "./forms/add_field_form.svelte";
  import AddCounterForm from "./forms/add_counter_form.svelte";
  import { AddMonthlyData } from './forms/add_monthly_data';
	import { createField } from "$lib/stores";
	import { counters, currentHousing, currentHousingId, fields, tableData } from "$lib/stores";
  import { Cell } from './cell';
	import { createCounter } from "$lib/stores";
	import { onMount } from "svelte";

  let showAddFieldPopover = false;
  let showAddCounterPopover = false;
  let showModal = false;

  let tableEl: HTMLDivElement;

  onMount(() => {
    function rotateScrolling(event: WheelEvent) {
      event.preventDefault();
      tableEl.scrollLeft += (event.deltaY + event.deltaX);
    }
    tableEl.addEventListener('wheel', rotateScrolling);

    return () => {
      tableEl?.removeEventListener('wheel', rotateScrolling);
    }
  })

  async function addField(event: CustomEvent<{ name: string; description: string; unit: string; }>) {
    if (!$currentHousingId) return;
    await createField({
      name: event.detail.name,
      housingId: $currentHousingId,
      description: event.detail.description,
      unit: event.detail.unit,
    });
	}
  async function addCounter(event: CustomEvent<{ name: string; description: string; unit: string; }>) {
    if (!$currentHousingId) return;
    await createCounter({
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
  function toggleAddCounterPopover() {
    showAddCounterPopover = !showAddCounterPopover;
    showAddCounterPopover = !showAddCounterPopover;
  }

  $: {
    const fieldsCount = $fields._?.size ? $fields._?.size + 1 : 0;
    const countersCount = $counters._?.size ? $counters._?.size + 1 : 0;
    const rowsCount = fieldsCount && countersCount ? fieldsCount + countersCount + 1 : (fieldsCount || countersCount);
    document.documentElement.style.setProperty('--table-rows', rowsCount.toString());
  }
  $: document.documentElement.style.setProperty('--table-columns', (($currentHousing?.filledMonths ?? []).length).toString());
</script>

<div>
  <div class="table" bind:this={tableEl}>
    {#if $fields._?.size || $counters._?.size}
      {#each $tableData as { name, fieldId, month, amount, price, counterId, value, counterValue, unit, type, description }}
        <Cell
          {name}
          {fieldId}
          {month}
          {amount}
          {price}
          {counterId}
          {value}
          {counterValue}
          {unit}
          {type}
          {description}
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
  <div>
    <Button ghost color="primary" on:click={toggleAddCounterPopover}>
      Add Counter
    </Button>
    <Popover bind:show={showAddCounterPopover}>
      <PopoverBody>
        <AddCounterForm on:addCounter={addCounter} on:closeAddCounterPopover={toggleAddCounterPopover} />
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
    grid-template-columns: 13rem repeat(var(--table-columns), minmax(11rem, 1fr));
    grid-template-rows: repeat(var(--table-rows), 1fr);
    overflow-x: auto;
    position: relative;
  }
</style>
