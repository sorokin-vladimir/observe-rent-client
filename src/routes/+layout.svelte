<script lang="ts">
  import tabler from 'yesvelte/css/tabler.min.css?url'
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { isValidPath } from '$lib/utils';

  let isAuth = true;

  async function redirect() {
    if (isAuth) {
      const { pathname } = $page.url;
      if (isValidPath(pathname)) {
        await goto(pathname);
        return;
      }
      await goto('/');
    } else {
      await goto('/login');
    }
  }


  onMount(async () => {
    await redirect();
  });


</script>

<svelte:head>
  <link rel='stylesheet' href={tabler}/>
</svelte:head>

<div class="app-wrapper">
  <slot />
  <button class="button" on:click={() => {
    // TODO: remove button and wrapper
    isAuth = !isAuth;
    redirect();
  }}>{#if isAuth}Logout{:else}Login{/if}</button>
</div>

<style lang="scss">
  :root {
    font-size: 16px;
  }
  .app-wrapper {
    position: relative;
    .button {
      position: fixed;
      bottom: 0;
      right: 0;
    }
  }
</style>
