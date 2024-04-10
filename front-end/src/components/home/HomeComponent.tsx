import { observer } from "mobx-react";
import ProfileComponent from "../profile/ProfileComponent";
import LoginComponent from "../login/LoginComponent";
import app from "../../@state";

const HomeComponent = observer((): JSX.Element => {

	const getComponentToDisplay = () => {
		if (app.fb.userIsLoggedIn()) {
			return <ProfileComponent />;
		} else {
			return <LoginComponent />;
		}
	}
	
	return (
		<>
			{getComponentToDisplay()}
		</>
	);
});
export default HomeComponent;