import React, { useState } from "react";
import "./Styles/ChangePassword.css";
import { Link, useNavigate } from "react-router-dom";

function ChangePassword() {
	const [className, setClassName] = useState("inactive");
	const navigate = useNavigate();
	const [disabled, setDisabled] = useState(true);
	const [CurrentPwd, setCurrentPwd] = useState("");
	const [newPwd, setNewPwd] = useState("");
	const [renterPwd, setRenterPwd] = useState("");

	return (
		<div className="changePwd">
			<h1>Change password </h1>
			<div>
				<h6>Current password</h6>
				<input type="password" name="CurrentPwd" />
				<Link to="/forgotpwd">Forgot your password?</Link>
			</div>

			<div>
				<h6>New password</h6>
				<input type="password" name="NewPwd" />
				<p>Your password must include at least 8 characters</p>
			</div>

			<div>
				<h6>Re-enter new password</h6>
				<input type="password" name="renterPwd" />
			</div>
			<div className="buttons">
				<button disabled={disabled} className={className}>
					Change password
				</button>
				<button id="cancel" onClick={() => navigate(-1)}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default ChangePassword;
