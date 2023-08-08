<script lang="ts">
  import HousingCard from '../housing_card/housing_card.svelte';
  import { housings } from '$lib/stores';
</script>

<div class="list-wrapper">
  {#if $housings.data.length === 0}
    <p>No housings</p>
  {/if}
  {#each $housings.data as housing}
    <HousingCard id={housing.id} name={housing.name} area={housing.area} livingArea={housing.livingArea} />
  {/each}
</div>

<style lang="scss">
  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 2rem;
    gap: 1rem;
  }
</style>
