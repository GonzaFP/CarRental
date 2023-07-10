import React, { useRef } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import "./Styles/Profile.css";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePhoto } from "../Store/ReducerFunction";

function EditProfile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { User } = useSelector((state) => state.mainReducer);
	const input = useRef(null);
	const UploadPhoto = () => {
		input.current.click();
	};
	const handleChange = (event) => {
		const photo = event.target.files[0];
		dispatch(
			uploadProfilePhoto({
				profilePhoto: photo,
			})
		);
	};
	console.log("this is the user", User);
	return (
		<div className="profileContainer">
			<div className="edit">
				<button>Save profile</button>
				<button onClick={() => navigate("/profile")} className="cancel">
					Cancel
				</button>
			</div>

			<div className="profile editprofile">
				<div className="left">
					<div className="changeprofile">
						<AccountCircleOutlinedIcon className="icon" />
						<div className="profileBtn">
							<button onClick={UploadPhoto}>
								Change profile photo
							</button>
							<input
								type="file"
								style={{ display: "none" }}
								ref={input}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="names">
						<p className="gray">
							Add a face to the name. It’ll help other hosts and
							guests recognize you at the beginning of a trip.
						</p>

						<h1>Name</h1>
					</div>

					<p className="verifyinfo">Lives</p>

					<input type="text" placeholder="Paris, France" />
					<p className="gray">Joined Jul 2023</p>
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

					<p className="verifyinfo">Languages</p>
					<input type="text" />
					<p className="verifyinfo">Works</p>
					<input type="text" />
					<p className="verifyinfo">School</p>
					<input type="text" />
				</div>

				<div className="right">
					<p className="verifyinfo">About Fiona</p>
					<p className="textareaLabel">
						Tell hosts and guests about yourself and why you’re a
						responsible, trustworthy person. Share your favorite
						travel experiences, your hobbies, your dream car, or
						your driving experience.{" "}
					</p>
					<textarea />
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

export default EditProfile;
