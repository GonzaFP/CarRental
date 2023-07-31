import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import "./Styles/Account.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CloseModal from "./CloseModal";

function Accounts() {
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const { User } = useSelector((state) => state.mainReducer);

	const handleClick = () => {
		setOpenModal(true);
	};
	return (
		<div className="AccountContainer">
			{openModal ? (
				<CloseModal closeModal={setOpenModal} />
			) : (
				<div className="accountLeft">
					<h1>Account</h1>
					<div className="contactinfo sections">
						<h4 className="titles">Contact information</h4>

						<div className="contactOptions">
							<h5>Email</h5>
							<input
								type="email"
								value={User?.email}
								className="input"
							/>
							<span className="verified">
								<BsCheckCircle className="icon" /> verified{" "}
							</span>
							<h5>Password</h5>
							<button
								className="updateBtns"
								onClick={() => navigate("/changepassword")}>
								Update
							</button>
							<h5>Mobile Phone</h5>
							<button
								className="updateBtns"
								onClick={() => navigate("/mobilephone")}>
								Update
							</button>
							<h5>Mobile Notifications</h5>
							<input type="checkbox" className="checkbox" />
							<span>Enable text message notifications</span>
							<h5>Email Notifications</h5>
							<input type="checkbox" className="checkbox" />
							<span>Promotions and announcements</span>
							<div>
								<button className="purpleBtn">
									Save changes
								</button>
							</div>
						</div>
					</div>

					<div className="transmission sections">
						<h4 className="titles">Transmission</h4>
						<p>
							Some cars do not have automatic transmissions. Are
							you an expert at driving manual transmissions?
						</p>
						<div className="radio">
							<input type="radio" name="radio" />
							<span>Yes, I am an expert</span>
						</div>

						<div className="radio">
							<input type="radio" name="radio" />
							<span>No, I am not an expert</span>
						</div>

						<div>
							<button className="purpleBtn">Save changes</button>
						</div>
					</div>

					<div className="closeAccount">
						<h4 className="titles">Close account</h4>
						<button className="updateBtns" onClick={handleClick}>
							Close my account
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Accounts;
