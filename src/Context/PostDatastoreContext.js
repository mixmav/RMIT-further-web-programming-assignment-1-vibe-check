import React, { useContext, useState } from "react";
import _ from 'lodash';

const PostDatastoreContext = React.createContext();
const PostDatastoreUpdateContext = React.createContext();
const PostDatastorePushContext = React.createContext();
const PostDatastorePullContext = React.createContext();
const PostDatastoreUpdatePostContext = React.createContext();

export function usePostDatastore(){
	return useContext(PostDatastoreContext);
}

export function usePostDatastoreUpdate(){
	return useContext(PostDatastoreUpdateContext);
}

export function usePostDatastorePush(){
	return useContext(PostDatastorePushContext);
}

export function usePostDatastorePull(){
	return useContext(PostDatastorePullContext);
}

export function usePostDatastoreUpdatePost(){
	return useContext(PostDatastoreUpdatePostContext);
}

export function PostDatastoreProvider({ children }){
	// const isFirstRender = useRef(true);

	const [postDatastore, setPostDatastore] = useState([
		{
			"post_id": "manav.sg1@gmail.com1",
			"user_id": "manav.sg1@gmail.com",
			"content": "123",
			"createdAt": "Thu Sep 23 2021"
		},
		{
			"post_id": "manav.sg1@gmail.com2",
			"user_id": "manav.sg1@gmail.com",
			"content": "123",
			"createdAt": "Thu Sep 23 2021"
		},
		{
			"post_id": "manav.sg1@gmail.comm1",
			"user_id": "manav.sg1@gmail.comm",
			"content": "New post 2",
			"createdAt": "Thu Sep 23 2021"
		}
	]);

	const updatePostDatastore = (newPostDatastore) => {
		setPostDatastore(newPostDatastore);
	}

	const pushPostDatastore = (post) => {
		setPostDatastore(
			() => {
				return [...postDatastore, post];
			}
		);
	}

	const pullPostDatastore = (id, allFromUser = false) => {
		if (allFromUser) {
			let result = _.filter(postDatastore, (post) => {
				return post.user_id !== id;
			});

			setPostDatastore((state) => {
				return result;
			});

		} else {
			let result = _.filter(postDatastore, (post) => {
				return post.post_id !== id;
			});
	
			setPostDatastore((state) => {
				return result;
			});
		}
	}

	const updatePostInDatastore = (post) => {
		setPostDatastore(
			() => {
				// setEmailToPull(user.email);
				return [...postDatastore, post];
			}
		);
	}

	return (
		<PostDatastoreContext.Provider value={postDatastore}>
			<PostDatastoreUpdateContext.Provider value={updatePostDatastore}>
				<PostDatastorePushContext.Provider value={pushPostDatastore}>
					<PostDatastorePullContext.Provider value={pullPostDatastore}>
						<PostDatastoreUpdatePostContext.Provider value={updatePostInDatastore}>
							{children}
						</PostDatastoreUpdatePostContext.Provider>
					</PostDatastorePullContext.Provider>
				</PostDatastorePushContext.Provider>
			</PostDatastoreUpdateContext.Provider>
		</PostDatastoreContext.Provider>
	);
}