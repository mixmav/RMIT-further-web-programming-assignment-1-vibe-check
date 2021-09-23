import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss';
import App from './App/App';

import reportWebVitals from './reportWebVitals';
import { PostDatastoreProvider } from 'Context/PostDatastoreContext';
import { UserDatastoreProvider } from 'Context/UserDatastoreContext';
import { AuthProvider } from 'Context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<PostDatastoreProvider>
			<UserDatastoreProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</UserDatastoreProvider>
		</PostDatastoreProvider>
	</React.StrictMode>,
	
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();