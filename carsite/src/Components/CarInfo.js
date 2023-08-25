import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fetcher from "../fetcher";
import CarDetails from "./CarDetails";

function CarInfo() {
	const { carId } = useParams();
	const [carData, setCarData] = useState({ errorMessage: "", data: [] });
	const { BookedTrips } = useSelector((state) => state.mainReducer);
	const [isBooked, setIsBooked] = useState(false);
	const [bookedCars, setBookedCars] = useState([]);

	useEffect(() => {
		BookedTrips?.map((item) =>
			setBookedCars((prev) => [...prev, item.car.id])
		);
	}, [BookedTrips]);

	useEffect(() => {
		const fetchCar = async () => {
			const response = await fetcher(`cars?id=${carId}`);

			setCarData(response);
		};
		fetchCar();
	}, [carId]);

	let data = carData.errorMessage
		? `Error: ${carData.errorMessage}`
		: carData?.data.map((item, index) => {
				if (bookedCars.includes(item.id)) {
					return (
						<CarDetails item={item} key={index} isBooked={true} />
					);
				}
				return <CarDetails item={item} key={index} isBooked={false} />;
		  });

	return <div>{data}</div>;
}

export default CarInfo;
