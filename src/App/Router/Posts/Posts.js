import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';
import { useUserDatastore } from 'Context/UserDatastoreContext';

import './Posts.scss';
import Avatar from 'App/Common/Avatar/Avatar';

function Posts(){
	const auth = useAuth();
	const userDatastore = useUserDatastore();
	
	let user = userDatastore.find(object => object.email === auth.email);
	
	const [userName, setUserName] = useState("");
	
	useEffect(() => {
		if((user !== undefined)){
			setUserName(user.name);
		}
	}, [user]);

	return (
		<div className="router-page-posts-container">
			<section className="new-post">
				<h1><i className="fa fa-pen-alt"></i>Write a post</h1>
				{
					// If the user is not authenticated, redirect to the sign in page.
					!auth.auth && <Redirect to="/signin"></Redirect>
				}
				<div className="user-details">
					<Avatar seed={auth.email} size="small" />
					<p>{userName}</p>
				</div>

				<div className="form">
					<textarea placeholder="Share your thoughts..."></textarea>
					<button className="btn full-width mt-20"><i className="fa fa-paper-plane"></i>Post</button>
				</div>
			</section>
		</div>
	);
}

export default Posts;