<script lang="ts">
	import { FIELD_NAME_MAX_LENGTH } from "$lib/constants";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { Button, Input, Label } from "yesvelte";

  const dispatch = createEventDispatcher();

  let fieldName = "";

  onDestroy(() => {
    fieldName = "";
  });

  function addField() {
    dispatch("addfield", {
        name: fieldName,
    });
    fieldName = "";
  }
</script>

<form>
  <div class="input-block">
    <Label for="name">Name</Label>
    <Input maxlength={FIELD_NAME_MAX_LENGTH} type="text" placeholder="Name" bind:value={fieldName} />
  </div>
  <div class="button-wrapper">
    <Button color="primary" type="submit" on:click={addField} disabled={!fieldName.length}>Add</Button>
  </div>
</form>

<style lang="scss">
  .input-block {
    margin-bottom: 1rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
