import './Home.scss';

import { Link } from 'react-router-dom';

import laptopSVG from 'img/svg/laptop.svg';
import readingBookSVG from 'img/svg/reading-book.svg';

function Home() {
	return (
		<div className="router-page-home-container">
			<section>
				<img src={readingBookSVG} alt="Person reading a book" />
				<h1 className="mt-20" style={{textAlign: 'center'}}>Welcome to Vibe Check!</h1>
				<p className="mt-10">Vibe check is your one stop shop to liase with fellow students to discuss  questions, queries, issues and suggestions about the courses they are studying.</p>
				
				<img className="mt-30" src={laptopSVG} alt="Laptop" />
				<h1 className="mt-30">What can you do on Vibe Check?</h1>
				<p className="mt-10">You can create your profile, make posts, reply to other posts, and edit your profile. <Link to="/profile">Get started</Link>.</p>
				<br />
			</section>
		</div>
	);
}

export default Home;
