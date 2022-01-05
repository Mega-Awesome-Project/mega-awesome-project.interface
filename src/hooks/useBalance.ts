import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'

export interface IUseBalance {
    ETHBalance: string,
}

export function useBalance(): { ETHBalance: string } {
    const { library, chainId, account, active, error } = useWeb3React<Web3Provider>()
    const [ETHBalance, setETHBalance] = useState<string>('0')

    const updateBalance = () => {
        if (active && account && library) {
            library.getBalance(account)
                .then(balance => setETHBalance((+formatEther(balance)).toFixed(4)))
                .catch(() => setETHBalance('0'))
        } else {
            setETHBalance('0')
        }
    }

    useEffect(() => {
        updateBalance()
    }, [chainId, account, active, error, library])

    return {
        ETHBalance
    }
}