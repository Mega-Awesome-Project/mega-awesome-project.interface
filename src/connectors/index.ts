import { InjectedConnector } from '@web3-react/injected-connector'

export enum NetworkId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42
}

export const ChainName = {
  [NetworkId.Mainnet]: 'Ethereum Mainnet',
  [NetworkId.Ropsten]: 'Ropsten',
  [NetworkId.Rinkeby]: 'Rinkeby',
  [NetworkId.Goerli]: 'Goerli',
  [NetworkId.Kovan]: 'Kovan',
}

export const Explorer = {
  [NetworkId.Mainnet]: 'https://etherscan.io',
  [NetworkId.Ropsten]: 'https://ropsten.etherscan.io',
  [NetworkId.Rinkeby]: 'https://rinkeby.etherscan.io',
  [NetworkId.Goerli]: 'https://goerli.etherscan.io',
  [NetworkId.Kovan]: 'https://kovan.etherscan.io',
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })
