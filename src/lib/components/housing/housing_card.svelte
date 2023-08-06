<script lang="ts">
	import type { Housing } from "$lib/types";
	import { Card, CardBody } from "yesvelte";

  export let id: Housing["id"];
  export let name: Housing["name"];
  export let area: Housing["area"];
  export let livingArea: Housing["livingArea"];
</script>

<div class="card-wrapper">
  <Card on:click={() => console.log(`click on H ${id}`)}>
    <CardBody>
      <h3>{name}</h3>
      <p>Area: {area}</p>
      <p>Living area: {livingArea}</p>
    </CardBody>
  </Card>
</div>

<style lang="scss">
  .card-wrapper {
    width: 12rem;
    cursor: pointer;
    box-shadow: 0px 7px 26px -19px rgba(0,0,0,0);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
      transform: translateY(-0.1rem);
      box-shadow: 0px 7px 26px -19px rgba(0,0,0,0.75);
    }
  }
</style>
