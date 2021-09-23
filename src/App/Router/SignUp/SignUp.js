import { useState } from 'react';
import { useAuth, useAuthUpdate } from 'Context/AuthContext';
import {
	useUserDatastore,
	useUserDatastorePush 
} from 'Context/UserDatastoreContext';
import { Redirect } from 'react-router-dom';

import './SignUp.scss';

function SignUp() {
	const auth = useAuth();
	const updateAuth = useAuthUpdate();

	const userDatastore = useUserDatastore();
	const pushToUserDatastore = useUserDatastorePush();

	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const validateForm = (event) => {
		event.preventDefault();
		if(
			// false
			userPassword.length < 6 || // Is at least 6 characters long
			!userPassword.match(/[a-z]/) || // Contains at least 1 lowercase letter
			!userPassword.match(/[A-Z]/) || // Contains at least 1 uppercase letter
			!userPassword.match(/[0-9]/) || // Contains at least one number
			!userPassword.match(/[\W_]/) // Contains at least one special character including an underscore
		){
			alert('Password needs to be at least 6 characters including uppercase, lowercase characters, and a number and a punctuation.');
			return;
		}

		//Check if user's email is unique
		if (userDatastore.find(object => object.email === userEmail) !== undefined) {
			// A match was found, meaning the email is not unique, alert the user and return.
			alert("This email address has already been registered!");
			return;
		}


		// Valid user, sign them up, sign them in, and redirect to the profile page

		updateAuth({
			auth: true,
			email: userEmail,
		});

		pushToUserDatastore({
			name: userName,
			email: userEmail,
			password: userPassword,
			createdAt: new Date().toDateString(),
		});
	}

	return (
		<div className="router-page-signup-container">
			{
				auth.auth && // If user is authenticated, redirect to the profile page
				<Redirect to="/profile"></Redirect>
			}
			<span>
				<h1>Sign up</h1>
				<form onSubmit={validateForm}>
					<input onChange={e => setUserName(e.target.value)} className="text-input full-width" type="text" name="name" placeholder="Name" autoFocus />
					<input onChange={e => setUserEmail(e.target.value)} className="text-input full-width mt-10" type="email" name="email" placeholder="Email" />
					<input onChange={e => setUserPassword(e.target.value)} className="text-input full-width mt-10" type="password" name="password" placeholder="Password"/>
					
					<button className="btn full-width mt-20"><i className="fa fa-user-plus"></i>Sign up</button>
					{
						// If the user is authenticated, redirect to the profile page.
						auth.auth && <Redirect to="/profile"></Redirect>
					}
				</form>
			</span>
		</div>
	);


}

export default SignUp;