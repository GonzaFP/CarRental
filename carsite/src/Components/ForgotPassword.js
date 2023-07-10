import React, { useState } from "react";
import "./Styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import SentEmailModal from "./SentEmailModal";

function ForgotPassword() {
	const [className, setClassName] = useState("inactive");
	const [disabled, setDisabled] = useState(true);
	const [resetModal, setResetModal] = useState(false);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const message = "Check your email for a link to reset the password.";
	const handleChange = (event) => {
		if (event.target.value.trim() !== "") {
			setDisabled(false);
			setClassName("active");
			setEmail(event.target.value);
			return;
		}
		setDisabled(true);
		setClassName("inactive");
	};
	const actionCodeSettings = {
		url: "http://localhost:3000/signin",
		handleCodeInApp: false,
	};
	const handlePassword = () => {
		sendPasswordResetEmail(auth, email, actionCodeSettings)
			.then(() => {
				setResetModal(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	return (
		<>
			{resetModal ? (
				<SentEmailModal closeModal={setResetModal} message={message} />
			) : (
				<div className="resetContainer">
					<h1>Reset Password</h1>
					<div className="setemail">
						<span>Email</span>
						<input
							type="email"
							onChange={handleChange}
							value={email}
						/>
					</div>
					<div>
						<button
							id="reset"
							disabled={disabled}
							className={className}
							onClick={handlePassword}>
							Reset Password
						</button>
						<button id="back" onClick={() => navigate(-1)}>
							{" "}
							Back
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default ForgotPassword;
