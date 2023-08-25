import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverFetcher } from "../../fetcher";
import Spinner from "../Spinner";
import UserProfile from "./UserProfile";

function EachUser() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [user, setUser] = useState();
	const [license, setLicense] = useState();
	const [userCars, setUserCars] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetchUserProfile = async () => {
			const userProfile = await serverFetcher("get-a-user", {
				uid: params.uid,
			});

			const userBookedCars = await serverFetcher("get-booked-cars", {
				uid: params.uid,
			});

			setUser(userProfile.profile.Profile);
			setLicense(userProfile.profile.License);
			setUserCars(userBookedCars.bookedCars);
		};
		fetchUserProfile();
		setLoading(false);
	}, [params.uid]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<UserProfile
					user={user}
					license={license}
					userCars={userCars}
				/>
			)}
		</>
	);
}

export default EachUser;
