import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth, useAuthUpdate } from 'Context/AuthContext';
import { useUserDatastore, useUserDatastorePull } from 'Context/UserDatastoreContext';

import "./Profile.scss";

import EditProfileDialog from './EditProfileDialog';
import Avatar from 'App/Common/Avatar/Avatar';

function Profile() {
	const auth = useAuth();
	const updateAuth = useAuthUpdate();

	const userDatastore = useUserDatastore();
	const pullFromUserDatastore = useUserDatastorePull();

	let user = userDatastore.find(object => object.email === auth.email);
	
	const [userName, setUserName] = useState("");
	const [userCreatedAt, setUserCreatedAt] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const [editProfileDialogVisible, setEditProfileDialogVisible] = useState(false);

	useEffect(() => {
		if((user !== undefined)){
			setUserName(user.name);
			setUserCreatedAt(user.createdAt);
			setUserEmail(user.email);
		}
	}, [user]);

	const handleDeleteProfile = () => {
		if(window.confirm("Are you sure you want to delete your profile? This will also delete all your posts.")){
			updateAuth({auth: false, email: null}); //Log user out.
			pullFromUserDatastore(user.email);
		}
	}

	return (
		<div className="router-page-profile-container">
			
			{
				editProfileDialogVisible &&
				<EditProfileDialog visible={editProfileDialogVisible} toggleVisible={(state) => setEditProfileDialogVisible(state)}/>
			}
			{
				// If the user is not authenticated, redirect to the sign in page.
				!auth.auth && <Redirect to="/signin"></Redirect>
			}
			<h1>Your profile</h1>
			<div className="profile-details">
				<Avatar seed={userEmail}/>
				<section className="mt-10">
					<p className="text primary bold">{userName}</p>
					<p className="text primary bold">{userEmail}</p>
					<p>Joined: <span className="text primary bold">{userCreatedAt}</span></p>
				</section>
				<button className="btn mt-20" onClick={() => setEditProfileDialogVisible(true)}><i className="fa fa-edit"></i>Edit profile</button>
				&nbsp;&nbsp;
				<button className="btn red mt-20" onClick={handleDeleteProfile}><i className="fa fa-trash-alt"></i>Delete profile</button>
			</div>
		</div>
	);
}

export default Profile;