import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { collection, orderBy, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "./Styles/BookedCar.css";
import { FaCarSide } from "react-icons/fa";
import Display from "./Display";
import BookedCar from "./BookedCar";

function Trips() {
	const image = <FaCarSide id="car" />;
	const subtitle = `No booked trips`;
	const message = `This is where you can access information about your trips.`;

	const { User } = useSelector((state) => state.mainReducer);
	const [orders, setOrders] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const navigate = useNavigate();

	const id = User?.id;
	useEffect(() => {
		<Spinner />;
		if (User) {
			const getBookedCar = async () => {
				await getDocs(
					query(
						collection(db, "bookedCars"),
						where("uid", "==", id),
						orderBy("timestamp", "desc")
					)
				).then((response) => {
					const newData = response.docs.map((doc) => {
						return doc.data();
					});

					setOrders(newData);
					setLoading(false);
				});
			};
			getBookedCar();
		}
	}, [User]);

	const handleDisplay = () => {
		if (isLoading) {
			return <Spinner />;
		} else {
			if (orders?.length > 0) {
				return orders?.map((booking, index) => {
					return <BookedCar key={index} booking={booking} />;
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
		}
	};
	return (
		<div className="BookedCar">
			<div className="BookTitle">
				<h1>Booked trips</h1>
			</div>

			<div className="">{handleDisplay()}</div>
		</div>
	);
}

export default Trips;
