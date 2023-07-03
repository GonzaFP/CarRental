import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AcceptModal from "./AcceptModal";
import "./Styles/Modal.css";
import { deleteUser } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

function SignModal({ closeModal, user }) {
	const navigate = useNavigate();
	const [agree, setAgree] = useState(false);
	const currentUser = auth.currentUser;
	const DeleteUser = async () => {
		console.log("agree", agree);
		console.log("current user", currentUser);
		if (user === true && agree === false) {
			deleteUser(currentUser).then(() => {
				console.log("user deleted");
				return;
			});
		} else {
			navigate("/");
		}
	};
	return (
		<>
			{agree ? (
				<AcceptModal closeModal={closeModal} />
			) : (
				<div className="modalBg">
					<div>
						<ClearOutlinedIcon
							onClick={() => {
								closeModal(false);
								DeleteUser();
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
									DeleteUser();
								}}
								id="decline">
								Decline
							</button>
							<button
								id="agree"
								onClick={() => {
									setAgree(true);
									setAgree(true);
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
