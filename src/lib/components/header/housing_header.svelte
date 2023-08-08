<script lang="ts">
	import { Avatar, Breadcrumb, BreadcrumbItem, Tooltip } from "yesvelte";
  import { currentHousing } from '$lib/stores';

</script>

<div class="wrapper">
  <Avatar shape="circle" on:click={() => console.log('click on Avatar')}>UN</Avatar>
  <Breadcrumb separator="dots">
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem active>
      <div class="active-item-wrapper">
        <span class="text-wrapper" id={`housing_page_title_${$currentHousing.id}`}>
          {$currentHousing.name || 'Housing'}
        </span>
        {#if ($currentHousing.name || '').length > 20}
          <Tooltip  text={$currentHousing.name} target={`#housing_page_title_${$currentHousing.id}`} />
        {/if}
      </div>
    </BreadcrumbItem>
  </Breadcrumb>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    width: 100%;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
    position: sticky;
    top: 0;
    background-color: var(--y-body-bg);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 1rem;
      width: calc(100% - 2rem);
      height: 1px;
      background-color: #e6e6e6;
    }

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
  }
</style>
