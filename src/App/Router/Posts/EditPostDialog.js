import { useState, useRef } from 'react';
import _ from 'lodash';
import ChoosePictureDialog from './ChoosePictureDialog';
import { usePostDatastoreUpdatePost } from 'Context/PostDatastoreContext';

function EditPostDialog(props){
	const containerRef = useRef();
	const [postText, setPostText] = useState(props.post.content);
	const [choosePictureDialogVisible, setChoosePictureDialogVisible] = useState(false);
	const [postImageSrc, setPostImgSrc] = useState(props.post.img);
	const updatePostInDatastore = usePostDatastoreUpdatePost();

	const handleClickClose = (event) => {
		props.toggleVisible(false);
	}

	const checkClickClose = (event) => {
		if (event.target === containerRef.current && containerRef.current.contains(event.target)) {
			props.toggleVisible(false);
		}
	}

	const updatePostHandle = () => {
		if (postText.trim() === "") {
			alert("Post can't be empty.");
			return;
		}
		let post =  {
			"post_id": props.post.post_id,
			"user_id": props.postUser.email,
			"content": postText,
			"img": postImageSrc,
			"createdAt": props.post.createdAt,
		}
		updatePostInDatastore(post);
		
		//Reset field values.
		setPostText("");
		setPostImgSrc("");
		props.toggleVisible(false);
		alert("Post updated");
	}

	return(
		<div className="router-page-posts--component-edit-post-dialog dialog-container" onClick={checkClickClose} ref={containerRef}>
			{
				choosePictureDialogVisible &&
				<ChoosePictureDialog visible={choosePictureDialogVisible} setPostImgSrc={(state) => setPostImgSrc(state)} toggleVisible={(state) => setChoosePictureDialogVisible(state)} />
			}
			<div className="dialog">
				<div className="top-bar">
					<h1>Edit your post</h1>
					<button className="btn lightRed small" onClick={handleClickClose}><i className="fa fa-window-close"></i>Cancel</button>
				</div>

				<div className="form mt-20">
					<textarea value={postText} onChange={e => setPostText(e.target.value)} placeholder="Share your thoughts..."></textarea>
					<div className="picture mt-10">
						<button className="btn small darkBlack" onClick={() => setChoosePictureDialogVisible(true)}><i className="fa fa-camera"></i>Choose a picture</button>

						{/* Use Lodash to truncate the URL to 20 characters */}
						<p>{_.truncate(postImageSrc, {length: 20})}</p>
					</div>
					<button onClick={updatePostHandle} className="btn full-width mt-20"><i className="fa fa-sync"></i>Update</button>
				</div>
			</div>
		</div>
	);
}

export default EditPostDialog;