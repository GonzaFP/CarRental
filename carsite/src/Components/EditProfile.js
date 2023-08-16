import React, { useRef, useState } from "react";
import { auth, db, storage } from "../Firebase/Firebase";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import {
	getDownloadURL,
	ref,
	uploadBytes,
	uploadBytesResumable,
	listAll,
	deleteObject,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { updateUser } from "../Store/ReducerFunction";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import "./Styles/Profile.css";
import StarRating from "./StarRating";
import {
	collection,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import UpdateProfilePicture from "./UpdateProfilePicture";

function EditProfile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { User, initials } = useSelector((state) => state.mainReducer);

	const {
		id,
		name,
		email,
		photo,
		agreedToTerms,
		sendNotification,
		location,
		work,
		school,
		about,
		languages,
	} = User;

	//!state
	const [imageUpload, setImageUpload] = useState(null);
	const [isSaving, setSaving] = useState(false);
	const [userProfile, setUserProfile] = useState({
		id: id,
		name: name,
		email: email,
		photo: photo,
		agreedToTerms: agreedToTerms,
		sendNotification: sendNotification,
		location: location === undefined ? "" : location,
		canDrive: false,
		languages: languages === undefined ? "" : languages,
		work: work === undefined ? "" : work,
		school: school === undefined ? "" : school,
		about: about === undefined ? "" : about,
	});

	//!refs
	const uploadedImg = useRef(null);

	//!event handlers
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserProfile((profile) => {
			return {
				...profile,
				[name]: value,
			};
		});
	};

	const saveProfile = () => {
		//! save data to database, then save it in global state.
		const profileQuery = query(
			collection(db, "users"),
			where("user.id", "==", id)
		);
		getDocs(profileQuery).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				updateDoc(doc.ref, {
					user: userProfile,
				});
				dispatch(updateUser(userProfile));
				console.log("document updated.");
			});
			navigate("/profile");
		});
	};

	return (
		<div className="profileContainer">
			<div className="editBtn">
				<button onClick={saveProfile} id={isSaving && "disableBtn"}>
					Save profile
				</button>

				<button onClick={() => navigate("/profile")}>Cancel</button>
			</div>

			<div className="profile editprofile">
				<div className="left">
					<div className="mainProfile">
						<UpdateProfilePicture
							setUserProfile={setUserProfile}
							userProfile={userProfile}
						/>

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
					<input
						type="text"
						placeholder="Paris, France"
						name="location"
						value={userProfile?.location}
						onChange={handleChange}
					/>

					<p className="gray">Joined Jul 2023</p>
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

					<p className="verifyInfo">Languages</p>
					<input
						type="text"
						name="languages"
						value={userProfile?.languages}
						onChange={handleChange}
					/>
					<p className="verifyInfo">Works</p>
					<input
						type="text"
						name="work"
						value={userProfile?.work}
						onChange={handleChange}
					/>
				</div>

				<div className="right">
					<p className="verifyInfo">{`About ${User?.name}`}</p>
					<p className="textareaLabel">
						Tell hosts and guests about yourself and why you’re a
						responsible, trustworthy person. Share your favorite
						travel experiences, your hobbies, your dream car, or
						your driving experience.{" "}
					</p>
					<textarea
						value={userProfile?.about}
						name="about"
						onChange={handleChange}
					/>
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

export default EditProfile;
