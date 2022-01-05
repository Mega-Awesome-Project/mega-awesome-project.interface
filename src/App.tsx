import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { Web3ReactManager } from './components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEagerConnect, useInactiveListener } from './hooks';

function App() {
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

  return (
    <div className="App">
        <Router>
          <Routes />
        </Router>
    </div>
  );
}

export default App;
