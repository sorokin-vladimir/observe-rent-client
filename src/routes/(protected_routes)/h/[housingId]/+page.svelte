<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { currentHousingId } from '$lib/stores';
	import { deleteHousing } from '$lib/stores/housing_methods';
	import { onDestroy, onMount } from 'svelte';
	import { Button } from 'yesvelte';
  import { HousingDataFields, Table } from '$lib/components';

  onMount(async () => {
    if ($currentHousingId) return;
    currentHousingId.set($page.params.housingId);
  });
  onDestroy(() => {
    currentHousingId.set(null);
  });

  async function handleDelete() {
    // TODO: show confirmation dialog
    const isDeleted = await deleteHousing($page.params.housingId)
    if (isDeleted) {
      await goto('/');
    }
  }

</script>

<div class="wrapper">
  <HousingDataFields />

  <div class="delete-wrapper">
    <Button ghost color="danger" on:click={handleDelete}>Delete housing</Button>
  </div>

  <Table />
</div>

<style lang="scss">
  .wrapper {
    margin: 0 2rem;

    & .delete-wrapper {
      width: 24rem;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2rem;
    }
  }
</style>
