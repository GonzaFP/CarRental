import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import fetcher from "../fetcher";
import CarDetails from "./CarDetails";

function CarInfo() {
	const { carId } = useParams();
	const [carData, setCarData] = useState({ errorMessage: "", data: [] });
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCar = async () => {
			const response = await fetcher(`cars?id=${carId}`);

			setCarData(response);
		};
		fetchCar();
	}, [carId]);

	let data = carData.errorMessage
		? `Error: ${carData.errorMessage}`
		: carData.data?.map((item, index) => {
				return <CarDetails item={item} key={index} />;
		  });

	return <div>{data}</div>;
}

export default CarInfo;
