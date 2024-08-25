<script lang="ts">
  import Icon from 'components/Icon.svelte';
  import DoneIcon from '@material-design-icons/svg/outlined/done.svg';

  import LoaderIcon from '$lib/icons/loader.svg';
  import LoaderIcon2 from '$lib/icons/loader.svg?raw';

  import { wallets, connectWallet } from 'store/wallet';
  import type { Wallet} from 'interfaces/Wallet';

  export let isLoading: boolean = false;


  async function _connectWallet(wallet: Wallet) {
    isLoading = true;
    let address = await connectWallet(wallet.provider);
    isLoading = false;
  }
</script>

<section class="wallet">
  {#if $wallets.length}
    <div class="wallet__connect-buttons">
      {#each $wallets as item}
        <button class="wallet__connect-button" on:click={() => _connectWallet(item)} disabled={item.meta.isProgress}>
          {#if !isLoading}
            {#if item.meta.isActive}
               <DoneIcon fill="green"  className="wallet__connect-button-icon wallet__connect-button-icon--check"/>
            {/if}
            <img class="wallet__connect-button-icon" src={item.meta.icon} alt={item.meta.name} />
            <span class="wallet__connect-button-title"> {item.meta.name}</span>
          {:else}
             <Icon icon={LoaderIcon2} width="30" height="30" color="#ffffff" />
            {/if}
            <Icon icon={LoaderIcon2} width="30" height="30" color="#ffffff" />
            <LoaderIcon fill="#ffffff" stroke="#ffffff" width="30" height="30"/>
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
      position: relative;
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

      // &:after {
      //   content: '';
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   right: 0;
      //   bottom: 0;
      //   background-color: var(--bg-300);
      //   opacity: 0.6;
      //   cursor: default;
      //   visibility: hidden;
      //   z-index: 1;
      // }

      &:disabled {
        cursor: default;
        background-color: var(--bg-200);
        &:after {
          visibility: visible;
        }
      }

      &-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        
        &--check {
          margin-right: 10px;
        }
      }

      &-title {
        color: var(--text-200);
        letter-spacing: 1px;
        font-size: 16px;
      }
    }
  }
</style>
