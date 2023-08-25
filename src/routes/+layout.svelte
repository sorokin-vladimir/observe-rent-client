<script lang="ts">
  import tabler from 'yesvelte/css/tabler.min.css?url'
  import { onMount } from 'svelte';
  import type { Subscription } from 'rxjs';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { isValidPath } from '$lib/utils';
	import { ui, user } from '$lib/stores';
	import { Spinner } from 'yesvelte';

  let isAuth = true;

  async function redirect() {
    if (isAuth) {
      /** Set user mock */
      user.set({
        id: 'YKYo1qj9pHaJAnKgRumAk70n',
        name: 'John Doe',
        pwd: 'myPassword',
      })

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

<div class="app">
  <div class="app-wrapper">
    {#if $ui.isFullscreenLoading}
      <div class="spinner-wrapper">
        <Spinner size="lg" color="primary" />
      </div>
    {:else}
      <slot />
    {/if}
    <button class="button" on:click={() => {
      // TODO: remove button
      isAuth = !isAuth;
      redirect();
    }}>{#if isAuth}Logout{:else}Login{/if}</button>
  </div>
</div>

<style lang="scss">
  :root {
    font-size: 16px;
  }

  .app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 57rem;
    .button {
      position: fixed;
      bottom: 0;
      right: 0;
    }
    .spinner-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
