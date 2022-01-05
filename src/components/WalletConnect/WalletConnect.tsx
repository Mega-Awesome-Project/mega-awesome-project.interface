import React from 'react';
import Button from '@mui/material/Button';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injected } from '../../connectors';

const WalletConnect: React.FC = () => {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React<Web3Provider>();

    const connect = async () => {
        try {
            await activate(injected);
        } catch (err) {
            console.log(err);
        }
    }

    const disconnect = async () => {
        try {
            deactivate();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Button 
            variant="contained"
            onClick={active ? disconnect : connect}
            >
            {active ? 'disconnect' : 'connect'}
        </Button>
    )
}

export default WalletConnect;