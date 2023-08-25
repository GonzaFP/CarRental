import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../Components/Styles/TripDetails.css";
import { serverFetcher } from "../../fetcher";
import { updateBookedTrips } from "../../Store/ReducerFunction";

function TripDetails() {
	const { BookedTrips, User } = useSelector((state) => state.mainReducer);
	const [processing, setProcessing] = useState(false);
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [AmountDue, setAmountDue] = useState(0);

	const carDetails = BookedTrips?.filter((item) => {
		return item.car.id === parseInt(params.id);
	});

	const { car, sessionID, status, created, AmountPaid } = carDetails[0] || {};
	const amount = (AmountPaid / 100).toLocaleString() || 0;
	const {
		title,
		totalPrice,
		numberofDays,
		date1,
		date2,
		location,
		price,
		image,
	} = car || {};

	const currentDate = new Date();

	const compareDates = (firstdate, seconddate) => {
		return new Date(firstdate) < seconddate;
	};
	const isOverDue = compareDates(date2, currentDate);
	const time = currentDate.getTime() - new Date(date2).getTime();
	const overdueDays = Math.round(time / (1000 * 60 * 60 * 24));
	const hasStarted = compareDates(date1, currentDate);
	const timepassed = currentDate.getTime() - new Date(date1).getTime();
	const daysPassed = Math.round(timepassed / (1000 * 60 * 60 * 24));

	useEffect(() => {
		const getBalance = () => {
			if (isOverDue) {
				const Balance = 150 * overdueDays - amount;

				setAmountDue(Balance);
			} else if (hasStarted && !isOverDue) {
				const pay = price * daysPassed - amount;
				setAmountDue(pay);
			}
		};
		getBalance();
	}, [isOverDue, daysPassed]);

	const handleCharge = async () => {
		if (isOverDue && sessionID !== null) {
			setProcessing(true);
			const data = await serverFetcher("charge-overdue", {
				session_id: sessionID,
				amount: AmountDue * 100,
				isAdmin: User.isAdmin,
				id: created,
				status: "overdue",
			});
			dispatch(
				updateBookedTrips({
					type: "status",
					value: {
						amountPaid: data?.AmountPaid,
						id: car.id,
						status: data.status,
					},
				})
			);
			setProcessing(false);

			//! send a notification to the user.
		} else if (!isOverDue && hasStarted && sessionID !== null) {
			setProcessing(true);
			const data = await serverFetcher("create-payment-intent", {
				session_id: sessionID,
				amount: AmountDue * 100,
				isAdmin: User.isAdmin,
				id: created,
				status: "In progress",
			});

			//! send a notification to the user.
			dispatch(
				updateBookedTrips({
					type: "status",
					value: {
						amountPaid: data?.AmountPaid,
						id: car.id,
						status: data.status,
					},
				})
			);
			setProcessing(false);
			console.log("data returned", data);
		}

		navigate(-1);
	};

	return (
		<div className="tripContainer">
			<div className="detailsCar details">
				<h2>Car details </h2>
				<p>{`Car: ${title}`}</p>
				<img src={image} alt="" />
				<p className={isOverDue ? "overdue" : "Progress"}>
					Status:{" "}
					{isOverDue
						? "overdue"
						: hasStarted
						? "In Progress"
						: status}
				</p>
				<p>{`Price: $${price}`}</p>
			</div>

			<div className="detailsTrip details">
				<h2>Trip details </h2>
				<p>{`Location: ${location}`}</p>
				<p>{`Start Date: ${date1}`}</p>
				<p>{`End date: ${date2}`}</p>
				<p>{`Total days: ${numberofDays}`}</p>
				<p>{`Total price: $${totalPrice}`}</p>
				<p id="amountPaid">{`Amount paid: $${amount}`}</p>
				<p>{`Amount due: $${AmountDue}`}</p>

				<div className="statusDetails details">
					{isOverDue && (
						<>
							<p>{`This trip is over due by ${overdueDays} day(s)`}</p>
						</>
					)}
					<button
						onClick={handleCharge}
						disabled={processing}
						className={processing && `disabledBtn`}>
						{processing ? "processing" : "	Charge user"}
					</button>
					<button onClick={() => navigate(-1)}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default TripDetails;
