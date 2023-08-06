<script>
  import { createEventDispatcher } from "svelte";
  import { Input, Label, Button, Spinner, Icon } from 'yesvelte'
	// import { isLoadingAuth } from "$lib/stores";

  const dispatch = createEventDispatcher();

  let username = '';
  let email = '';
  let password = '';

  function signup() {
      dispatch("signup", {
          username,
          email,
          password
      });
  }
</script>

<form>
  <div class="input-block">
    <Label for="email">Your email</Label>
    <Input type="email" id="email" bind:value={email} placeholder="email@example.com" required disabled={/* $isLoadingAuth */ false} />
  </div>
  <div class="input-block">
    <Label for="username">Your name</Label>
    <Input type="text" id="username" bind:value={username} placeholder="Ivan" required disabled={/* $isLoadingAuth */ false} />
  </div>
  <div class="input-block">
    <Label for="password">Your password</Label>
    <Input type="password" id="password" bind:value={password} required disabled={/* $isLoadingAuth */ false} />
  </div>
  <Button col="12" color="primary" type="submit" on:click={signup} disabled={/* $isLoadingAuth */ false}>
    {#if /* $isLoadingAuth */ false}
      <Spinner size="md" color="primary" />
    {:else}
      <Icon name="user-plus" />
    {/if}
    Sign Up
  </Button>
</form>

<style lang="scss">
  .input-block {
    margin-bottom: 1.5rem;
  }
</style>
