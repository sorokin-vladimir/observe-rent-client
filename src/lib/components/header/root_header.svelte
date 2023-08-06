<script lang="ts">
  import { Button, Icon, Avatar } from 'yesvelte';
</script>

<div class="wrapper">
  <Avatar shape="circle" on:click={() => console.log('click on Avatar')}>UN</Avatar>
  <Button color="primary">
    <Icon name="plus" />
    Add housing
  </Button>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    padding: 1rem;
    margin-bottom: 2rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: calc(100vw - 2rem);
      height: 1px;
      background-color: #e6e6e6;
    }
  }
</style>
