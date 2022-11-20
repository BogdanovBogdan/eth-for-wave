function getEthObject() {
  const { ethereum } = window;
  if (!ethereum) {
    console.log('Make sure you have metamask!');
    return null;
  }

  return ethereum;
}

export async function connectWallet() {
  try {
    const ethereum = getEthObject();
    if (!ethereum) {
      return;
    }

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    console.log('Connected', accounts[0]);
    // setCurrentAccount(accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error(error);
  }
}

export async function findMetaMaskAccount() {
  try {
    const ethereum = getEthObject();

    if (!ethereum) {
      return null;
    }

    console.log('Finded ethereum object: ', { ethereum });
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Authorized account: ', account);
      return account;
    } else {
      console.warn('No authorized account found');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
