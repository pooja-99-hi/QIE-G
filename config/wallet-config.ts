export const walletConfig = {
  supportedChains: [
    {
      id: 12345,
      name: 'QIE Network',
      rpcUrl: 'https://rpc.qie.network',
      explorer: 'https://explorer.qie.network',
      nativeCurrency: {
        name: 'QIE',
        symbol: 'QIE',
        decimals: 18,
      },
    },
    {
      id: 1,
      name: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      explorer: 'https://etherscan.io',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
    },
  ],
  walletConnectProjectId: 'your-walletconnect-project-id',
}