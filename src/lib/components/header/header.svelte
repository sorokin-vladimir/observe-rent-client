<header class="header">
  <div class="header-start-block">
    <slot name="avatar" />
    <slot name="breadcrumbs" />
  </div>
  <slot name="action" />
</header>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
    position: sticky;
    top: 0;
    background-color: var(--y-body-bg);
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 1rem;
      width: calc(100% - 2rem);
      height: 1px;
      background-color: #e6e6e6;
    }
  }
  .header-start-block {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
  }
</style>
