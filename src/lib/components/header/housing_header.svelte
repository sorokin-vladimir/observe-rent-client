<script lang="ts">
	import { Avatar, Breadcrumb, BreadcrumbItem, Tooltip } from "yesvelte";
  import { currentHousing } from '$lib/stores';
  import Header from './header.svelte';

</script>

<Header>
  <Avatar slot="avatar" shape="circle" on:click={() => console.log('click on Avatar')}>UN</Avatar>
  <Breadcrumb slot="breadcrumbs" separator="dots">
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem active>
      <div class="active-item-wrapper">
        <span class="text-wrapper" id={`housing_page_title_${$currentHousing?.id}`}>
          {$currentHousing?.name || 'Housing'}
        </span>
        {#if ($currentHousing?.name || '').length > 20}
          <Tooltip  text={$currentHousing?.name} target={`#housing_page_title_${$currentHousing?.id}`} />
        {/if}
      </div>
    </BreadcrumbItem>
  </Breadcrumb>
</Header>

<style lang="scss">
  .active-item-wrapper {
    display: inline-block;
    position: relative;
  }

  .text-wrapper {
    display: inline-block;
    max-width: 10rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
