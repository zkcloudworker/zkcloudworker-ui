import { type Chain } from "$lib/types";

export {
  getCurrentChain,
  saveActiveChain,
  removeActiveChain,
  getChains,
  findChain,
  DEFAULT_CHAIN_ID
}
  
const DEFAULT_CHAIN_ID = 'devnet';

/* eslint-disable @typescript-eslint/no-explicit-any */
const Chains: any = {
  'devnet': {
    chainId: "devnet",
    name: "Devnet",
    // the only one supported by o1js 1+
    proxy: "https://api.minascan.io/node/devnet/v1/graphql",
    archives: ["https://api.minascan.io/archive/devnet/v1/graphql"],
    explorerAccountUrl: "https://minascan.io/devnet/account/",
    explorerTransactionUrl: "https://minascan.io/devnet/tx/",
  },
  'zeko': {
    chainId: "zeko",
    name: "Zeko",
    // the only one supported by o1js 1+
    proxy: "https://api.minascan.io/node/devnet/v1/graphql",
    archives: ["https://api.minascan.io/archive/devnet/v1/graphql"],
    explorerAccountUrl: "https://minascan.io/devnet/account/",
    explorerTransactionUrl: "https://minascan.io/devnet/tx/",
  },
  'mainnet': {
    chainId: "mainnet",
    name: "Mainnet",
    // the only one supported by o1js 1+
    proxy: "https://api.minascan.io/node/devnet/v1/graphql",
    archives: ["https://api.minascan.io/archive/devnet/v1/graphql"],
    explorerAccountUrl: "https://minascan.io/devnet/account/",
    explorerTransactionUrl: "https://minascan.io/devnet/tx/",
  }
}

const STORE_KEY = "current-chain";
let activeChain: Chain | null = null; // cached

function findChain(id: string) {
  const chains = Chains.filter((t: Chain) => t.chainId === id); 
  if (!chains || !chains.length || chains.length > 1)
    throw Error(`findChain: Invalid chainId ${id}`);
  return chains[0];
}

function getChains() {
  return Object.keys(Chains).map((k) => Chains[k]);
}

function getCurrentChain(): Chain | null {
  if (activeChain) return activeChain;
  const data = localStorage.getItem(STORE_KEY);
  activeChain = data && JSON.parse(data); 
  return activeChain;
};

function saveActiveChain(chainId: string) {
  if (! chainId)
    throw Error("setActiveChain: Invalid chainId");
  const chain = findChain(chainId); 
  localStorage.setItem(STORE_KEY, JSON.stringify(chain));
  activeChain = chain;
  return activeChain;
};

function removeActiveChain() {
  localStorage.removeItem(STORE_KEY);
  activeChain = null;
};
