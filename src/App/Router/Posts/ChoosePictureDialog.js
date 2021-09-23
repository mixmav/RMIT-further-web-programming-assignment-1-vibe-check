import { useRef, useState, useEffect } from 'react';
import imagePreviewSVG from 'img/svg/image-preview.svg';

function ChoosePictureDialog(props){
	const [imgURL, setImgURL] = useState("");
	const [imgError, setImgError] = useState(false);
	const containerRef = useRef();
	
	const handleClick = (event) => {
		props.toggleVisible(false);
	}

	const checkClickClose = (event) => {
		if (event.target === containerRef.current && containerRef.current.contains(event.target)) {
			props.toggleVisible(false);
		}
	}

	const handleAddImage = (event) => {
		event.preventDefault();
	}

	useEffect(() => {

	});

	const generateImgSrc = () => {
		if (imgURL.trim() !== "" && !imgError) {
			return imgURL;
		} else {
			return imagePreviewSVG;
		}
	}

	return (
		<div className="router-page-posts--component-choose-picture-dialog" onClick={checkClickClose} ref={containerRef}>
			<div className="dialog custom-scrollbar">
				<div className="top-bar">
					<h1>Choose a picture</h1>
					<button className="btn darkBlack small" onClick={handleClick}><i className="fa fa-window-close"></i>Close</button>
				</div>

				<form onSubmit={handleAddImage}>
					<input onChange={e => setImgURL(e.target.value)} type="url" className="text-input full-width mt-20" placeholder="URL of image" required/>
					<button type="submit" className="btn mt-20 full-width"><i className="fa fa-plus-square"></i>Add image to post</button>
				</form>
				
				<h1 className="mt-10">Preview</h1>
				<img onLoad={() => setImgError(false)} onError={() => setImgError(true)} src={generateImgSrc()} alt="User image" />
			</div>
		</div>
	);
}

export default ChoosePictureDialog;