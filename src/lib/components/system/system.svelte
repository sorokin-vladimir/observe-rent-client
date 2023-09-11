<script lang="ts">
	import { setNotificationsContext } from "$lib/stores";
	import { onMount } from "svelte";
	import { getNotificationsContext } from "svelte-notifications";

  const notificationsContext = getNotificationsContext();
  onMount(() => {
    setNotificationsContext(notificationsContext);
  });
</script>
