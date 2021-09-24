import React, { useContext, useState, useEffect, useRef } from "react";
import _ from 'lodash';

const PostDatastoreContext = React.createContext();
const PostDatastorePushContext = React.createContext();
const PostDatastorePullContext = React.createContext();
const PostDatastoreUpdatePostContext = React.createContext();

export function usePostDatastore(){
	return useContext(PostDatastoreContext);
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
	const [postIdToPull, setPostIdToPull] = useState(null);
	const isFirstRender = useRef(true);

	const [postDatastore, setPostDatastore] = useState([
		{
			"post_id": "manav.sg1@gmail.com1",
			"user_id": "manav.sg1@gmail.com",
			"content": "123",
			"img": "https://spy.com/wp-content/uploads/2020/12/CleanClipping-Recovered-10.png?w=958&h=599&crop=1",
			"createdAt": "Thu Sep 23 2021"
		},
		{
			"post_id": "manav.sg1@gmail.com2",
			"user_id": "manav.sg1@gmail.com",
			"content": "123",
			"replyOf": "manav.sg1@gmail.com1",
			"createdAt": "Thu Sep 23 2021"
		},
		{
			"post_id": "manav.sg1@gmail.comm1",
			"user_id": "manav.sg1@gmail.comm",
			"content": "New post 2",
			"createdAt": "Thu Sep 23 2021"
		}
	]);


	/*
		this method controls when the "old" post is pulled from the post datastore.
		It does so by using the isFirstRender flag.
		It's done this way to make sure the state is up-to-date before performing the operation.
	*/
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (postIdToPull !== null) {
			let result = _.without(postDatastore, _.find(postDatastore, {
				post_id: postIdToPull,
			}));

			setPostDatastore((state) => {
				return result;
			});

			setPostIdToPull(null);
		}
	}, [postIdToPull, postDatastore]);

	const pushPostDatastore = (post, index = false) => {
		if (!index) {
			setPostDatastore(
				() => {
					return [...postDatastore, post];
				}
			);
		} else {

		}
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
				setPostIdToPull(post.post_id);
				return [...postDatastore, post];
			}
		);
	}

	return (
		<PostDatastoreContext.Provider value={postDatastore}>
			<PostDatastorePushContext.Provider value={pushPostDatastore}>
				<PostDatastorePullContext.Provider value={pullPostDatastore}>
					<PostDatastoreUpdatePostContext.Provider value={updatePostInDatastore}>
						{children}
					</PostDatastoreUpdatePostContext.Provider>
				</PostDatastorePullContext.Provider>
			</PostDatastorePushContext.Provider>
		</PostDatastoreContext.Provider>
	);
}