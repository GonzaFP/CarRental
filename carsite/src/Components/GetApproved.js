import React, { useEffect, useMemo, useRef, useState } from "react";
import { db } from "../Firebase/Firebase";
import "./Styles/Approved.css";
import { updateUser, setLicenseInfo } from "../Store/ReducerFunction";
import SelectCountry from "./SelectCountry";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	addDoc,
	collection,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import UpdateProfilePicture from "./UpdateProfilePicture";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { licenseSchema } from "../Features/Schema";

function GetApproved() {
	const { User, licenseInfo } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nameArray = User?.name.split(" ");

	// !state and refs
	const [userProfile, setUserProfile] = useState(User);
	const photoRef = useRef(null);
	const driverRef = useRef(null);
	const [photoSaved, setPhotoSaved] = useState(false);

	const {
		firstName,
		lastName,
		middleName,
		licenseNumber,
		ExpirationDate,
		country,
	} = licenseInfo || {};
	const [userInfo, setUserInfo] = useState({
		firstName: firstName || nameArray[0],
		lastName: lastName || nameArray[1],
		middleName: middleName || "",
		country,
		licenseNumber,
		ExpirationDate,
	});

	// !end of states

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(licenseSchema),
	});

	useEffect(() => {
		if (User?.photo !== null) {
			setPhotoSaved(true);
			driverRef.current.style.display = "block";
		}
	}, []);

	// !event handlers

	// ! collecting licence info
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserInfo((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const saveProfile = () => {
		if (userProfile?.photo === null) return;
		//! save data to database, then save it in global state.
		dispatch(updateUser(userProfile));
		setPhotoSaved(true);
		driverRef.current.style.display = "block";
	};

	const handleSaveLicense = async () => {
		if (User?.approvedToDrive === false) {
			const profileQuery = query(
				collection(db, "users"),
				where("Profile.id", "==", User?.id)
			);

			getDocs(profileQuery).then((response) => {
				response.forEach((doc) => {
					console.log("doc", doc.data());
					updateDoc(doc.ref, {
						License: userInfo,
						Profile: userProfile,
						"Profile.approvedToDrive": true,
					});
				});
			});
			dispatch(setLicenseInfo(userInfo));
			driverRef.current.style.display = "none";
			navigate("/confirmbooking");
		}
	};

	// !end of event handlers

	return (
		<div className="approvedContainer">
			<div className="approvedTitle">
				<h1>Get approved to drive</h1>
			</div>

			<div className="approvedBody">
				<div className="approvedClass">
					<h3>Verify your email</h3>
					<AiOutlineCheckCircle className="approveIcon" />
				</div>

				<div className="photoClass">
					{User?.photo !== null && photoSaved ? (
						<div className="approvedClass">
							<h3>Profile photo</h3>
							<AiOutlineCheckCircle className="approveIcon" />
						</div>
					) : (
						<div className="profilePhoto">
							<h3>Profile photo</h3>
							<div ref={photoRef} className="updateProfile">
								<p>
									Please provide a clear photo of your face so
									your hosts can recognize you.
								</p>

								<UpdateProfilePicture
									userProfile={userProfile}
									setUserProfile={setUserProfile}
									className="updateProfile"
								/>
								<button onClick={saveProfile}>
									Save profile
								</button>
							</div>
						</div>
					)}
				</div>

				<div className="driverLicense">
					<h3>Driver's license</h3>
					<div className="content" ref={driverRef}>
						<p>
							Enter your info exactly as it appears on your
							license so we can verify your eligibility to drive.
						</p>
						<p>
							Hosts see your name and date of birth after you book
							a trip; the rest stays private.
						</p>

						<div>
							<form onSubmit={handleSubmit(handleSaveLicense)}>
								<div className="driverNames">
									<div>
										<h3>First name</h3>
										<input
											type="text"
											name="firstName"
											value={userInfo?.firstName}
											{...register("firstName")}
											onChange={handleChange}
										/>
										<p className="errors">
											{errors.firstName?.message}
										</p>
									</div>

									<div>
										<h3>Middle name</h3>
										<input
											type="text"
											name="middleName"
											value={userInfo?.middleName}
											onChange={handleChange}
										/>
									</div>

									<div>
										<h3>Last name</h3>
										<input
											type="text"
											name="lastName"
											value={userInfo?.lastName}
											{...register("lastName")}
											onChange={handleChange}
										/>

										<p className="errors">
											{errors.lastName?.message}
										</p>
									</div>
								</div>

								<div className="country">
									<h3>Country</h3>
									<div>
										<SelectCountry
											userInfo={userInfo}
											setUserInfo={setUserInfo}
										/>
									</div>
								</div>

								<div className="dates">
									<h3>License number</h3>
									<input
										type="text"
										name="licenseNumber"
										value={userInfo?.licenseNumber}
										{...register("licenseNumber")}
										onChange={handleChange}
									/>

									<p className="errors">
										{errors.licenseNumber?.message}
									</p>
								</div>

								<div className="dates">
									<h3>Expiration date</h3>
									<input
										type="date"
										name="ExpirationDate"
										value={userInfo?.ExpirationDate}
										{...register("ExpirationDate")}
										onChange={handleChange}
									/>
									<p className="errors">
										{errors.ExpirationDate?.message}
									</p>
								</div>

								<p>
									By clicking Save and continue below, you
									agree to our terms and conditions.
								</p>
								<div>
									<button type="submit">
										Save and Continue
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GetApproved;
