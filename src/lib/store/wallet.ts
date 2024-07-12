import { type APIResult } from "$lib/api/base";

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

/**
 * Sends payments to the zkCloudWorker account with a minimum amount of 2 MINA
 * @param memo - max 32 chars
 * @returns { hash } or { error }
 */
export async function sendPayment(received: {
  amount: number,
  memo: string
}): Promise<APIResult> {
  try {
    const rsp = await window.mina?.sendPayment({
      amount: received.amount || import.meta.env.VITE_ZKCW_TOPUP_MIN,
      memo: (received.memo || '').slice(0, 32),
      to: import.meta.env.VITE_ZKCW_TOPUP_ADDRESS as string,
      fee: import.meta.env.VITE_ZKCW_TOPUP_FEE as number,
    });
    return {
      success: true, error: null,
      // successful result.
      data: rsp // { "hash": "Ckp...TUDwW9" }
    }
  }
  catch (error: any) {
    return {
      success: false, data: null,
      error: error || error.message
    }
  } 
}