<script>
  import { Card, CardBody } from 'yesvelte'

</script>

<div class="card-wrap">
  <Card>
    <CardBody>
      <slot />
    </CardBody>
  </Card>
</div>

<style lang="scss">
  .card-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
