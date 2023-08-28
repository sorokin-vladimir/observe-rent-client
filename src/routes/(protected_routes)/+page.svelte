<script lang="ts">
  import { HousingsList, RootHeader } from '$lib/components';
  import { currentHousingId } from '$lib/stores';
	import { onMount } from 'svelte';

  onMount(() => currentHousingId.set(null));
</script>

<div>
  <RootHeader />
  <HousingsList />
</div>
