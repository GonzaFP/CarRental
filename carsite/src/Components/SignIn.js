import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/SignIn.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../Firebase/Firebase";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	getAdditionalUserInfo,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Features/Schema";
import SignModal from "./SignModal";
import { getInitials, login } from "../Store/ReducerFunction";
import { useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";

function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [notify, setNotify] = useState(false);
	const [isNewUser, setNewUser] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			//! Inside the database, create a document containing the user's profile.

			const profileQuery = query(
				collection(db, "users"),
				where("Profile.id", "==", user.uid)
			);
			getDocs(profileQuery).then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					dispatch(login(doc.data().Profile));
				});
			});

			dispatch(getInitials(user.displayName));
			navigate(-1);
		} catch (error) {
			setErrorMessage(error.code);
			console.log("signin error", error);
		}
	};

	const signInGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const user = auth.currentUser;
		try {
			await signInWithPopup(auth, provider).then(async (result) => {
				const isNewUser = getAdditionalUserInfo(result).isNewUser;
				if (isNewUser) {
					setOpenModal(true);
					setNewUser(isNewUser);
				} else {
					setNewUser(false);
					dispatch(
						login({
							name: user.displayName,
							email: user.email,
							id: user.uid,
							photo: user.photoURL,
						})
					);
					dispatch(getInitials(user.displayName));
				}
			});
		} catch (error) {
			console.log("google", error);
		}
		navigate(-1);
	};

	return (
		<div className="signin">
			{openModal ? (
				<SignModal
					closeModal={setOpenModal}
					user={isNewUser}
					openModal={openModal}
				/>
			) : (
				<>
					<h1>Welcome back</h1>
					{errorMessage && (
						<span className="error">{errorMessage}</span>
					)}
					<form className="signinForm">
						<div className="email">
							<span>Email</span>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<span className="error">
								{errors.email?.message}
							</span>
						</div>

						<div className="pwd">
							<span>Password</span>
							<Link to="/forgotpwd" className="forgotPwd">
								Forgot your password?
							</Link>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span className="error">
								{errors.password?.message}
							</span>
						</div>
						<button onClick={handleSignIn}>Log in</button>
					</form>

					<div className="other">
						<span>or</span>
						<div>
							<button onClick={signInGoogle}>
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
				</>
			)}
		</div>
	);
}

export default SignIn;

//
// const result = await signInWithPopup(auth, provider);
// console.log(result);
// const token = result._tokenResponse.idToken;
// console.log(token);
// const credential = GoogleAuthProvider.credential({
// 	accessToken: token,
// });
// const response = await signInWithCredential(credential);
// console.log(response);
