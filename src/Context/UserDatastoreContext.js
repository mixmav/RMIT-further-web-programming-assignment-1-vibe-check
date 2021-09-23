import React, { useContext, useState, useEffect, useRef } from "react";
import _ from 'lodash';

const UserDatastoreContext = React.createContext();
const UserDatastoreUpdateContext = React.createContext();
const UserDatastorePushContext = React.createContext();
const UserDatastoreUpdateUserContext = React.createContext();

export function useUserDatastore(){
	return useContext(UserDatastoreContext);
}

export function useUserDatastoreUpdate(){
	return useContext(UserDatastoreUpdateContext);
}

export function useUserDatastorePush(){
	return useContext(UserDatastorePushContext);
}

export function useUserDatastoreUpdateUser(){
	return useContext(UserDatastoreUpdateUserContext);
}

export function UserDatastoreProvider({ children }){
	const [emailToPull, setEmailToPull] = useState(null);
	
	const isFirstRender = useRef(true);
	const [userDatastore, setUserDatastore] = useState([
		{
			"name": "Manav Singh Gadhoke",
			"email": "manav.sg1@gmail.com",
			"password": "123",
			"createdAt": "Thu Sep 23 2021"
		}
	]);


	/*
		this method controls when the "old" user is pulled from the user datastore.
		It does so by using the isFirstRender flag.
		It's done this way to make sure the state is up-to-date before performing the operation.
	*/
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (emailToPull !== null) {
			let result = _.without(userDatastore, _.find(userDatastore, {
				email: emailToPull,
			}));

			setUserDatastore((state) => {
				return result;
			});

			setEmailToPull(null);
		}
	}, [emailToPull, userDatastore]);

	const updateUserDatastore = (newUserDatastore) => {
		setUserDatastore(newUserDatastore);
	}

	const pushUserDatastore = (user) => {
		setUserDatastore(
			() => {
				return [...userDatastore, user];
			}
		);
	}

	const updateUserInDatastore = (user) => {
		setUserDatastore(
			() => {
				setEmailToPull(user.email);
				return [...userDatastore, user];
			}
		);
	}

	return (
		<UserDatastoreContext.Provider value={userDatastore}>
			<UserDatastoreUpdateContext.Provider value={updateUserDatastore}>
				<UserDatastorePushContext.Provider value={pushUserDatastore}>
					<UserDatastoreUpdateUserContext.Provider value={updateUserInDatastore}>
						{children}
					</UserDatastoreUpdateUserContext.Provider>
				</UserDatastorePushContext.Provider>
			</UserDatastoreUpdateContext.Provider>
		</UserDatastoreContext.Provider>
	);
}