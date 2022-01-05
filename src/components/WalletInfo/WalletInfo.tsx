import React from 'react';
import Button from '@mui/material/Button';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injected } from '../../connectors';

const WalletInfo: React.FC = () => {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React<Web3Provider>();

    return (
        <>
            {/* <span>{chainId}</span> */}
            <span>{account}</span>
        </>
    )
}

export default WalletInfo;