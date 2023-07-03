import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SignIn.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import {
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";

function FirstSignup() {
	const navigate = useNavigate();

	const signUpFacebook = async () => {
		const provider = new FacebookAuthProvider();
		try {
			const { user } = signInWithPopup(auth, provider);
			console.log(user);
			navigate(-1);
		} catch (error) {
			console.log("facebook", error);
		}
	};
	const signUpGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider).then(async (result) => {
				const isNewUser = getAdditionalUserInfo(result).isNewUser;
				if (isNewUser) {
					navigate("/");
					console.log("this is the user", isNewUser);
				} else {
					console.log(result);
					alert("email already in use");
				}
			});
		} catch (error) {
			console.log("google", error);
		}
	};

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
				<button onClick={signUpGoogle}>
					<FcGoogle className="socials" />
					<span id="google">Continue with Google</span>
				</button>
			</div>
			<div>
				<button onClick={signUpFacebook}>
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
