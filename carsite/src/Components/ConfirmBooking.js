import React from "react";
import { useSelector } from "react-redux";
import "./Styles/ConfirmBooking.css";
import { Link, useNavigate } from "react-router-dom";

function BookedCar() {
	const navigate = useNavigate();
	const { searchQuery, BookedCar } = useSelector(
		(state) => state.mainReducer
	);

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

	const handleProceed = () => {
		navigate("/paymentform", { replace: true });
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

				<div className="termsConditions">
					<h3>Terms and conditions</h3>

					<ul>
						<li>{`If you return the car later than ${date1}, you will be charged $150 per day.`}</li>
						<li>{`Our insurance policy does not cover accidents caused by reckless or drunken driving.`}</li>
						<li>{`Clean the car before returning it.`}</li>
						<li>{`You will get a full refund if you cancel your booking before ${date2}, otherwise you will be charged 10% of the daily price.`}</li>
						<li>{`Some hosts will have guidelines to follow. Please follow them.`}</li>
					</ul>
					<p>
						For more information, call our customer care line at
						(000) 000 0000 0000
					</p>
				</div>
				<button onClick={handleProceed}>Proceed to checkout</button>
			</div>
		</div>
	);
}

export default BookedCar;
