// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Chains: any = {
  'devnet': {
    // the only one supported by o1js 1+
    proxy: "https://api.minascan.io/node/devnet/v1/graphql",
      //"https://proxy.devnet.minaexplorer.com/graphql",
    archives: [
      "https://api.minascan.io/archive/devnet/v1/graphql",
      //"https://archive.devnet.minaexplorer.com",
    ],
    explorerAccountUrl: "https://minascan.io/devnet/account/",
    explorerTransactionUrl: "https://minascan.io/devnet/tx/",
    chainId: "devnet",
    name: "Devnet",
  }
}

const STORE_KEY = "current-chain";
let activeChainId: string = ""; // cached

export function getBlockchainInfo(id: string): any  {
  return Chains[id || activeChainId || 'devnet'];
}

export function setBlockchain(id: string): any {
  activeChainId = id || 'devnet';
}

export function getCurrentBlockchain(): any {
  return getBlockchainInfo(activeChainId);
}
