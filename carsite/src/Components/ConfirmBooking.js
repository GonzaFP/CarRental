import React from "react";
import { useSelector } from "react-redux";
import {
	addDoc,
	collection,
	getDocs,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import "./Styles/ConfirmBooking.css";
import { Link, useNavigate } from "react-router-dom";

function BookedCar() {
	const navigate = useNavigate();
	const { BookedCar, User } = useSelector((state) => state.mainReducer);

	const {
		image,
		title,
		price,
		id,
		host,
		totalPrice,
		date2,
		date1,
		location,
		numberofDays,
	} = BookedCar || {};

	const startDate = new Date(date1).toDateString();
	const endDate = new Date(date2).toDateString();

	const handleCheckOut = () => {
		addDoc(collection(db, "BookedVehicles"), {
			car: BookedCar,
			status: "booked",
			uid: User?.id,
			sessionID: null,
			created: Date.now(),
			timestamp: serverTimestamp(),
			AmountPaid: 0,
		});

		fetch("http://localhost:4242/create-checkout-session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ car: BookedCar, uid: User?.id }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.url) {
					window.location.href = data.url;
				}
			})
			.catch((error) => console.log("checkout-error", error));
	};
	return (
		<div className="ConfirmSection">
			<div className="ConfirmContainer">
				<h2>Confirm your booking</h2>

				<div className="ConfirmTitles">
					<h3>Car</h3>
					<h3>Trip starts</h3>
					<h3>Trip ends</h3>
					<h3>Price</h3>
					<h3>Total</h3>
				</div>

				<div className="ConfirmBody">
					<div className="ConfirmCar">
						<Link to={`/cars/${id}`}>
							<img src={image} alt="booked car" />
							<h4>{title}</h4>
						</Link>
					</div>

					<p>{startDate}</p>

					<p>{endDate}</p>

					<p>{`$${price} / day`}</p>

					<p>{`$${totalPrice}`}</p>
				</div>

				<div className="ConfirmDetails">
					<h4>{`Number of days: ${numberofDays}`}</h4>
					<h4>{`Pickup location: ${location}`}</h4>
				</div>

				<form
					action="http://localhost:4242/create-checkout-session"
					method="POST"></form>

				<button onClick={handleCheckOut}>Check out</button>
			</div>
		</div>
	);
}

export default BookedCar;
