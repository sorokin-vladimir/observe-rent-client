<script lang="ts">
  import { currentHousing } from '$lib/stores';

  $: currency = $currentHousing?.currency ?? 'EUR';
  let currencyToShow = '';

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

<div class="common-data-cell">
  <span>{currencyToShow}</span>
  <span class="number"><slot /></span>
</div>

<style lang="scss">
  .common-data-cell {
    & .number {
      font-size: 1.1rem;
    }
  }
</style>
