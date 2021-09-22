import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';
import { useUserDatastore } from 'Context/UserDatastoreContext';

import "./Profile.scss";

function Profile() {
	const auth = useAuth();
	const userDatastore = useUserDatastore();

	let user = userDatastore.find(object => object.email === auth.email);
	
	const [userName] = useState(user.name);
	const [userCreatedAt] = useState(user.createdAt);

	return (
		<div className="router-page-profile-container">
			{
				// If the user is not authenticated, redirect to the sign in page.
				!auth.auth && <Redirect to="/signin"></Redirect>
			}
			<h1>Your profile</h1>
			<div className="profile-details">
				<img src={"https://avatars.dicebear.com/api/bottts/" + hashString(auth.email) + '.svg'} alt="User avatar"/>
				<div>
					<p className="text primary bold">{userName}</p>
					<p className="text primary bold">{auth.email}</p>
					<p>Joined: <span className="text primary bold">{userCreatedAt}</span></p>
				</div>
				<button className="btn mt-10"><i className="fa fa-edit"></i>Edit profile</button>
				&nbsp;&nbsp;
				<button className="btn red mt-10"><i className="fa fa-trash-alt"></i>Delete profile</button>
			</div>
		</div>
	);
}

export default Profile;

const hashString = str => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash;
	}
	return new Uint32Array([hash])[0].toString(36);
};