import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Profile.css";
import { BsCheckCircle } from "react-icons/bs";
import StarRating from "./StarRating";
import { Months } from "../Data/Months";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { auth } from "../Firebase/Firebase";

function Profile() {
	const { User, initials } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	const date = new Date(auth.currentUser.metadata.creationTime);
	const signupDate = `${Months[date.getMonth()]} ${date.getFullYear()}`;

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
						{User?.photo ? (
							<Avatar
								className="avatar"
								src={User?.photo}
								alt={User?.name}
								sx={{ width: 100, height: 100 }}
							/>
						) : (
							<div className="profiler">
								<Avatar
									className="avatar"
									sx={{
										bgcolor: deepPurple[500],
										width: 100,
										height: 100,
									}}>
									{initials && initials}
								</Avatar>
							</div>
						)}

						<h1>{User?.name}</h1>
					</div>
					<p className="date gray">{`Joined ${signupDate}`}</p>
					<p className="verifyInfo">Verified Info</p>
					<div className="verifyOption">
						<p>
							Approved to drive <span>?</span>
						</p>
						<Link to="/accounts">Verify ID</Link>
					</div>
					<div className="verifyOption">
						<p>Email address</p>

						<BsCheckCircle className="check" />
					</div>
					<div className="verifyOption">
						<p>Phone number</p>
						<Link to="/accounts">Verify phone number</Link>
					</div>
					<div className="verifyOption">
						<p>Facebook</p>
						<Link to="/accounts">Connect account</Link>
					</div>
					<p className="gray">
						Build trust with other users on CarRental by verifying
						your contact information.
					</p>

					{User?.location && (
						<div>
							<p className="verifyInfo">location</p>
							<p>{User?.location}</p>
						</div>
					)}
					{User?.work && (
						<div>
							<p className="verifyInfo">Work</p>
							<p>{User?.work}</p>
						</div>
					)}
					{User?.languages && (
						<div>
							<p className="verifyInfo">languages</p>
							<p>{User?.languages}</p>
						</div>
					)}
				</div>

				<div className="rightProfile">
					{User?.about && (
						<div>
							<p className="verifyInfo">About {User?.name}</p>
							<p>{User?.about}</p>
						</div>
					)}

					<p className="verifyInfo">Reviews from Hosts</p>
					<div className="reviewContainer">
						<div>
							<Avatar
								src=""
								alt=""
								className="icon"
								sx={{
									width: 80,
									height: 80,
								}}
							/>
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
