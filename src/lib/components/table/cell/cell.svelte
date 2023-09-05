<script lang="ts">
	import type { TableDataCell } from "$lib/types";
	import { timestampToReadableDate } from "$lib/utils";
  import Name from './name.svelte';
  import Header from './header.svelte';
  import FieldData from './field-data.svelte';
  import CommonData from './common-data.svelte';

  export let name: TableDataCell['name'];
  export let description: TableDataCell['description'];
  export let fieldId: TableDataCell['fieldId'];
  export let counterId: TableDataCell['counterId'];
  export let month: TableDataCell['month'];
  export let amount: TableDataCell['amount'];
  export let price: TableDataCell['price'];
  export let counterValue: TableDataCell['counterValue'];
  export let value: TableDataCell['value'];
  export let unit: TableDataCell['unit'];
  export let type: TableDataCell['type'];

  $: className = `cell-wrapper ${type === 'first-col' ? 'first-col' : ''}`;
</script>

<div class={className}>
  {#if type === 'first-col'}
    <Name {description}>
      {name}
    </Name>
  {:else if type === 'header' && month}
    <Header>
      {timestampToReadableDate(month)}
    </Header>
  {:else if type === 'empty'}
    <!-- {''} -->
  {:else if type === 'data-field'}
    <FieldData {amount} {unit} {price} />
  {:else if type === 'data-counter'}
    {counterValue} {unit}
  {:else if type === 'data-common'}
    <CommonData>
      {value}
    </CommonData>
  {:else}
    ---
  {/if}
</div>

<style lang="scss">
  .cell-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid darkgray;
    background-color: var(--y-body-bg);
  }
  .first-col {
    position: sticky;
    left: 0;
    z-index: 1;
  }
</style>
