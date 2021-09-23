import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';
import Posts from './Posts/Posts';

function RouterSwitch(){
	return (
		<Switch>
			<Route path="/signin">
				<SignIn />
			</Route>
			<Route path="/signup">
				<SignUp />
			</Route>
			<Route path="/logout">
				<Logout />
			</Route>
			<Route path="/profile">
				<Profile />
			</Route>
			<Route path="/posts">
				<Posts />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
}

export default RouterSwitch;