import { useRef, useState } from 'react';
import imagePreviewSVG from 'img/svg/image-preview.svg';

function ChoosePictureDialog(props){
	const [imgURLInput, setImgURLInput] = useState("");

	const [generatedImgURL, setGeneratedImgURL] = useState();
	const [imgLoadError, setImgLoadError] = useState(true);

	const containerRef = useRef();
	
	const handleClick = (event) => {
		props.toggleVisible(false);
	}

	const checkClickClose = (event) => {
		if (event.target === containerRef.current && containerRef.current.contains(event.target)) {
			props.toggleVisible(false);
		}
	}

	const handleLoadImage = (event) => {
		event.preventDefault();
		setGeneratedImgURL(imgURLInput);
	}

	const handleAddImageToPost = (event) => {
		if (imgLoadError) {
			alert("That is not a valid image");
		} else {
			props.setPostImgSrc(generatedImgURL);
			props.toggleVisible(false);
		}
	}

	return (
		<div className="router-page-posts--component-choose-picture-dialog" onClick={checkClickClose} ref={containerRef}>
			<div className="dialog custom-scrollbar">
				<div className="top-bar">
					<h1>Choose a picture</h1>
					<button className="btn darkBlack small" onClick={handleClick}><i className="fa fa-window-close"></i>Close</button>
				</div>

				<form onSubmit={handleLoadImage}>
					<input onChange={e => setImgURLInput(e.target.value)} type="url" className="text-input full-width mt-20" placeholder="URL of image" required/>
					<button type="submit" className="btn mt-20 full-width"><i className="fa fa-download"></i>Load image</button>
				</form>
				
				<h1 className="mt-10">Preview</h1>

				<img className={`${(imgLoadError ? 'img-error':'')}`} onLoad={() => setImgLoadError(false)} onError={() => setImgLoadError(true)} src={generatedImgURL} alt="Post" />
				
				{
					imgLoadError &&
					<img src={imagePreviewSVG} alt="Preview" />
				}

				<button onClick={handleAddImageToPost} className="btn full-width mt-20"><i className="fa fa-plus-square"></i>Add image to post</button>
			</div>
		</div>
	);
}

export default ChoosePictureDialog;