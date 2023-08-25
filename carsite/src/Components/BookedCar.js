import React, { useState } from "react";
import "./Styles/BookedCar.css";
import { useSelector } from "react-redux";

function BookedCar({
	booking,
	setShowCancel,
	setCancelPrice,
	setSessionID,
	setCarID,
	setCreated,
}) {
	const date = new Date(booking.created).toDateString();
	const { User } = useSelector((state) => state.mainReducer);
	const { billingAddress, email } = User || {};

	const {
		created,
		status,
		AmountPaid,
		car: {
			id,
			date1,
			date2,
			host,
			image,
			location,
			numberofDays,
			price,
			title,
			totalPrice,
		},
	} = booking || {};
	// const {
	// 	name,
	// 	phone,
	// 	address: { city, country, line1 },
	// } = billingAddress || {};

	const handleCancelBooking = () => {
		const totalCancelPrice = 0.2 * price;
		setShowCancel(true);
		setCancelPrice(totalCancelPrice);
		setSessionID(booking.sessionID);
		setCarID(id);
		setCreated(created);
	};
	return (
		<div className="BookedCarContainer">
			<div className="BookingDetails">
				<div className="BookId">
					<p>
						Date created: <strong>{date}</strong>
					</p>

					<p>
						Booking Id:{" "}
						<strong>
							<small>{created}</small>
						</strong>
					</p>
				</div>

				<div className="BookingAddress">
					<h4>Address</h4>
					<div className="AddressDetails">
						{/* <p>Name: {name}</p> */}
						<p>Email: {email}</p>
						{/* <p>Phone: {phone}</p> */}
						{/* <p>Address: {line1}</p> */}
						{/* <p>City: {city}</p> */}
						{/* <p>Country: {country}</p> */}
					</div>
				</div>
			</div>

			<div className="BookedCarDetails">
				<h4>Trip details</h4>
				<div className="CarDetailsContainer">
					<div className="CarImageDetails">
						<img src={image} />
					</div>
					<div className="CarDetails">
						<h5 id="title">{title}</h5>
						<p className="overdue">{`Status: ${status}`}</p>
						<p>{`Pickup location: ${location}`}</p>
						<p>{`Start date: ${date1}`}</p>
						<p>{`End date: ${date2}`}</p>
						<p>{`Number of days: ${numberofDays}`}</p>
						<p>{`Price per day: $${price}`}</p>
						<p>{`Total: $${totalPrice}`}</p>
						<p>{`Amount paid: $${AmountPaid}`}</p>
						<p>{`Host name: ${host}`}</p>

						<button
							disabled={status === "cancelled"}
							className={
								status === "cancelled"
									? `disabledBtn cancelBooking`
									: "cancelBooking"
							}
							onClick={handleCancelBooking}>
							Cancel Booking
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookedCar;

/*
	! After start date, charge cancellation fee.
	!code for real life scenario where actual dates are used

	*/
// useEffect(() => {
// 	const currentDate = new Date()
// 	const startDate = booking.car.date1
// 	const isAfter = startDate < currentDate
// if (isCancel){
// 	return
// }else{
// 	if (isAfter){
// 		setChargeExtra(true);
// 	}else{
// 		setChargeExtra(false);
// 	}
// }
// 	cancelBooking();
// }, []);
