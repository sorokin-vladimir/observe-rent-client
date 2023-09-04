<script lang="ts">
	import { FIELD_NAME_MAX_LENGTH } from "$lib/constants";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { Button, Input, Label } from "yesvelte";

  const dispatch = createEventDispatcher();

  let counterName = "";
  let description = "";
  let unit = "";

  function resetFields() {
    counterName = "";
    description = "";
    unit = "";
  }

  onDestroy(() => {
    resetFields();
  });

  function addField() {
    dispatch("addCounter", {
        name: counterName,
        description,
        unit,
    });
    resetFields();
  }

  function closePopover() {
    dispatch("closeAddCounterPopover");
    resetFields();
  }
</script>

<form>
  <div class="input-block">
    <Label for="name">Name</Label>
    <Input maxlength={FIELD_NAME_MAX_LENGTH} type="text" placeholder="Name" bind:value={counterName} />
    <Label for="name">Description</Label>
    <Input maxlength={FIELD_NAME_MAX_LENGTH * 5} type="text" placeholder="Description" bind:value={description} />
    <Label for="name">Unit</Label>
    <Input maxlength={20} type="text" placeholder="m^2" bind:value={unit} />
  </div>
  <div class="button-wrapper">
    <Button color="ghost" type="button" on:click={closePopover}>Close</Button>
    <Button color="primary" type="submit" on:click={addField} disabled={!counterName.length}>Add</Button>
  </div>
</form>

<style lang="scss">
  .input-block {
    margin-bottom: 1rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>
