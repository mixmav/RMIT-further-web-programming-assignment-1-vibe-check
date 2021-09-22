import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth, useAuthUpdate } from 'Context/AuthContext';
import { useUserDatastore } from 'Context/UserDatastoreContext';

import './SignIn.scss';

function SignIn() {
	const auth = useAuth();
	const updateAuth = useAuthUpdate();

	const userDatastore = useUserDatastore();

	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const attemptLogin = (event) => {
		event.preventDefault();

		// Check if user exists
		let matchedUser = userDatastore.find(object => object.email === userEmail);

		if (matchedUser !== undefined) {
			// User exists, check if password is correct
			if (matchedUser.password === userPassword) {
				// Password correct, log the user in.
				updateAuth({
					auth: true,
					email: userEmail,
				});
			} else {
				alert("The password doesn't match our records.");
			}
		} else {
			alert("No user with that email address was found.");
		}
	}

	return (
		<div className="router-page-signin-container">
			{
				auth.auth && // If user is authenticated, redirect to the profile page
				<Redirect to="/profile"></Redirect>
			}
			<span>
				<h1>Sign in</h1>
				<form onSubmit={attemptLogin}>
					<input onChange={e => setUserEmail(e.target.value)} className="text-input full-width" type="email" name="email" placeholder="Email" required autoFocus />
					<input onChange={e => setUserPassword(e.target.value)} className="text-input full-width mt-10" type="password" name="password" placeholder="Password" required />
					<button className="btn full-width mt-20"><i className="fa fa-sign-in-alt"></i>Sign in</button>
					{
						// If the user is authenticated, redirect to the profile page.
						auth.auth && <Redirect to="/profile"></Redirect>
					}
				</form>
			</span>
		</div>
	);
}

export default SignIn;
