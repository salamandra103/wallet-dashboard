<script>
  import 'normalize.css';
  import '../styles.css';
  import Sidebar from 'components/Sidebar.svelte';
</script>

<div class="app">
  <Sidebar />
  <main class="wrapper">
    <slot />
  </main>
</div>

<style>
  .wrapper {
    margin-left: 71px;
    padding: 20px;
  }
</style>
