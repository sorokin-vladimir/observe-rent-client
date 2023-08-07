<script lang="ts">
  import tabler from 'yesvelte/css/tabler.min.css?url'
  import { onMount } from 'svelte';
  import type { Subscription } from 'rxjs';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { isValidPath } from '$lib/utils';
  import { getDB, db } from '$lib/db';
	import { updateHousings } from '$lib/stores';

  let isAuth = true;

  async function redirect() {
    let querySub: Subscription | undefined;
    if (isAuth) {
      /** Create (or get) DB */
      const _db = await getDB('test_name', 'myPassword');
      /** Subscribe to updates */
      const query = _db?.housings.find();
      querySub = query?.$.subscribe((results) => {
        updateHousings(results.map((result) => result.toJSON()))
      })
      /** Set the DB in a store to easy access */
      db.set(_db);

      const { pathname } = $page.url;
      if (isValidPath(pathname)) {
        await goto(pathname);
        return;
      }
      await goto('/');
    } else {
      /** Unsubscribe from updates */
      querySub?.unsubscribe()
      /** Destroy the DB */
      await $db?.destroy();
      /** Remove the DB from a store */
      db.set(null);
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
