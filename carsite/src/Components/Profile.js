import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import "./Styles/Profile.css";
import StarRating from "./StarRating";

function Profile() {
	const navigate = useNavigate();
	return (
		<div className="profileContainer">
			<div className="edit">
				<button onClick={() => navigate("/editprofile")}>
					Edit profile
				</button>
			</div>

			<div className="profile">
				<div className="left">
					<AccountCircleOutlinedIcon className="icon" />
					<h1>Name</h1>
					<p className="date gray">Joined Jul 2023</p>
					<p className="verifyinfo">Verified Info</p>
					<div className="verify">
						<p>
							Approved to drive <span>?</span>
						</p>
						<Link to="/account">Verify ID</Link>
					</div>

					<div className="verify">
						<p>Email address</p>

						<BsCheckCircle className="check" />
					</div>

					<div className="verify">
						<p>Phone number</p>
						<Link to="/account">Verify phone number</Link>
					</div>

					<div className="verify">
						<p>Facebook</p>
						<Link to="/account">Connect account</Link>
					</div>
					<p className="gray">
						Build trust with other users on CarRental by verifying
						your contact information.
					</p>
				</div>

				<div className="right">
					<p className="verifyinfo">Reviews from Hosts</p>
					<div className="review">
						<div>
							<AccountCircleOutlinedIcon className="icon" />
						</div>
						<div>
							<StarRating />
							<p>No reviews yet</p>
							<p>
								Fiona hasn’t received a review on CarRental yet.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
