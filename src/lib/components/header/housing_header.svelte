<script lang="ts">
	import { Avatar, Breadcrumb, BreadcrumbItem } from "yesvelte";

</script>

<div class="wrapper">
  <Avatar shape="circle" on:click={() => console.log('click on Avatar')}>UN</Avatar>
  <Breadcrumb separator="dots">
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem active>Housing</BreadcrumbItem>
  </Breadcrumb>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
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
