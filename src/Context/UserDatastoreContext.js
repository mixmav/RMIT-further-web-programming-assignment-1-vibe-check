import React, { useContext, useState } from "react";
import update from 'immutability-helper';

const UserDatastoreContext = React.createContext();
const UserDatastoreUpdateContext = React.createContext();
const UserDatastorePushContext = React.createContext();

export function useUserDatastore(){
	return useContext(UserDatastoreContext);
}

export function useUserDatastoreUpdate(){
	return useContext(UserDatastoreUpdateContext);
}

export function useUserDatastorePush(){
	return useContext(UserDatastorePushContext);
}

export function UserDatastoreProvider({ children }){
	const [userDatastore, setUserDatastore] = useState([
		{
			"name": "Manav Singh Gadhoke",
			"email": "manav.sg1@gmail.com",
			"password": "123",
			"createdAt": "Thu Sep 23 2021"
		}
	]);

	const updateUserDatastore = (newUserDatastore) => {
		setUserDatastore(newUserDatastore);
	}

	const pushUserDatastore = (user) => {
		setUserDatastore([user]);
		// setUserDatastore([{
		// 	email: 'manav.sg1@gmail.com',
		// 	name: 'MANAV'
		// }]);
	}

	return (
		<UserDatastoreContext.Provider value={userDatastore}>
			<UserDatastoreUpdateContext.Provider value={updateUserDatastore}>
				<UserDatastorePushContext.Provider value={pushUserDatastore}>
					{children}
				</UserDatastorePushContext.Provider>
			</UserDatastoreUpdateContext.Provider>
		</UserDatastoreContext.Provider>
	);
}