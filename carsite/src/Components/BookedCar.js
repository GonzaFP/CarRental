import React from "react";
import "./Styles/BookedCar.css";

function BookedCar({ booking }) {
	const date = new Date(booking.created).toDateString();

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
							<small>{booking.created}</small>
						</strong>
					</p>
				</div>

				<div className="BookingAddress">
					<h4>Address</h4>
					<div className="AddressDetails">
						<p>Name: {booking.address.name}</p>
						<p>Email: {booking.email}</p>
						<p>Phone: {booking.address.phone}</p>
						<p>Address: {booking.address.address.line1}</p>
						<p>City: {booking.address.address.city}</p>
						<p>Country: {booking.address.address.country}</p>
					</div>
				</div>
			</div>

			<div className="BookedCarDetails">
				<h4>Trip details</h4>
				<div className="CarDetailsContainer">
					<div className="CarImageDetails">
						<img src={booking.car.image} />
					</div>
					<div className="CarDetails">
						<h5 id="title">{booking.car.title}</h5>
						<p>{`Pickup location: ${booking.car.location}`}</p>
						<p>{`Start date: ${booking.car.date1}`}</p>
						<p>{`End date: ${booking.car.date2}`}</p>
						<p>{`Number of days: ${booking.car.numberofDays}`}</p>
						<p>{`Price per day: $${booking.car.price}`}</p>
						<p>{`Total: $${booking.car.totalPrice}`}</p>
						<p>{`Host name: ${booking.car.host}`}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookedCar;
