import { useState, useEffect, useRef } from 'react';
import { useAuth } from 'Context/AuthContext';
import Avatar from 'App/Common/Avatar/Avatar';
import { usePostDatastorePush } from 'Context/PostDatastoreContext';
import ChoosePictureDialog from './ChoosePictureDialog';


function NewPost(props){
	const textareaRef = useRef();
	const [postText, setPostText] = useState("");
	const pushToPostDatastore = usePostDatastorePush();
	const [choosePictureDialogVisible, setChoosePictureDialogVisible] = useState(true);

	const auth = useAuth();
	const [userEmail, setUserEmail] = useState("");

	useEffect(() => {
		if((auth.email !== undefined)){
			setUserEmail(auth.email);
		}
	}, [auth]);

	const createPostHandle = () => {
		if (postText.trim() === "") {
			alert("Post can't be empty.");
			return;
		}
		let post =  {
			"post_id": auth.email + new Date().getTime(),
			"user_id": auth.email,
			"content": postText,
			"createdAt": new Date().toDateString()
		}

		pushToPostDatastore(post);
		setPostText("");
		textareaRef.current.value = "";
	}

	return(
		<div className="router-page-posts--component-new-post">
			{
				choosePictureDialogVisible &&
				<ChoosePictureDialog visible={choosePictureDialogVisible} toggleVisible={(state) => setChoosePictureDialogVisible(state)} />
			}

			<h1 style={{ textAlign: 'center' }}><i className="fa fa-pen-alt"></i>Write a post</h1>

			<div className="user-details">
				<Avatar seed={userEmail} size="small" />
				<p>{props.userName}</p>
			</div>

			<div className="form">
				<textarea ref={textareaRef} onChange={e => setPostText(e.target.value)} placeholder="Share your thoughts..."></textarea>
				<div className="picture mt-10">
					<button className="btn small darkBlack" onClick={() => setChoosePictureDialogVisible(true)}><i className="fa fa-camera"></i>Choose a picture</button>
				</div>
				<button onClick={createPostHandle} className="btn full-width mt-20"><i className="fa fa-paper-plane"></i>Post</button>
			</div>
		</div>
	);
}

export default NewPost;