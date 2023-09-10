<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
	import { Button, DatePicker, Input, Label, Modal, ModalBody, ModalFooter } from "yesvelte";
  import { fields, counters } from "$lib/stores";
	import { addMonthlyDataField } from "$lib/stores/field_methods";
	import { getTimestampForMonthlyData } from "$lib/utils";
	import FieldBlock from "./field_block.svelte";
  import CounterBlock from "./counter_block.svelte";
	import { generateDataObject } from "./utils";
	import { addMonthlyDataCounter } from "$lib/stores/counter_methods";

  export let show: boolean;
  let date = new Date();
  let data: Record<string, Record<string, string>> = {};

  $: {
    const fieldsCount = $fields._?.size ?? 0;
    const countersCount = $counters._?.size ?? 0;
    const dataLen = Object.keys(data).length;

    if (dataLen === 0 && (fieldsCount || countersCount)) {
      // Initial generate
      data = generateDataObject($fields._, $counters._);
    } else if (dataLen && ((fieldsCount + countersCount) !== dataLen)) {
      // Added fields or counters
      data = generateDataObject($fields._, $counters._);
    }
  }

  const dispatch = createEventDispatcher();

  function clearData() {
    data = {};
    date = new Date();
  }

  function onClose() {
    dispatch('closeAddMonthlyDataModal');
    clearData();
  }

  function formatDate(date: Date | string) {
    return (new Date(date)).toLocaleDateString('en-UK', {month: 'long', year: 'numeric'});
  }

  async function saveMonthlyData() {
    const fieldDataToSave: {fieldId: string; amount?: number; price?: number}[] = [];
    const counterDataToSave: {counterId: string; value?: number; }[] = [];

    if ($fields._?.size) {
      for (const [fieldId] of $fields._) {
        const amount = parseFloat(data[fieldId]['amount']);
        const price = parseFloat(data[fieldId]['price']);
        if (amount || price) {
          fieldDataToSave.push({ fieldId, amount, price });
        }
      }
    }

    if ($counters._?.size) {
      for (const [counterId] of $counters._) {
        const value = parseFloat(data[counterId]['value']);
        if (value) {
          counterDataToSave.push({ counterId, value });
        }
      }
    }

    if (Object.keys(fieldDataToSave).length) {
      const resultFields = await addMonthlyDataField(getTimestampForMonthlyData(date), fieldDataToSave);
      // // TODO: show error
      if (!resultFields) console.error(`Error saving fields`);
    }

    if (Object.keys(counterDataToSave).length) {
      const resultCounters = await addMonthlyDataCounter(getTimestampForMonthlyData(date), counterDataToSave);
      if (!resultCounters) console.error(`Error saving counters`);
    }

    onClose();
    clearData();
  }

  $: document.documentElement.style.setProperty('--add-monthly-data-modal-rows', (($fields._?.size ?? 0) + ($counters._?.size ?? 0)).toString());
</script>

<Modal scrollable title="Add new monthly data" bind:show placement="center">
	<ModalBody>
    {#if Object.keys(data).length === 0}
      <p>No fields or counters to add</p>
    {:else}
      <div class="inputs-wrap">
        <Label for="date">Date</Label>
        <DatePicker id="date" bind:value={date} formatText={formatDate} />

        {#each ($fields._ || []) as field (field[0])}
          <FieldBlock
            field={field[1]}
            bind:amount={data[field[0]]['amount']}
            bind:price={data[field[0]].price} />
        {/each}

        {#each ($counters._ || []) as counter (counter[0])}
          <CounterBlock
            counter={counter[1]}
            bind:value={data[counter[0]]['value']} />
        {/each}
      </div>
    {/if}
	</ModalBody>
	<ModalFooter>
		<Button me="auto" on:click={onClose}>Close</Button>
		<Button color="primary" on:click={saveMonthlyData}>Save</Button>
	</ModalFooter>
</Modal>

<style lang="scss">
  .inputs-wrap {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: repeat(var(--add-monthly-data-modal-rows), 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 0.5rem;
    align-items: center;
    max-width: 24rem;
    margin: 0 auto;
  }
  .field-name {
    margin: 1rem 0 0 0;
  }
</style>
