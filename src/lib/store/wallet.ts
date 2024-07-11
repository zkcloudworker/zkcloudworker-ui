
export interface WalletStatus {
  accountId?: string;
  signedData?: string;
  chain?: any,
  isConnecting: boolean;
  isConnected: boolean;
  isError: any | null;
  errorMessage: string;
}

export function isWalletAvailable() {
  return (typeof window.mina !== 'undefined');
}

export async function isWalletConnected(): Promise<string> {
  if (isWalletAvailable()) {
    const accounts: any[] = await window.mina?.getAccounts() || [];
    if (accounts.length) {
      // accountId = accounts[0];
      return accounts[0];
    }
  }
  return '';
}

export async function connectWallet(): Promise<WalletStatus> {
  try {
    const accounts: any[] = await window.mina?.requestAccounts() || [];
    return {
      accountId: accounts[0],
      isConnecting: false,
      isConnected: true,
      isError: null,
      errorMessage: ''
    }
  }
  catch (err) {
    return {
      isError: true,
      errorMessage: `${err}`,
      accountId: '',
      isConnecting: false,
      isConnected: false
    }
  }
}

export async function signWithWallet(data: any): Promise<WalletStatus> {
  try {
    const chain = await window.mina?.requestNetwork();

		const signedData = await window.mina?.signMessage({
			message: JSON.stringify(data || 'NO_DATA')
		});

    return {
      signedData: JSON.stringify(signedData),
      chain: chain,
      isConnecting: false,
      isConnected: true,
      isError: null,
      errorMessage: ''
    }
  }
  catch (err) {
    return {
      isError: true,
      errorMessage: `${err}`,
      signedData: '',
      isConnecting: false,
      isConnected: false
    }
  }
}
