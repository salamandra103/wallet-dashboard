<script lang="ts">
  import Icon from 'components/Icon.svelte';
  import DoneIcon from '@material-design-icons/svg/outlined/done.svg?raw';

  import { providers, currentProvider } from 'store/wallet';
  import { connectBrowserProvider } from 'utils/wallet';
  import type { EIP6963ProviderDetail } from 'interfaces/EIP6963';

  import LoaderIcon from '$lib/icons/loader.svg?raw';

  export let isLoading: boolean = false;
  export let isAuth: boolean = false;

  async function _connectBrowserProvider(providerDetail: EIP6963ProviderDetail) {
    isLoading = true;
    await connectBrowserProvider(providerDetail);
    currentProvider.set(providerDetail);
    isLoading = false;
    isAuth = true;
  }
</script>

<section class="wallet">
  {#if $providers.length}
    <div class="wallet__connect-buttons">
      {#each $providers as item}
        <button class="wallet__connect-button" on:click={() => _connectBrowserProvider(item)}>
          {#if !isLoading}
            {#if isAuth}
              <Icon className="wallet__connect-button-icon" icon={DoneIcon} color="green" />
            {/if}
            <img class="wallet__connect-button-icon" src={item.info.icon} alt={item.info.name} />
            <span class="wallet__connect-button-title"> {item.info.name}</span>
          {:else}
            <Icon icon={LoaderIcon} width="30" height="30" color="#ffffff" />
          {/if}
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
      min-width: 210px;
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
