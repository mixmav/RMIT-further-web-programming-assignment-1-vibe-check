import { useRef, useState, useEffect } from 'react';
import { useAuth } from 'Context/AuthContext';
import { useUserDatastore, useUserDatastorePush } from 'Context/UserDatastoreContext';

function EditProfileDialog(props){
	const containerRef = useRef();

	const auth = useAuth();
	const userDatastore = useUserDatastore();
	const pushToUserDatastore = useUserDatastorePush();

	const user = userDatastore.find(object => object.email === auth.email);

	const [userName, setUserName] = useState("");
	// const [password, setPassword] = useState("");

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

	const updateName = (event) => {
		let updatedUser = {
			name: userName,
			email: user.email,
			password: user.password,
			createdAt: user.createdAt,
		}
		pushToUserDatastore(updatedUser);
		// alert('The name has been updated');
	}

	return (
		<div className="router-page-profile--component-edit-profile-dialog" onClick={checkClickClose} ref={containerRef}>
			<div className="dialog custom-scrollbar">
				<h1><i className="fa fa-edit"></i>Edit your details</h1>

				<div className="input-field mt-10">
					<label>Name</label>
					<input type="text" className="text-input" value={userName} onChange={e => setUserName(e.target.value)}/>
				</div>
				<button className="btn blue mt-20" onClick={updateName}><i className="fa fa-sync-alt"></i>Update name</button>
				<h2 className="mt-30"><i className="fa fa-key"></i>Change password</h2>
				<div className="input-field mt-10">
					<input type="password" className="text-input" placeholder="Old password"/>
				</div>

				<div className="input-field mt-10">
					<input type="password" className="text-input" placeholder="New password"/>
				</div>
				<button className="btn blue mt-20"><i className="fa fa-sync-alt"></i>Update password</button>
				<button className="btn full-width mt-30" onClick={handleClick}><i className="fa fa-window-close"></i>Close</button>
			</div>
		</div>
	);
}

export default EditProfileDialog;