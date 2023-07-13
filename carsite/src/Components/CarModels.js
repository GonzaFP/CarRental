import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetcher from "../fetcher";
import Cars from "./Cars";

function CarModels() {
	const { modelId } = useParams();
	const [loading, setLoading] = useState(true);
	const [modelCars, setModelCars] = useState({
		errorMessage: "",
		data: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetcher(`cars?catId=${modelId}`);
			setModelCars(response);
			setLoading(false);
		};
		fetchData();
	}, [modelId]);

	let carData = modelCars.errorMessage
		? `Error: ${modelCars.errorMessage}`
		: modelCars.data.map((car, index) => {
				return <Cars car={car} key={index} />;
		  });
	return (
		<div>
			<div className="carTitle">
				<h2>32 cars at or near LTN</h2>
				<h5>These cars can be picked up at or near airport.</h5>
			</div>
			{carData}
		</div>
	);
}

export default CarModels;
