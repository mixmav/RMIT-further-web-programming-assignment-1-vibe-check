import { useState, useEffect } from 'react';
import { useAuth } from 'Context/AuthContext';
import { useUserDatastore } from 'Context/UserDatastoreContext';
import { usePostDatastorePull } from 'Context/PostDatastoreContext';

import Avatar from 'App/Common/Avatar/Avatar';
import EditPostDialog from './EditPostDialog';

function IndividualPost(props){
	const auth = useAuth();
	const userDatastore = useUserDatastore();
	const pullFromPostDatastore = usePostDatastorePull();

	let postUser = userDatastore.find(object => object.email === props.post.user_id);
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [editPostDialogVisible, setEditPostDialogVisible] = useState(false);

	useEffect(() => {
		if((postUser !== undefined)){			
			setUserName(postUser.name);
			setUserEmail(postUser.email);
		}
	}, [postUser]);

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			pullFromPostDatastore(props.post.post_id);
		}
	}

	return(
		<div className="router-page-posts--component-individual-post">
			{
				editPostDialogVisible &&
				<EditPostDialog postUser={postUser} post={props.post} toggleVisible={(state) => setEditPostDialogVisible(state)} />
			}
			<div className="top-bar">
				<Avatar seed={userEmail} size="small"/>
				<p>Written by {userName}</p>
			</div>
			<div className="content custom-scrollbar">
				<h1>{props.post.content}</h1>

				{
					(props.post.img !== "" && props.post.img !== undefined) &&
					<img src={props.post.img} alt="Post" />
				}
			</div>
			<div className="buttons mt-20">
				<button className="btn"><i className="fa fa-reply"></i>Reply</button>
				{auth.email === props.post.user_id &&
					<div>
						<button className="btn" onClick={() => setEditPostDialogVisible(true)}><i className="fa fa-edit"></i>Edit</button>
						&nbsp;&nbsp;
						<button className="btn red" onClick={handleDelete}><i className="fa fa-trash-alt"></i>Delete</button>
					</div>
				}
			</div>
		</div>
	);
}

export default IndividualPost;