<script>
	import { Table, TableBody, TableCell, TableHead, TableRow } from "yesvelte";

  const data = [
    ['#name', 'title', 'email', 'email1', 'email2', 'role &'],
    ['#Paweł Kuna', 'UI Designer, Training', 'paweluna@howstuffworks.com', 'paweluna@howstuffworks.com', 'paweluna@howstuffworks.com', 'user &'],
    ['#Jeffie Lewzey', 'Chemical Engineer, Support', 'mhulme2@domainmarket.com', 'mhulme2@domainmarket.com', 'mhulme2@domainmarket.com', 'admin &'],
    ['#Mallory Hulme', 'Geologist IV, Support', 'dslane3@epa.gov', 'dslane3@epa.gov', 'dslane3@epa.gov', 'owner &'],
    ['#Dunn Slane', 'Research Nurse, Sales', 'elevet4@senate.gov', 'elevet4@senate.gov', 'elevet4@senate.gov', 'user &'],
  ];
  document.documentElement.style.setProperty('--table-columns', data[0].length.toString());
  document.documentElement.style.setProperty('--table-rows', data.length.toString());
</script>

<div>
  Just test table
  <div class="table">
    {#each data as row}
        {#each row as cell}
          <div class={`cell ${cell.startsWith('#') ? 'first-col' : ''} ${cell.endsWith('&') ? 'last-col' : ''}`}>{cell}</div>
        {/each}
    {/each}
    <div> add </div>
  </div>
</div>

<style lang="scss">
  .table {
    display: grid;
    grid-template-columns: repeat(var(--table-columns), 200px);
    grid-template-rows: repeat(calc(var(--table-rows) + 1), 1fr);
    grid-gap: 1rem;
    overflow-x: auto;
    position: relative;
  }
  .cell {
    background-color: azure;
  }
  .first-col {
    position: sticky;
    left: 0;
  }
  .last-col {
    position: sticky;
    right: 0;
  }
</style>
