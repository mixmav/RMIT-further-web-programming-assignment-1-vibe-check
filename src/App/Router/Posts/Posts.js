import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';
import { useUserDatastore } from 'Context/UserDatastoreContext';
import { usePostDatastore } from 'Context/PostDatastoreContext';

import './Posts.scss';
import NewPost from './NewPost';
import IndividualPost from './IndividualPost';
import _ from 'lodash';

function Posts(){
	const auth = useAuth();
	const userDatastore = useUserDatastore();
	const postDatastore = usePostDatastore();
	
	let user = userDatastore.find(object => object.email === auth.email);
	
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const [showOwnPostsOnly, updateShowOwnPostsOnly] = useState(false);
	const [userOwnPostDatastore, updateUserOwnPostDatastore] = useState([]);

	useEffect(() => {
		if((user !== undefined)){
			setUserName(user.name);
			setUserEmail(user.email);
		}
	}, [user]);

	useEffect(() => {
		updateUserOwnPostDatastore(_.filter(postDatastore, (post) => {
			return post.user_id === userEmail;
		}));
	}, [postDatastore, userEmail]);

	return (
		<div className="router-page-posts-container">
			<section>
				{
					// If the user is not authenticated, redirect to the sign in page.
					!auth.auth && <Redirect to="/signin"></Redirect>
				}

				<NewPost userName={userName} />
				<h1 className="mt-30"><i className="fa fa-clipboard-list"></i>All posts</h1>
				<label className="mt-10" style={{ 'display': 'inline-block' }}>Only show posts made by me <input onChange={(e) => updateShowOwnPostsOnly(e.target.checked)} checked={showOwnPostsOnly} type="checkbox" /></label>
				
				<section>
					{!showOwnPostsOnly &&
						postDatastore.map((post) => 
							<IndividualPost key={post.post_id} post={post} />
						)
					}
					{showOwnPostsOnly &&
						userOwnPostDatastore.map((post) => 
							<IndividualPost key={post.post_id} post={post} />
						)
					}
				</section>
			</section>
		</div>
	);
}

export default Posts;