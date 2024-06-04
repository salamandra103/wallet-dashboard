<script>
  import { setContext } from 'svelte';
  import 'normalize.css';
  import '../styles.css';
  import Sidebar from 'components/Sidebar.svelte';

  export let data;
  setContext('wallet', data.wallet);
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
