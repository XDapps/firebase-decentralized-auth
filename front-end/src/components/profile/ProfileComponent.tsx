import React from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Card, CardBody, Input, Button, Label, InputGroup, Alert, Spinner } from 'reactstrap';
import FooterComponent from '../footer/FooterComponent';
import logodark from "../../assets/images/logo-dark.png";
import app from '../../@state';

const ProfileComponent = observer((): JSX.Element => {
	const [userName, setUserName] = React.useState(app.fb.userName);
	const [showSavePending, setShowSavePending] = React.useState(false);

	const handleSaveUserName = async () => {
		setShowSavePending(true);
		await app.fb.saveUserName(userName);
		setShowSavePending(false);
		setUserName("");
	}

	const getSaveButton = () => {
		if (showSavePending) {
			return <Button color="primary" block className=" waves-effect waves-light" disabled={true}>
				<div className="flex-container-center">
					<div className="px-3">
						Saving...
					</div>
					<div className="flex-container-center">
						<Spinner className="p-2" color="light" size={"sm"} />
					</div>
				</div>
			</Button>
		} else {
			return <Button color="primary" block className=" waves-effect waves-light m-3" onClick={handleSaveUserName}>Save User Name</Button>
		}
	}

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
							<Card>
								<CardBody className="p-4">
									<Alert color="success">Login Successful!</Alert>
									<div className="p-3">
										<div className="mb-3">
											<Label className="form-label">Welcome: {app.fb.userName}</Label>
											<InputGroup className="mb-3 bg-soft-light rounded-3">
												<Input
													type="text"
													id="userName"
													name="userName"
													value={userName}
													onChange={(e) => setUserName(e.target.value)}
													className="form-control form-control-lg border-light bg-soft-light"
													placeholder="Update User Name"
												/>
											</InputGroup>
										</div>
										<div className="d-grid">
											<div className="flex-button-row">
												<Button color="primary" block className=" waves-effect waves-light m-3" onClick={app.fb.processLogoutRequest}>Sign out</Button>
												{getSaveButton()}
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
							<FooterComponent />
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	)
});

export default ProfileComponent;