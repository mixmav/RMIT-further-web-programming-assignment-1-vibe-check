import { useAuthUpdate } from 'Context/AuthContext';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';

function Logout(){
	const updateAuth = useAuthUpdate();
	
	useEffect(() => {
		updateAuth({auth: false});
	}, [updateAuth]); // Only run once.

	return(
		<div>
			<Redirect to="/"></Redirect>
		</div>
	);
}

export default Logout;