<script lang="ts">
	import { Button, Icon } from "yesvelte";

  export let timestamp: number;
</script>

<div class="hader-cell">
  <div class="text">
    <slot />
  </div>
  {#if timestamp}
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
  .hader-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &:hover {
      & .buttons {
        opacity: 1;
      }
    }

    & .text {
    font-weight: bold;
    }

    & .buttons {
      opacity: 0;
      transition: opacity 0.15s ease-in-out;
    }
  }
</style>
