import React, { useEffect, useState } from "react";
import "./Styles/CheckOut.css";
import { db } from "../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
	collection,
	orderBy,
	getDocs,
	query,
	where,
	limit,
	updateDoc,
} from "firebase/firestore";

import { updateBookedTrips } from "../Store/ReducerFunction";

function CheckOutMessage({ session_id }) {
	const { User, BookedTrips } = useSelector((state) => state.mainReducer);

	const dispatch = useDispatch();
	const {
		car: { price, date2, date1, host, id },
	} = BookedTrips[0] || {};
	const cancelFee = 0.2 * price;

	useEffect(() => {
		if (User && BookedTrips) {
			const newData = BookedTrips[0];
			const profileQuery = query(
				collection(db, "BookedVehicles"),
				where("car.id", "==", newData?.car.id)
			);
			getDocs(profileQuery).then((response) => {
				response.forEach((doc) => {
					updateDoc(doc.ref, {
						sessionID: session_id,
					});
				});
			});

			dispatch(
				updateBookedTrips({
					type: "sessionID",
					value: {
						sessionID: session_id,
						id: id,
					},
				})
			);
		}
	}, []);

	return (
		<div className="CheckSuccessContainer">
			<h1>Your card has been saved successfully</h1>
			<p>
				{`${host}, your host will contact you a few hours before the trip.`}
			</p>

			<div className="termsConditions">
				<h3>Please note the following : </h3>

				<ul>
					<li>{`You will not be charged until ${date1}. If you cancel your trip before then, you will not be charged. Otherwise you will be charged $${cancelFee}`}</li>
					<li>{`If you return the car later than ${date2}, you will be charged $150 per day.`}</li>
					<li>{`Our insurance policy does not cover accidents caused by reckless or drunken driving.`}</li>
					<li>{`Clean the car before returning it.`}</li>
					<li>{`Some hosts will have guidelines to follow. Please follow them.`}</li>
				</ul>
				<p>
					For more information, call our customer care line at (000)
					000 0000 0000
				</p>
			</div>
		</div>
	);
}

export default CheckOutMessage;
