<script lang="ts">
	import type { Housing } from '$lib/types';
  import HousingCard from '../housing/housing_card.svelte';

  const housings: Housing[] = [{
    id: '1-abc',
    name: 'Housing 1',
    area: 56,
    livingArea: 45,
  }, {
    id: '2-abc',
    name: 'Housing 2',
    area: 73,
    livingArea: 67,
  }, {
    id: '3-abc',
    name: 'Housing 3',
    area: 45,
    livingArea: 34,
  }]
</script>


<div class="list-wrapper">
  {#each housings as housing}
    <HousingCard {...housing} />
  {/each}
</div>

<style lang="scss">
  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 1rem;
    gap: 1rem;
  }
</style>
