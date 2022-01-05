import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import { Web3Provider } from '@ethersproject/providers'

const Web3ReactManager = () => {
    const context = useWeb3React<Web3Provider>()
    const { connector } = context
  
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState<any>()
    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector])
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    return (<></>)
}

export default Web3ReactManager;