import React, { useState } from "react";
import "./Styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
	const [className, setClassName] = useState("inactive");
	const [disabled, setDisabled] = useState(true);
	const navigate = useNavigate();

	const handleChange = (event) => {
		if (event.target.value.trim() !== "") {
			setDisabled(false);
			setClassName("active");
			return;
		}
		setDisabled(true);
		setClassName("inactive");
	};
	return (
		<div className="resetContainer">
			<h1>Reset Password</h1>
			<div className="setemail">
				<span>Email</span>
				<input type="email" onChange={handleChange} />
			</div>
			<div>
				<button id="reset" disabled={disabled} className={className}>
					Reset Password
				</button>
				<button id="back" onClick={() => navigate(-1)}>
					{" "}
					Back
				</button>
			</div>
		</div>
	);
}

export default ForgotPassword;
