import React, { useContext, useState } from "react";

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
	const [userDatastore, setUserDatastore] = useState([{
		email: 'manav.sg1@gmail.com',
		name: 'Manav Gadhoke',
		password: '123',
		createdAt: new Date().toDateString(),
	}]);

	const updateUserDatastore = (newUserDatastore) => {
		setUserDatastore(newUserDatastore);
	}

	const pushUserDatastore = (user) => {
		setUserDatastore([...userDatastore, user]);
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