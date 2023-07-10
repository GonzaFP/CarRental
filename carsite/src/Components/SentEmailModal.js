import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./Styles/Modal.css";

function SentEmailModal({ closeModal, message }) {
	return (
		<div className="resetBg">
			<ClearOutlinedIcon
				className="close"
				onClick={() => closeModal(false)}
			/>
			<h3>{message}</h3>
		</div>
	);
}

export default SentEmailModal;
