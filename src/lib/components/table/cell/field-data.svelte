<script lang="ts">
  import { currentHousing } from '$lib/stores';

  export let amount: number | undefined;
  export let price: number | undefined;
  export let unit: string | undefined;

  $: currency = $currentHousing?.currency ?? 'EUR';

  $: amountToShow = amount ?? 0;
  $: priceToShow = price ?? 0;
  let unitToShow = '';
  let currencyToShow = '';

  $: {
    if (typeof unit === 'string' && unit.includes('^')) {
      const splitedUnit = unit.split('^');
      unitToShow = `${splitedUnit[0]}<sup>${splitedUnit[1]}</sup>`;
    } else {
      unitToShow = unit ?? '';
    }
  }
  // TODO: change to Intl.NumberFormat
  $: {
    switch (currency) {
      case 'USD':
        currencyToShow = '$';
        break;
      case 'EUR':
        currencyToShow = '€';
        break;
      default:
        currencyToShow = currency ?? '';
    }
  }
</script>

<div class="field-data-cell">
  <span class="number">{amountToShow}</span>
  <span class="unit">{@html unitToShow}</span>
  &#x2022;
  <span>{currencyToShow}</span>
  <span class="number">{priceToShow}</span>
  =
  <span>{currencyToShow}</span>
  <span class="number">{amountToShow * priceToShow}</span>
</div>

<style lang="scss">
  .field-data-cell {
    & .number {
      font-size: 1.1rem;
    }
    & .unit {
      font-style: italic;
    }
  }
</style>
