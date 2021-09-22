import { Redirect } from 'react-router-dom';
import { useUser } from 'Context/UserContext';

function Profile() {
	const user = useUser();

	return (
		<div className="router-page-profile-container">
			{
				// If the user is not authenticated, redirect to the sign in page.
				!user.authenticated && <Redirect to="/signin"></Redirect>
			}
			<h1>Welcome to your profile</h1>
		</div>
	);
}

export default Profile;
