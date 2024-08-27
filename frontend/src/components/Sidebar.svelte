<script>
  import { page } from '$app/stores';

  import HomeIcon from '@material-design-icons/svg/outlined/home.svg';
  import AccountBalanceWalletIcon from '@material-design-icons/svg/outlined/account_balance_wallet.svg';
  import SettingsIcon from '@material-design-icons/svg/outlined/settings.svg';
  import InfoIcon from '@material-design-icons/svg/outlined/info.svg';
</script>

<nav>
  <ul>
    <li>
      <a href="/" class:active={$page.route.id === '/'}>
        <HomeIcon color="#fff" />
      </a>
    </li>
    <li>
      <a href="/wallet" class:active={$page.route.id === '/wallet'}>
        <AccountBalanceWalletIcon color="#fff" />
      </a>
    </li>
    <li>
      <a href="/settings" class:active={$page.route.id === '/settings'}>
        <SettingsIcon color="#fff" />
      </a>
    </li>
    <li>
      <a href="/info" class:active={$page.route.id === '/info'}>
        <InfoIcon color="#fff" />
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 40px 0;
    padding-left: 10px;
    padding-right: 20px;
    border-right: 1px solid var(--primary-200);
  }

  ul {
    display: grid;
    gap: 20px 0;
    li {
      text-align: center;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-200);
    height: 40px;
    width: 40px;
    border-radius: 5px;
    transition: 0.5s;

    &:hover {
      background-color: var(--primary-100);
      transform: translateX(10px);
    }

    &.active {
      background-color: var(--primary-100);
      transform: translateX(10px);
      cursor: default;
    }
  }
</style>
