import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import "./Styles/Profile.css";
import StarRating from "./StarRating";
import { useSelector } from "react-redux";

function Profile() {
	const { User, initials } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	return (
		<div className="profileContainer">
			<div className="editBtn">
				<button onClick={() => navigate("/editprofile")}>
					Edit profile
				</button>
			</div>

			<div className="profile">
				<div className="leftProfile">
					<div className="mainProfile">
						{!User ? (
							<AccountCircleOutlinedIcon className="icon" />
						) : User?.photo ? (
							<img src={User.photo} alt="" id="profilepic" />
						) : (
							<div className="profiler">
								{initials && initials}
							</div>
						)}

						<h1>{User?.name}</h1>
					</div>
					<p className="date gray">Joined Jul 2023</p>
					<p className="verifyInfo">Verified Info</p>
					<div className="verifyOption">
						<p>
							Approved to drive <span>?</span>
						</p>
						<Link to="/account">Verify ID</Link>
					</div>

					<div className="verifyOption">
						<p>Email address</p>

						<BsCheckCircle className="check" />
					</div>

					<div className="verifyOption">
						<p>Phone number</p>
						<Link to="/account">Verify phone number</Link>
					</div>

					<div className="verifyOption">
						<p>Facebook</p>
						<Link to="/account">Connect account</Link>
					</div>
					<p className="gray">
						Build trust with other users on CarRental by verifying
						your contact information.
					</p>
				</div>

				<div className="rightProfile">
					<p className="verifyInfo">Reviews from Hosts</p>
					<div className="reviewContainer">
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
