//Import Scss
import "./assets/scss/themes.scss";
import "./app.css";
import 'animate.css';
import app from './@state';
import React, { useState } from 'react';
import HomeComponent from './components/home/HomeComponent';

function App() {
	const [web3Initialized, setWeb3Initialized] = useState(false);

	React.useEffect(() => {
		//Initialize Web3 Window Listeners
		if (!web3Initialized) {
			if (app.web3.windowHasWeb3Wallet()) {
				window.ethereum.on("chainChanged", app.web3.setChainId);
				window.ethereum.on("accountsChanged", app.web3.connectWallet);
				app.web3.initializeWeb3().then(() => {
					setWeb3Initialized(true);
				});
			}
		}
	}, [web3Initialized]);

	return (
		<>
			<HomeComponent />
		</>
	)
}

export default App
