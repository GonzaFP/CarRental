import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/SignIn.css";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
	const navigate = useNavigate();
	return (
		<div className="signin">
			<h1>Welcome back</h1>
			<form className="signinForm">
				<div className="email">
					<span>Email</span>
					<input type="email" placeholder="Email" />
				</div>
				<div className="pwd">
					<span>Password</span>
					<Link to="/forgotpwd" className="forgotPwd">
						Forgot your password?
					</Link>
					<input type="password" placeholder="Password" />
				</div>
				<button>Log in</button>
			</form>

			<div className="other">
				<span>or</span>
				<div className="buttons">
					<button>
						{" "}
						<span>
							<FaApple className="socials" />
						</span>
						Continue with Apple
					</button>
				</div>
				<div>
					<button>
						<FcGoogle className="socials" />
						<span id="google">Continue with Google</span>
					</button>
				</div>
				<div>
					<button>
						{" "}
						<span>
							<FaFacebook id="fb" className="socials" />
						</span>
						Continue with Facebook
					</button>
				</div>
			</div>

			<div className="other">
				<p>Don't have an account?</p>
				<div>
					<button onClick={() => navigate("/firstsignup")}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
