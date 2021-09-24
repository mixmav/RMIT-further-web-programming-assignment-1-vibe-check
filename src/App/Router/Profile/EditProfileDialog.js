import { useRef, useState, useEffect } from 'react';
import { useAuth } from 'Context/AuthContext';
import { useUserDatastore, useUserDatastoreUpdateUser } from 'Context/UserDatastoreContext';

function EditProfileDialog(props){
	const containerRef = useRef();
	const newPasswordRef = useRef();
	const oldPasswordRef = useRef();

	const auth = useAuth();
	const userDatastore = useUserDatastore();
	const updateUserInUserDatastore = useUserDatastoreUpdateUser();

	const user = userDatastore.find(object => object.email === auth.email);

	const [userName, setUserName] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	useEffect(() => {
		if (user !== undefined) {
			setUserName(user.name);
		}
	}, [user]);

	const handleClick = (event) => {
		props.toggleVisible(false);
	}

	const checkClickClose = (event) => {
		if (event.target === containerRef.current && containerRef.current.contains(event.target)) {
			props.toggleVisible(false);
		}
	}

	const updateName = () => {
		if (userName.trim() === "") {
			// Name is empty, alert error and return.
			alert("Name can't be empty");
			return; 
		}
		let updatedUser = {
			name: userName,
			email: user.email,
			password: user.password,
			createdAt: user.createdAt,
		}
		updateUserInUserDatastore(updatedUser);
		alert('The name has been updated');
	}

	const updatePassword = (event) => {
		if (oldPassword.trim() === "") {
			alert("Old password can't be empty.");
			return;
		}
		if (newPassword.trim() === "") {
			alert("New password can't be empty.");
			return;
		}

		if (oldPassword === user.password) {
			// valdiate new password for security.
			if(
				// false
				newPassword.length < 6 || // Is at least 6 characters long
				!newPassword.match(/[a-z]/) || // Contains at least 1 lowercase letter
				!newPassword.match(/[A-Z]/) || // Contains at least 1 uppercase letter
				!newPassword.match(/[0-9]/) || // Contains at least one number
				!newPassword.match(/[\W_]/) // Contains at least one special character including an underscore
			){
				alert('Password needs to be at least 6 characters including uppercase, lowercase characters, and a number and a punctuation.');
				return;
			}

			// Everything is okay, change the password.
			let updatedUser = {
				name: user.name,
				email: user.email,
				password: newPassword,
				createdAt: user.createdAt,
			}

			updateUserInUserDatastore(updatedUser);
			alert('The password has been updated');
			
			//Reset field values.
			setNewPassword("");
			setOldPassword("");
			oldPasswordRef.current.value = "";
			newPasswordRef.current.value = "";
		} else {
			alert ("Old password doesn't match our records");
		}
	}

	return (
		<div className="router-page-profile--component-edit-profile-dialog dialog-container" onClick={checkClickClose} ref={containerRef}>
			<div className="dialog custom-scrollbar">
				<h1><i className="fa fa-edit"></i>Edit your details</h1>
				
				<div className="input-fields mt-20">
					<label>Name</label>
					<input type="text" className="text-input full-width mt-10" value={userName} onChange={e => setUserName(e.target.value)} onKeyDown={(e) => {if(e.keyCode === 13) updateName()}}/>
					<button className="btn mt-10 small full-width" onClick={updateName}><i className="fa fa-sync-alt"></i>Update name</button>

					<h1 className="mt-20"><i className="fa fa-key"></i>Change password</h1>
					<input type="password" className="text-input full-width mt-10" onChange={e => setOldPassword(e.target.value)} placeholder="Old password" ref={oldPasswordRef}/>
					<input type="password" className="text-input full-width mt-10" onChange={e => setNewPassword(e.target.value)} placeholder="New password" ref={newPasswordRef}/>

					<button className="btn mt-10 small full-width" onClick={updatePassword}><i className="fa fa-sync-alt"></i>Update password</button>
				</div>
				<button className="btn lightRed full-width mt-30" onClick={handleClick}><i className="fa fa-window-close"></i>Close</button>
			</div>
		</div>
	);
}

export default EditProfileDialog;