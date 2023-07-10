import React, { useState, useEffect } from "react";
import ModelCard from "./modelCard";
import Carousel from "react-elastic-carousel";
import "./Styles/Model.css";
import fetcher from "../fetcher";

const breakpoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2 },
	{ width: 700, itemsToShow: 3 },
	{ width: 800, itemsToShow: 5 },
];
function BrowseMake() {
	const [models, setModels] = useState({
		errorMessage: "",
		data: [],
	});
	useEffect(() => {
		const fetchData = async () => {
			const modelData = await fetcher("model");
			setModels(modelData);
		};
		fetchData();
	}, []);

	let model = models.errorMessage
		? `Error: ${models.errorMessage}`
		: models.data.map((car, index) => {
				return <ModelCard car={car} key={index} />;
		  });
	return (
		<div className="model">
			<h3>Browse by make</h3>
			<Carousel breakPoints={breakpoints}>{model}</Carousel>
		</div>
	);
}

export default BrowseMake;
