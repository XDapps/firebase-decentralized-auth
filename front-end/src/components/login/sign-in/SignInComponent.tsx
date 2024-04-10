import React from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, Label, InputGroup, Input, Button, Spinner } from 'reactstrap';
import app from '../../../@state';

const SignInComponent = observer((): JSX.Element => {
	const [isLoading, setIsLoading] = React.useState(false);

	const getButton = () => {
		if (isLoading) {
			return <Button color="primary" block className=" waves-effect waves-light" disabled={true}>
				<div className="flex-container-center">
					<div className="px-3">
						Signing in...
					</div>
					<div className="flex-container-center">
						<Spinner className="p-2" color="light" size={"sm"} />
					</div>
				</div>
			</Button>
		} else if (app.web3.isConnected()) {
			return <Button color="primary" block className=" waves-effect waves-light" onClick={handleSignIn}>Sign in</Button>
		} else {
			return <Button color="primary" block className=" waves-effect waves-light" onClick={app.web3.connectWallet}>Connect Wallet</Button>
		}
	}

	const handleSignIn = async () => {
		setIsLoading(true);
		await app.fb.processLoginRequest();
		setIsLoading(false);
	}

	return (
		<Card>
			<CardBody className="p-4">
				<div className="p-3">
					<div className="mb-3">
						<Label className="form-label">User Address</Label>
						<InputGroup className="mb-3 bg-soft-light rounded-3">
							<Input
								type="text"
								disabled={true}
								value={app.web3.address}
								id="address"
								name="address"
								className="form-control form-control-lg border-light bg-soft-light"
								placeholder="Wallet Address"
							/>
						</InputGroup>
					</div>
					<div className="d-grid">
						{getButton()}
					</div>
				</div>
			</CardBody>
		</Card>
	);
});
export default SignInComponent;