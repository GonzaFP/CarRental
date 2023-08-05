import React, { useRef, useState } from "react";
import { auth, storage } from "../Firebase/Firebase";
import {
	getDownloadURL,
	ref,
	uploadBytes,
	uploadBytesResumable,
	listAll,
	deleteObject,
} from "firebase/storage";

import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { uploadProfilePhoto } from "../Store/ReducerFunction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import "./Styles/Profile.css";
import StarRating from "./StarRating";

function EditProfile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { User, initials } = useSelector((state) => state.mainReducer);
	const [imageUpload, setImageUpload] = useState(null);
	const [isSaving, setSaving] = useState(false);
	const input = useRef(null);
	const uploadedImg = useRef(null);

	const UploadPhoto = () => {
		input.current.click();
	};

	const handleChange = (event) => {
		const photo = event.target.files[0];
		setImageUpload(photo);

		if (photo) {
			const reader = new FileReader();
			uploadedImg.current.file = photo;
			reader.onload = (e) => {
				uploadedImg.current.src = e.target.result;
			};

			reader.readAsDataURL(photo);
		}
	};

	const saveProfile = () => {
		if (imageUpload === null) return;

		//!create a reference to folder in firebase storage where the image will be stored.
		//! v4 generates random numbers which are attached to the image name in order the name maybe unique.
		const imageRef = ref(
			storage,
			`profilePhotos/${auth.currentUser.uid}/${imageUpload.name}`
		);

		//! delete previous profile photo from storage
		const listRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);
		listAll(listRef).then((response) => {
			response.items.forEach((itemRef) => {
				deleteObject(itemRef)
					.then(() => {
						console.log("item deleted");
					})
					.catch((error) => {
						console.log("delete error", error.code);
					});
			});
		});

		//!upload photo to firebase
		const uploadTask = uploadBytesResumable(imageRef, imageUpload);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				if (snapshot.state === "running") {
					setSaving(true);
				}
			},
			(error) => {
				console.log("upload error", error.code);
			},
			//! get the url and update state. set loading to true
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
					updateProfile(auth.currentUser, {
						photoURL: URL,
					})
						.then(() => {
							dispatch(
								uploadProfilePhoto(auth.currentUser.photoURL)
							);
							setSaving(false);
							navigate("/profile");
						})
						.catch((error) => {
							switch (error.code) {
								case "storage/object-not-found":
									console.log("File doesn't exist");
									break;

								case "storage/unauthorized":
									console.log(
										"User doesn't have permission to access the object"
									);
									break;

								case "storage/object-not-found":
									console.log("User canceled the upload");
									break;
							}
						});
				});
			}
		);
	};

	return (
		<div className="profileContainer">
			<div className="editBtn">
				<button
					onClick={saveProfile}
					disabled={isSaving}
					id={isSaving && "disableBtn"}>
					{isSaving ? "Saving" : "Save profile"}
				</button>
				<button onClick={() => navigate("/profile")}>Cancel</button>
			</div>

			<div className="profile editprofile">
				<div className="left">
					<div className="mainProfile">
						{!User ? (
							<AccountCircleOutlinedIcon className="icon" />
						) : User?.photo ? (
							<img
								src={User.photo}
								alt=""
								id="profilepic"
								ref={uploadedImg}
							/>
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
