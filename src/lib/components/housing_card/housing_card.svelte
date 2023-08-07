<script lang="ts">
	import { goto } from "$app/navigation";
	import type { HousingDocType } from "$lib/types";
	import { Card, CardBody } from "yesvelte";

  export let id: HousingDocType["id"];
  export let name: HousingDocType["name"];
  export let area: HousingDocType["area"];
  export let livingArea: HousingDocType["livingArea"];
</script>

<div class="card-wrapper">
  <Card on:click={() => goto(`/h/${id}`)}>
    <CardBody>
      <h3>{name}</h3>
      <p>Area: {area || '__'}</p>
      <p>Living area: {livingArea || '__'}</p>
    </CardBody>
  </Card>
</div>

<style lang="scss">
  .card-wrapper {
    width: 12rem;
    cursor: pointer;
    box-shadow: 0px 7px 26px -19px rgba(0,0,0,0);
    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover {
      transform: translateY(-0.1rem);
      box-shadow: 0px 7px 26px -19px rgba(0,0,0,0.75);
    }
  }
</style>
