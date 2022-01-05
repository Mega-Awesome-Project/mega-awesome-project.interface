import { useState, useEffect } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { NetworkId } from '../connectors'
import { useContract } from './useContract'
import { config } from '../contracts/config'

export function useReadName() {
  const { account, chainId } = useWeb3React<Web3Provider>()
  const nameRegister = useContract(config.contracts['nameRegister'])
  const [addressName, setAddressName] = useState(null)

     const updateAddressName = async () => {
         if (!nameRegister) {
            return
        }

        const _name = await nameRegister['readName']()
        setAddressName(_name)
    }

    useEffect(() => {
        updateAddressName()
    }, [account, chainId])

  return { addressName, updateAddressName }
}