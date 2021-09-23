import { useRef, useState, useEffect } from 'react';


function ChoosePictureDialog(props){
	const containerRef = useRef();
	
	const handleClick = (event) => {
		props.toggleVisible(false);
	}

	const checkClickClose = (event) => {
		if (event.target === containerRef.current && containerRef.current.contains(event.target)) {
			props.toggleVisible(false);
		}
	}

	return (
		<div className="router-page-posts--component-choose-picture-dialog" onClick={checkClickClose} ref={containerRef}>
			<div className="dialog custom-scrollbar">
				<h1>Choose a picture</h1>
				<input type="url" className="text-input full-width mt-10" placeholder="URL of image" />
			</div>
		</div>
	);
}

export default ChoosePictureDialog;