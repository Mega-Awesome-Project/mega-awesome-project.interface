import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { NetworkId } from '../connectors'
import { IContract } from '../contracts/config'

export function useContract(contractConfig: IContract) {
  const { chainId, library, account}= useWeb3React<Web3Provider>()

  if (!chainId || !contractConfig.address[chainId as NetworkId] || !library || !account) {
    return null
  }

  const signer = library.getSigner(account).connectUnchecked() as any
  if (!signer) {
      return null
  }


  return new Contract(contractConfig.address[chainId as NetworkId], contractConfig.json.abi, signer)
}