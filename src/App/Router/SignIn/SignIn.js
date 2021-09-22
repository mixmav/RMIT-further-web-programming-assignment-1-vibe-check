import './SignIn.scss';

function SignIn() {
	return (
		<div className="router-page-signin-container">
			<span>
				<h1>Sign in</h1>
				<form>
					<input className="text-input full-width" type="email" name="email" placeholder="Email" required autoFocus />
					<input className="text-input full-width mt-10" type="password" name="password" placeholder="Password" required />
					<button className="btn full-width mt-20"><i className="fa fa-sign-in-alt"></i>Sign in</button>
				</form>
			</span>
		</div>
	);
}

export default SignIn;
