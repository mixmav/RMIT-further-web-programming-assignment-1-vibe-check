import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";


import './App.scss';

function App() {
	return (
		<div className="app-container">
			<header>
				<h1>Vibe Check</h1>
			</header>
			
			<section>
				<button className="btn mt-10"><i className="fa fa-coffee"></i>Hi</button>
			</section>

			<footer>

			</footer>
		</div>
	);
}

export default App;