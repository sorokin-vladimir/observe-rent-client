<script lang="ts">
	import type { TableDataCell } from "$lib/types";

  export let description: TableDataCell['description'];

  $: className = `name ${description ? 'with-description' : ''}`;
</script>

<div class="name-cell">
  <div class={className}>
    <slot />
  </div>
  {#if description}
    <div class="description">
      {description}
    </div>
  {/if}
</div>

<style lang="scss">
  .name-cell {
    margin: 0;
  }
  .name {
    font-weight: bold;
    &.with-description {
      margin-top: -0.5rem;
    }
  }
  .description {
    font-size: 0.8rem;
  }
</style>
