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
	const [userDatastore, setUserDatastore] = useState([]);

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