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
import { updateProfile } from "firebase/auth";
import { uploadProfilePhoto } from "../Store/ReducerFunction";
import { useDispatch, useSelector } from "react-redux";

function UpdateProfilePicture({ setUserProfile, userProfile }) {
	const dispatch = useDispatch();
	const { initials } = useSelector((state) => state.mainReducer);
	const [imageUpload, setImageUpload] = useState(null);
	const [isSaving, setSaving] = useState(false);

	//!refs
	const input = useRef(null);
	const uploadedImg = useRef(null);

	const UploadPhoto = () => {
		input.current.click();
	};

	const handlePhotoChange = (event) => {
		const photo = event.target.files[0];
		setImageUpload(photo);

		if (photo) {
			const reader = new FileReader();
			uploadedImg.current.file = photo;
			reader.onload = (e) => {
				uploadedImg.current.src = e.target.result;
			};
			reader.readAsDataURL(photo);

			//!create a reference to the folder in firebase storage where the image will be stored.
			const imageRef = ref(
				storage,
				`profilePhotos/${auth.currentUser.uid}/${photo.name}`
			);

			//! delete previous profile photo from storage.
			const listRef = ref(
				storage,
				`profilePhotos/${auth.currentUser.uid}`
			);
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

			//!upload new photo to firebase storage.
			const uploadTask = uploadBytesResumable(imageRef, photo);
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
					getDownloadURL(uploadTask.snapshot.ref)
						.then((URL) => {
							//! update userProfile local state
							setUserProfile((profile) => {
								return {
									...profile,
									photo: URL,
								};
							});

							dispatch(uploadProfilePhoto(URL));
							//! update the photoURL of auth user
							updateProfile(auth.currentUser, {
								photoURL: URL,
							}).then(() => {
								setSaving(false);
							});
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
				}
			);
		}
	};

	return (
		<div>
			<div>
				{userProfile?.photo !== null ? (
					<Avatar
						src={userProfile?.photo}
						alt={userProfile?.photo}
						ref={uploadedImg}
						sx={{
							width: 100,
							height: 100,
						}}
						className="avatar"
					/>
				) : (
					<div className="profiler" ref={uploadedImg}>
						<Avatar
							sx={{
								bgcolor: deepPurple[500],
								width: 100,
								height: 100,
							}}
							className="avatar"
							ref={uploadedImg}>
							{initials && initials}
						</Avatar>
					</div>
				)}
			</div>

			<div className="profileBtn">
				<button onClick={UploadPhoto} disabled={isSaving}>
					{isSaving ? "Uploading" : "Change profile photo"}
				</button>
				<input
					type="file"
					style={{ display: "none" }}
					ref={input}
					onChange={handlePhotoChange}
				/>
			</div>
		</div>
	);
}

export default UpdateProfilePicture;
