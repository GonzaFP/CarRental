import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./Styles/Modal.css";

function ResetPasswordModal({ closeModal }) {
	return (
		<div className="resetBg">
			<ClearOutlinedIcon
				className="close"
				onClick={() => closeModal(false)}
			/>
			<h3>Check your email for a link to reset the password.</h3>
		</div>
	);
}

export default ResetPasswordModal;
