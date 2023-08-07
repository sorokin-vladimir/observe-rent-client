<script lang="ts">
	import { HOUSING_NAME_MAX_LENGTH } from "$lib/constants";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { Button, Input, Label } from "yesvelte";

  const dispatch = createEventDispatcher();

  let housingName = "";

  onDestroy(() => {
    housingName = "";
  });

  function addHousing() {
    dispatch("addhousing", {
        name: housingName,
    });
    housingName = "";
  }
</script>

<form>
  <div class="input-block">
    <Label for="name">Name</Label>
    <Input maxlength={HOUSING_NAME_MAX_LENGTH} type="text" placeholder="Name" bind:value={housingName} />
  </div>
  <div class="button-wrapper">
    <Button color="primary" type="submit" on:click={addHousing}>Add</Button>
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
