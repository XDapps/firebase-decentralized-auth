import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logodark from "../../assets/images/logo-dark.png";
import NoWalletComponent from './no-wallet/NoWalletComponent';
import SignInComponent from './sign-in/SignInComponent';
import FooterComponent from '../footer/FooterComponent';
import app from '../../@state';

const LoginComponent = (): JSX.Element => {

	return (
		<React.Fragment>
			<div className="account-pages my-5 pt-sm-5">
				<Container>
					<Row className="justify-content-center">
						<Col md={8} lg={6} xl={5} >
							<div className="text-center">
								<img src={logodark} alt="" height="30" className="logo logo-dark" />
								<p className="text-muted p-3">Demo app showing how to use a Web3 wallet for decentralized authentication using Firebase <a href="https://github.com/XDapps/firebase-decentralized-auth" target="_blank"> view the code.</a></p>
							</div>
							{!app.web3.windowHasWeb3Wallet() ? <NoWalletComponent /> : <SignInComponent />}
							<FooterComponent/>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	)
}

export default LoginComponent;