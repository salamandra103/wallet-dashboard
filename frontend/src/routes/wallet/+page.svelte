<script lang="ts">
  import { createProvider, initProvider } from '../../utils/wallet';
  export let data;

  function a() {
    createProvider();
  }

  const { wallet } = data;
</script>

<section class="wallet">
  Wallet page
  {#if wallet}
    wallet
  {:else}
    <button class="wallet__connect-btn" on:click={a}>Connect wallet</button>
  {/if}
</section>

<style lang="scss">
  .wallet {
    position: relative;
    &__connect-btn {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--bg-200);
      border: none;
      padding: 15px 35px;
      border-radius: 5px;
      cursor: pointer;
      color: var(--text-200);
      border: 1px solid var(--primary-200);
      letter-spacing: 1px;
      &:hover {
        background-color: var(--primary-100);
        color: var(--text-200);
      }
    }
  }
</style>
