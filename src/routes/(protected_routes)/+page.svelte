<script lang="ts">
  import { HousingsList, RootHeader } from '$lib/components';
  import { currentHousing } from '$lib/stores';
	import { onMount } from 'svelte';

  onMount(() => currentHousing.set({}));
</script>

<div>
  <RootHeader />
  <HousingsList />
</div>
