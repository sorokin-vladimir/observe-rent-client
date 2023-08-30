<script lang="ts">
	import { timestampToReadableDate } from "$lib/utils";

  export let name: string | undefined;
  export let fieldId: string | null;
  export let month: number | undefined;
  export let amount: number | undefined;
  export let price: number | undefined;
  export let unit: string | undefined;

  const className = `cell-wrapper ${name ? 'first-col' : ''}`;
  console.log(`month`, month);
</script>

<div class={className}>
  {#if name}
    {name}
  {:else if month && amount === undefined && price === undefined}
    {timestampToReadableDate(month)}
  {:else if amount !== undefined && price !== undefined}
    {amount} {unit || 'kg'} x {price}
  {:else}
    ---
  {/if}
</div>

<style lang="scss">
  .cell-wrapper {
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid darkgray;
    background-color: var(--y-body-bg);
  }
  .first-col {
    position: sticky;
    left: 0;
  }
</style>
