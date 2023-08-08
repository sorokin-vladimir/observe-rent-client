<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { currentHousing } from '$lib/stores';
	import { deleteHousing, getHousingById } from '$lib/stores/housing_methods';
	import { getLocalTimeFromUTCTimestamp } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Button } from 'yesvelte';
  import { HousingDataFields } from '$lib/components';

  onMount(async () => {
    const h = await getHousingById($page.params.housingId);
    if (h) currentHousing.set(h);
  })

  async function handleDelete() {
    const isDeleted = await deleteHousing($page.params.housingId)
    if (isDeleted) {
      await goto('/');
    }
  }

</script>

<div class="wrapper">
  <HousingDataFields />
  <p>
    housing page. id: {$currentHousing.id}
  </p>
  <p>
    name: {$currentHousing.name}
  </p>
  <p>
    createdAt: {getLocalTimeFromUTCTimestamp($currentHousing.createdAt).toLocaleString()}
  </p>
  <p>
    created by: {$currentHousing.createdBy}
  </p>

  <Button color="primary" on:click={handleDelete}>Delete {$currentHousing.name}</Button>
</div>

<style lang="scss">
  .wrapper {
    margin: 0 2rem;
  }
</style>
