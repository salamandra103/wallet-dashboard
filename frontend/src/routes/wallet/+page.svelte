<script lang="ts">
  import CheckIcon from 'svelte-material-icons/Check.svelte';
  import Icon from 'components/Icon.svelte';
  import { wallets, connectWallet } from 'store/wallet';
  import type { Wallet } from 'interfaces/Wallet';

  async function _connectWallet(wallet: Wallet) {
    let address = await connectWallet(wallet.baseProvider, wallet.provider);
  }
</script>

<section class="wallet">
  {#if $wallets.length}
    <div class="wallet__connect-buttons">
      {#each $wallets as item}
        <button
          class="wallet__connect-button"
          class:wallet__connect-button--progress={item.meta.isInProgress}
          class:wallet__connect-button--success={item.meta.isActive}
          on:click={() => {
            _connectWallet(item);
          }}
          disabled={item.meta.isDisabled}
        >
          <div class="wallet__connect-button-wrapper">
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

      &--success {
        border-color: var(--success);
        cursor: default;
        background-color: var(--bg-200);
        pointer-events: none;
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
        background-color: var(--bg-300);

        pointer-events: none;

        &:after {
          visibility: visible;
        }

        & .wallet__connect-button-wrapper {
          opacity: 0.6;
        }
      }
    }

    &__connect-button-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
    }

    &__connect-button-title {
      color: var(--text-200);
      letter-spacing: 1px;
      font-size: 16px;
    }

    &__connect-button-icon {
      margin-right: 10px;
    }
  }

  .wallet :global(.wallet__connect-button-icon--check) {
    margin-right: 15px;
  }
</style>
