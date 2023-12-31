import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useNavigate } from "react-router-dom";
import "./Styles/Modal.css";
import { notify } from "../Store/ReducerFunction";
import SentEmailModal from "./SentEmailModal";
import { auth } from "../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";

function AcceptModal({ closeModal }) {
	const dispatch = useDispatch();
	const { User } = useSelector((state) => state.mainReducer);
	const [nextModal, setNextModal] = useState(false);
	const message = "Verify your email by clicking on the link sent to it.";

	const sendNotification = () => {
		dispatch(
			notify({
				sendNotification: true,
			})
		);
	};

	console.log("updated user is", User);
	return (
		<div className="AllModalContainer">
			{nextModal ? (
				<SentEmailModal closeModal={closeModal} message={message} />
			) : (
				<div className="acceptBg">
					<ClearOutlinedIcon
						onClick={() => {
							setNextModal(true);
						}}
						className="closeAccept"
					/>
					<div className="acceptTitle">
						<h1>Send me deals, discounts and updates?</h1>
					</div>

					<div className="acceptFooterBtns">
						<button
							onClick={() => {
								setNextModal(true);
							}}
							id="decline">
							Decline
						</button>

						<button
							id="agree"
							onClick={() => {
								setNextModal(true);
								sendNotification(true);
							}}>
							Accept
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AcceptModal;
