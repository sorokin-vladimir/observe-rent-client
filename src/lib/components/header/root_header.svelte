<script lang="ts">
  import { Button, Icon, Avatar, Popover, PopoverBody } from 'yesvelte';
  import AddHousingForm from './add_housing_form.svelte';
	import { createHousing } from '$lib/stores';
	import { goto } from '$app/navigation';
  import Header from './header.svelte';

  async function addHousing(event: CustomEvent<{ name: string; }>) {
    const h = await createHousing({ name: event.detail.name });
    if (!h) return;

    await goto(`/h/${h.id}`);
	}
</script>

<Header>
  <Avatar slot="avatar" shape="circle" on:click={() => console.log('click on Avatar')}>UN</Avatar>
  <div slot="action">
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
</Header>
