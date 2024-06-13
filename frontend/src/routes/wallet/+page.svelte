<script lang="ts">
  import { providers, currentProvider } from 'store/wallet';
  import { connectBrowserProvider } from 'utils/wallet';
  import type { EIP6963ProviderDetail } from 'interfaces/EIP6963';

  function _connectBrowserProvider(providerDetail: EIP6963ProviderDetail) {
    connectBrowserProvider(providerDetail);
    currentProvider.set(providerDetail);
  }
</script>

<section class="wallet">
  Wallet page

  {#if $currentProvider}
    {$currentProvider.info.name}
    {$currentProvider.info.icon}
  {/if}

  {#if $providers.length}
    <div class="wallet__connect-buttons">
      {#each $providers as item}
        <button class="wallet__connect-button" on:click={() => _connectBrowserProvider(item)}>
          <img class="wallet__connect-button-icon" src={item.info.icon} alt={item.info.name} />
          <span class="wallet__connect-button-title"> {item.info.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</section>

<style lang="scss">
  .wallet {
    position: relative;
    &__connect-buttons {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: column;
      gap: 10px 0;
    }
    &__connect-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-200);
      border: none;
      padding: 15px 35px;
      border-radius: 5px;
      cursor: pointer;

      border: 1px solid var(--primary-200);
      &:hover {
        background-color: var(--primary-100);
        &-title {
          color: var(--text-200);
        }
      }

      &-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      &-title {
        color: var(--text-200);
        letter-spacing: 1px;
        font-size: 16px;
      }
    }
  }
</style>
