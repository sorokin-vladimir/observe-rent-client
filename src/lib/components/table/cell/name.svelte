<script lang="ts">
	import type { TableDataCell } from "$lib/types";
	import { Button, Icon } from "yesvelte";

  export let description: TableDataCell['description'];
  export let fieldId: TableDataCell['fieldId'];
  export let counterId: TableDataCell['counterId'];

</script>

<div class="name-cell">
  <div>
    <div class="name">
      <slot />
    </div>
    {#if description}
      <div class="description">
        {description}
      </div>
    {/if}
  </div>
  {#if fieldId || counterId}
    <div class="buttons">
      <Button size="sm" shape="pill" ghost color="primary">
        <Icon name="edit" />
      </Button>
      <Button size="sm" shape="pill" ghost color="danger">
        <Icon name="trash" />
      </Button>
    </div>
  {/if}
</div>

<style lang="scss">
  .name-cell {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &:hover {
      & .buttons {
        opacity: 1;
      }
    }

    & .name {
      font-weight: bold;
    }
    & .description {
      font-size: 0.8rem;
    }

    & .buttons {
      opacity: 0;
      transition: opacity 0.15s ease-in-out;
    }
  }
</style>
