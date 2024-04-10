import { Alert, Button, CardBody, Card } from 'reactstrap';
import metamask from '../../../assets/images/icons/metamask.svg';

const NoWalletComponent = (): JSX.Element => {

	return (
		<Card>
			<CardBody className="p-4">
				<Alert color="danger">You must have a Web3 wallet installed on your browser to login.</Alert>
				<div className="flex-container-center">
					<a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
						<img height={"100"} src={metamask} alt="metamask logo"></img>
					</a>
				</div>
				<div className="p-1">
					<div className="d-grid">
						<a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
							<Button color="primary" block className=" waves-effect waves-light" type="submit">
								Download MetaMask
							</Button>
						</a>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
export default NoWalletComponent;
