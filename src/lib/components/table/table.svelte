<script lang="ts">
	import { FIELD_NAME_MAX_LENGTH } from "$lib/constants";
	import { Button, Popover, PopoverBody } from "yesvelte";
  import AddFieldForm from "./add_field_form.svelte";
	import { createField } from "$lib/stores/field_methods";
	import { currentHousing, fields } from "$lib/stores";

  async function addField(event: CustomEvent<{ name: string; }>) {
    await createField({ name: event.detail.name, housingId: $currentHousing.id });
	}

  document.documentElement.style.setProperty('--table-columns', ($fields._?.size ?? 0).toString());
  // document.documentElement.style.setProperty('--table-rows', data.length.toString());
  document.documentElement.style.setProperty('--table-rows', '1');
</script>

<div>
  <div class="table">
    {#if $fields._?.size}
    <div class="cell first-col"></div>
      {#each $fields._ as field}
        <div class="cell">{field[1].name}</div>
      {/each}
    {:else}
      <div class="cell">No fields</div>
    {/if}
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
  </div>
</div>

<style lang="scss">
  .table {
    display: grid;
    grid-template-columns: repeat(var(--table-columns), 200px);
    grid-template-rows: repeat(calc(var(--table-rows) + 1), 1fr);
    grid-gap: 1rem;
    overflow-x: auto;
    position: relative;
  }
  .cell {
    background-color: azure;
  }
  .first-col {
    position: sticky;
    left: 0;
  }
  .last-col {
    position: sticky;
    right: 0;
  }
</style>
