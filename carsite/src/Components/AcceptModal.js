import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useNavigate } from "react-router-dom";
import "./Styles/Modal.css";

function AcceptModal({ closeModal }) {
	const navigate = useNavigate();
	return (
		<div className="acceptBg">
			<ClearOutlinedIcon
				onClick={() => {
					closeModal(false);
					navigate("/");
				}}
				className="close"
			/>
			<div className="title">
				<h1>Send me deals, discounts and updates?</h1>
			</div>

			<div className="footerBtns">
				<button onClick={() => navigate("/")} id="decline">
					Decline
				</button>
				<button id="agree" onClick={() => navigate("/")}>
					Accept
				</button>
			</div>
		</div>
	);
}

export default AcceptModal;
