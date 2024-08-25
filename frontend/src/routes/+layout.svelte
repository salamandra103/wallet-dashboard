<script lang="ts">
  import 'normalize.css';
  import '../styles.css';
  import Sidebar from 'components/Sidebar.svelte';
  import { onMount } from 'svelte';
  // import { getFiatMap, getTokenMap } from 'api/coinmarketcap';

  onMount(async () => {
    // const fiat = await getFiatMap();
    // const tokens = await getTokenMap();
  });
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
