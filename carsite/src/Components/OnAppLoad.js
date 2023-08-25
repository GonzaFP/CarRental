import React from "react";
import {
	collection,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";

import {
	AddToBookedTrips,
	getInitials,
	login,
	logout,
} from "./Store/ReducerFunction";
import { useDispatch } from "react-redux";
import { auth, db } from "./Firebase/Firebase";

function OnAppLoad() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authuser) => {
			if (authuser) {
				const profileQuery = query(
					collection(db, "users"),
					where("Profile.id", "==", authuser.uid)
				);
				getDocs(profileQuery).then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						dispatch(login(doc.data().Profile));
					});
				});
				dispatch(getInitials(authuser.displayName));

				// !get booked trips

				const getBookedCar = async () => {
					await getDocs(
						query(
							collection(db, "BookedVehicles"),
							where("uid", "==", authuser.uid),
							orderBy("timestamp", "desc")
						)
					).then((response) => {
						const newData = response.docs.map((doc) => {
							return doc.data();
						});

						dispatch(AddToBookedTrips(newData));
					});
				};
				getBookedCar();
			} else {
				dispatch(logout());
			}
		});
		return () => unsubscribe();
	}, []);

	return <div>OnAppLoad</div>;
}

export default OnAppLoad;
