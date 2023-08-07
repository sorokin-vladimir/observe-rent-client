<script lang="ts">
	import { goto } from "$app/navigation";
	import { getHousingById } from "$lib/stores/housing_methods";
	import type { HousingDocType } from "$lib/types";
	import { Card, CardBody, Tooltip } from "yesvelte";

  export let id: HousingDocType["id"];
  export let name: HousingDocType["name"];
  export let area: HousingDocType["area"];
  export let livingArea: HousingDocType["livingArea"];

  async function handleCardClick() {
    await goto(`/h/${id}`);
  }
</script>

<div class="card-wrapper">
  <Card on:click={handleCardClick}>
    <CardBody>
      <h3 class="title" id={`housing_card_title_${id}`}>{name}</h3>
      <p>Area: {area || '__'}</p>
      <p>Living area: {livingArea || '__'}</p>
    </CardBody>
  </Card>
  {#if name.length > 10}
    <Tooltip  text={name} target={`#housing_card_title_${id}`} />
  {/if}
</div>

<style lang="scss">
  .card-wrapper {
    width: 12rem;
    cursor: pointer;
    position: relative;
    box-shadow: 0px 7px 26px -19px rgba(0,0,0,0);
    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover {
      transform: translateY(-0.1rem);
      box-shadow: 0px 7px 26px -19px rgba(0,0,0,0.75);
    }

    & .title {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
