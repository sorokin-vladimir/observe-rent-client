<script lang="ts">
  import { Button, Icon, Avatar, Popover, PopoverBody } from 'yesvelte';
  import AddHousingForm from './add_housing_form.svelte';
	import { createHousing } from '$lib/stores/housing_methods';
	import { goto } from '$app/navigation';

  async function addHousing(event: CustomEvent<any>) {
    const h = await createHousing({ name: event.detail.name });
    // await goto(`/h/${h.id}`);
	}
</script>

<div class="wrapper">
  <Avatar shape="circle" on:click={() => console.log('click on Avatar')}>UN</Avatar>
  <Button color="primary">
    <Icon name="plus" />
    Add housing
  </Button>
  <Popover trigger="click">
    <PopoverBody>
      <AddHousingForm on:addhousing={addHousing} />
    </PopoverBody>
  </Popover>
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
