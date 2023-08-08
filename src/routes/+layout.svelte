<script lang="ts">
  import tabler from 'yesvelte/css/tabler.min.css?url'
  import { onMount } from 'svelte';
  import type { Subscription } from 'rxjs';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { isValidPath } from '$lib/utils';
  import { getDB, db } from '$lib/db';
	import { updateHousings, user } from '$lib/stores';
	import { Spinner } from 'yesvelte';

  let isAuth = true;
  let isLoading = true;

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
      if (!_db) throw new Error('DB is not defined');
      db.set({ _: _db })

      /** Set user mock */
      user.set({
        id: 'YKYo1qj9pHaJAnKgRumAk70n',
        name: 'John Doe',
        pwd: 'myPassword',
      })

      isLoading = false;
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
      await $db?._.destroy();
      /** Remove the DB from a store */
      db.set({});

      /** Remove user mock */
      user.set({});

      isLoading = false;
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
    {#if isLoading}
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
