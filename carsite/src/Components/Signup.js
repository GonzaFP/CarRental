import React from "react";
import "./Styles/signup.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
	const navigate = useNavigate();
	return (
		<div className="signupContainer">
			<h2>Create an account</h2>
			<form className="signupForm">
				<div className="name">
					<div className="firstname">
						<span>First name</span>
						<input type="text" />
					</div>
					<div className="lastname">
						<span>Last name</span>
						<input type="text" />
					</div>
				</div>

				<span className="driverName">
					Enter your name as it appears on your driver's license
				</span>

				<div className="mail">
					<span>Email</span>
					<input type="text" />
				</div>

				<div className="password">
					<span>Password</span>
					<input type="text" />
				</div>

				<div className="checkbox">
					<div className="check">
						<input type="checkbox" />
						<span>
							I agree to the{" "}
							<span className="terms">terms of service </span> and{" "}
							<span className="terms">privacy policy.</span>
						</span>
					</div>

					<div className="check">
						<input type="checkbox" />
						<span>Yes, send me deals, discounts, and updates!</span>
					</div>
				</div>

				<button>Sign up</button>
			</form>
			<div className="login">
				<p>Already have an account?</p>
				<button onClick={() => navigate("/signin")}>Log in</button>
			</div>
		</div>
	);
}

export default SignUp;
