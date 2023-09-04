<script lang="ts">
  import { fields, counters } from "$lib/stores";
	import { addMonthlyData } from "$lib/stores/field_methods";
	import { getTimestampForMonthlyData, timestampToReadableDate } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
	import { Button, DatePicker, Input, Label, Modal, ModalBody, ModalFooter } from "yesvelte";

  export let show: boolean;
  let date = new Date();
  let data: Record<string, string> = {};
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
    const dataToSave: {fieldId: string; amount?: number; price?: number}[] = [];
    const tempData: Record<string, Record<string, number | undefined>> = {};
    Object.keys(data).forEach((key) => {
      const [fieldId, type] = key.split('_');
      if (!tempData[fieldId]) tempData[fieldId] = {};
      tempData[fieldId][type] = parseFloat(data[key]);
    });
    Object.keys(tempData).forEach((key) => {
      dataToSave.push({ fieldId: key, amount: tempData[key].amount, price: tempData[key].price });
    });

    const result = await addMonthlyData(getTimestampForMonthlyData(date), dataToSave);
    // TODO: show error
    if (!result) return;
    onClose();
    clearData();
  }

  $: document.documentElement.style.setProperty('--add-monthly-data-modal-rows', (($fields._?.size ?? 0) + ($counters._?.size ?? 0)).toString());
  // TODO: вынести инпуты в отдельные компоненты с валидацией
</script>

<Modal scrollable title="Add new monthly data" bind:show placement="center">
	<ModalBody>
		<div class="inputs-wrap">
      <Label for="date">Date</Label>
      <DatePicker id="date" bind:value={date} formatText={formatDate} />
      {#each ($fields._ || []) as field (field[0])}
      <h3 class="field-name">{field[1].name}</h3>
       <span />
        <Label for={field[0] + '_amount'}>Amount</Label>
        <Input type="number" id={field[0] + '_amount'} bind:value={data[field[0] + '_amount']} />
        <Label for={field[0] + '_Price'}>Price</Label>
        <Input type="number" id={field[0] + '_price'} bind:value={data[field[0] + '_price']} />
      {/each}

      {#each ($counters._ || []) as counter (counter[0])}
      <h3 class="field-name">{counter[1].name}</h3>
       <span />
        <Label for={counter[0] + '_amount'}>Value</Label>
        <Input type="number" id={counter[0] + '_value'} bind:value={data[counter[0] + '_value']} />
      {/each}
    </div>
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
