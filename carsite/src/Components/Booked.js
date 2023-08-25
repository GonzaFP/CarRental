import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CancelBookModal from "./CancelBookModal";
import "./Styles/BookedCar.css";
import { FaCarSide } from "react-icons/fa";
import Display from "./Display";
import BookedCar from "./BookedCar";

function Trips() {
	const image = <FaCarSide id="car" />;
	const subtitle = `No booked trips`;
	const message = `This is where you can access information about your trips.`;
	const [showCancel, setShowCancel] = useState(false);
	const { BookedTrips } = useSelector((state) => state.mainReducer);
	const [isCancel, setIsCancel] = useState(false);
	const [chargeextra, setChargeExtra] = useState(false);
	const [cancelPrice, setCancelPrice] = useState(0);
	const [sessionID, setSessionID] = useState();
	const [created, setCreated] = useState();
	const [carID, setCarID] = useState();

	// ! When 1 minute elapses charge a user a cancellation fee.
	// !code for simulating cancellations after start date.
	useEffect(() => {
		const cancelBooking = () => {
			const canceltimeout = setTimeout(() => {
				if (isCancel) {
					return;
				} else {
					setChargeExtra(true);
				}
			}, 100000);
			return () => clearTimeout(canceltimeout);
		};
		cancelBooking();
	}, []);

	const handleDisplay = () => {
		if (BookedTrips?.length > 0) {
			return BookedTrips?.map((booking, index) => {
				return (
					<BookedCar
						key={index}
						booking={booking}
						setShowCancel={setShowCancel}
						setCancelPrice={setCancelPrice}
						setSessionID={setSessionID}
						setCarID={setCarID}
						setCreated={setCreated}
					/>
				);
			});
		} else {
			return (
				<div>
					<Display
						image={image}
						subtitle={subtitle}
						message={message}
					/>
				</div>
			);
		}
	};

	return (
		<div className="BookedCar">
			<div className="BookTitle">
				<h1>Booked trips</h1>
			</div>
			{showCancel ? (
				<CancelBookModal
					setShowCancel={setShowCancel}
					carID={carID}
					isCancel={isCancel}
					chargeextra={chargeextra}
					setIsCancel={setIsCancel}
					cancelPrice={cancelPrice}
					SessionID={sessionID}
					created={created}
				/>
			) : (
				<div className="">{handleDisplay()}</div>
			)}
		</div>
	);
}

export default Trips;
