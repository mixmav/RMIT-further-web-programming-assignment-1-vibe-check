import { useUserUpdate } from 'Context/UserContext';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';

function Logout(){
	const updateUser = useUserUpdate();
	
	useEffect(() => {
		updateUser({authenticated: false});
	}, []); // Only run once.

	return(
		<div>
			<Redirect to="/"></Redirect>
		</div>
	);
}

export default Logout;