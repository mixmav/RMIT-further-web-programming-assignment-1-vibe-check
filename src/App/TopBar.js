import { Link } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';

function TopBar(){
	const auth = useAuth();

	return (
		<header className="top-bar-header">
			<Link to="/" className="heading"><img src="/img/logos/xhdpi.png" alt="App logo"/>Vibe Check</Link>

			{auth.auth && //Render only if the user is Authenticated
				<nav>
					<Link to="/profile">My profile</Link>
					<Link to="/logout">Logout</Link>
				</nav>
			}

			{!auth.auth && //Render only if the user is not Authenticated
				<nav>
					<Link to="/signup">Sign up</Link>
					<Link to="/signin">Sign in</Link>
				</nav>
			}
		</header>
	);
}


export default TopBar;