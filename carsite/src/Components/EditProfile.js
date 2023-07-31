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
	const { User, initials } = useSelector((state) => state.mainReducer);
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

	return (
		<div className="profileContainer">
			<div className="editBtn">
				<button>Save profile</button>
				<button onClick={() => navigate("/profile")} className="cancel">
					Cancel
				</button>
			</div>

			<div className="profile editprofile">
				<div className="left">
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

						<div className="names">
							<p className="gray">
								Add a face to the name. It’ll help other hosts
								and guests recognize you at the beginning of a
								trip.
							</p>
						</div>
						<h1>{User?.name}</h1>
					</div>
					<p className="verifyInfo">Lives</p>

					<input type="text" placeholder="Paris, France" />
					<p className="gray">Joined Jul 2023</p>
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

					<p className="verifyInfo">Languages</p>
					<input type="text" />
					<p className="verifyInfo">Works</p>
					<input type="text" />
					<p className="verifyInfo">School</p>
					<input type="text" />
				</div>

				<div className="right">
					<p className="verifyInfo">About {User?.name}</p>
					<p className="textareaLabel">
						Tell hosts and guests about yourself and why you’re a
						responsible, trustworthy person. Share your favorite
						travel experiences, your hobbies, your dream car, or
						your driving experience.{" "}
					</p>
					<textarea />
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

export default EditProfile;
