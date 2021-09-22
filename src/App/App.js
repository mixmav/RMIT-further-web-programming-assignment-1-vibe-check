import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';

import RouterSwitch from './Router/RouterSwitch';
import TopBar  from "./TopBar";


function App() {
	return (
		<div className="app-container">
			<Router>
				<TopBar />
				
				<section className="router-container">
					<RouterSwitch />
				</section>

				<footer className="footer">
					&copy; Vibe Check, {new Date().getFullYear()}
				</footer>
			</Router>
		</div>
	);
}

export default App;