<script lang="ts">
	import type { CounterDocType, FieldDocType } from "$lib/types";
	import { Input, Label } from "yesvelte";

  export let counter: CounterDocType;
  export let value: number | string;

</script>

<h3 class="field-name">{counter.name}</h3>
<div />
<Label for={counter.id}>Value</Label>
<Input type="number" id={counter.id} bind:value />

<style lang="scss">
  .field-name {
    margin: 1rem 0 0 0;
  }
</style>
