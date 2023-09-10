<script lang="ts">
	import type { FieldDocType } from "$lib/types";
	import { Input, Label } from "yesvelte";

  export let field: FieldDocType;
  export let amount: number | string;
  export let price: number | string;

</script>

<h3 class="field-name">{field.name}</h3>
<div />
<Label for={field.id + '_amount'}>Amount</Label>
<Input type="number" id={field.id + '_amount'} bind:value={amount} />
<Label for={field.id + '_Price'}>Price</Label>
<Input type="number" id={field.id + '_price'} bind:value={price} />

<style lang="scss">
  .field-name {
    margin: 1rem 0 0 0;
  }
</style>
