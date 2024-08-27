<script lang="ts">
  import cx from 'classnames';

  import DoneIcon from '@material-design-icons/svg/outlined/done.svg';
  import LoaderIcon from '$lib/icons/loader.svg';

  import { wallets, connectWallet } from 'store/wallet';
  import type { Wallet } from 'interfaces/Wallet';

  export let isLoading: boolean = false;

  async function _connectWallet(wallet: Wallet) {
    isLoading = true;
    let address = await connectWallet(wallet.baseProvider, wallet.provider);
    isLoading = false;
  }
</script>

<section class="wallet">
  {#if $wallets.length}
    <div class="wallet__connect-buttons">
      {#each $wallets as item}
        <button
          class={cx('wallet__connect-button', {
            'wallet__connect-button--progress': item.meta.isInProgress,
            'wallet__connect-button--active': item.meta.isActive
          })}
          on:click={() => _connectWallet(item)}
          disabled={item.meta.isDisabled}
        >
          <div class="wallet__connect-button-wrapper">
            {#if item.meta.isActive}
              <DoneIcon
                fill="green"
                className="wallet__connect-button-icon wallet__connect-button-icon--check"
              />
            {/if}
            <img class="wallet__connect-button-icon" src={item.meta.icon} alt={item.meta.name} />
            <span class="wallet__connect-button-title"> {item.meta.name}</span>
          </div>
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
      background-color: var(--bg-200);
      border: none;
      padding: 15px 35px;
      border-radius: 5px;
      min-width: 210px;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid var(--primary-200);

      &--progress {
        &:before {
          animation: loadingButtonAnimation 2500ms infinite ease-in-out;
        }
      }

      &:hover {
        background-color: var(--primary-100);
        &-title {
          color: var(--text-200);
        }
      }

      &:before,
      &:after {
        border-radius: 5px;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }

      &:after {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        transform: translate(1px, 1px);
        background-color: var(--bg-300);
        cursor: default;
        visibility: hidden;
        z-index: 2;
      }

      &:before {
        transform: translate(-98%, -98%);
        background-color: var(--success);
        z-index: 1;
        @keyframes loadingButtonAnimation {
          0% {
            transform: translate(-99%, -98%);
          }

          25% {
            transform: translate(99%, -98%);
          }

          50% {
            transform: translate(99%, 98%);
          }
          75% {
            transform: translate(-99%, 98%);
          }

          100% {
            transform: translate(-99%, -98%);
          }
        }
      }

      &:disabled {
        cursor: default;
        background-color: var(--bg-200);

        &:after {
          visibility: visible;
        }

        & .wallet__connect-button-wrapper {
          opacity: 0.6;
        }
      }

      &-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
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
