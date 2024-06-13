export type { Chain };

interface Chain {
  chainId: string;    // 'devnet'
  proxy: string;      // 'https://api.minascan.io/node/devnet/v1/graphql',
  archives: string[]; // ['https://api.minascan.io/archive/devnet/v1/graphql'],
  explorerAccountUrl: string;     // 'https://minascan.io/devnet/account/',
  explorerTransactionUrl: string; // 'https://minascan.io/devnet/tx/',
  name: string; // 'MINA Devnet'
};
