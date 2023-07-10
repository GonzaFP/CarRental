import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AcceptModal from "./AcceptModal";
import "./Styles/Modal.css";
import { deleteUser } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/ReducerFunction";

function SignModal({ closeModal, user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { User } = useSelector((state) => state.mainReducer);
	const [agree, setAgree] = useState("");
	const [open, setOpen] = useState(false);
	const currentUser = auth.currentUser;
	const actionCodeSettings = {
		url: "http://localhost:3000",
		handleCodeInApp: false,
	};

	const handleUser = () => {
		if (user === true && agree === false) {
			deleteUser(currentUser).then(() => {
				console.log("user deleted");
				return;
			});
		} else {
			console.log("email verified", currentUser);
			sendEmailVerification(currentUser, actionCodeSettings);
			dispatch(
				login({
					name: currentUser.displayName,
					email: currentUser.email,
					id: currentUser.uid,
					sendNotification: false,
					agreedToTerms: true,
				})
			);
			setOpen(true);
		}
	};
	console.log("user in state", User);
	return (
		<>
			{open ? (
				<AcceptModal closeModal={closeModal} />
			) : (
				<div className="modalBg">
					<div>
						<ClearOutlinedIcon
							onClick={() => {
								closeModal(false);
								setAgree(false);
								handleUser();
							}}
							className="close"
						/>
						<div className="title">
							<h1>Create an account?</h1>
						</div>
						<div className="body">
							<p>
								To join the CarRental sharing community and book
								cars from the marketplace, you must agree to the
								terms of service, privacy policy, and
								nondiscrimination policy.
							</p>
						</div>

						<div className="links">
							<p>Terms of service</p>
							<p>Privacy policy</p>
							<p>Nondiscrimination policy</p>
						</div>
						<div className="footerBtns">
							<button
								onClick={() => {
									closeModal(false);
									setAgree(false);
									handleUser();
								}}
								id="decline">
								Decline
							</button>

							<button
								id="agree"
								onClick={() => {
									setAgree(true);
									handleUser();
								}}>
								Accept
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default SignModal;
