import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SignIn.css";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";

function FirstSignup() {
	const navigate = useNavigate();

	return (
		<div className="other">
			<div>
				<button onClick={() => navigate("/signup")}>
					{" "}
					<span>
						<MdOutlineMail className="socials" />
					</span>
					Continue with Email
				</button>
			</div>

			<div>
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

			<div className="login">
				<p>Already have an account?</p>
				<button onClick={() => navigate("/signin")}>Log in</button>
			</div>
		</div>
	);
}

export default FirstSignup;
