import React, { useState, useEffect } from "react";

import ModelCard from "./modelCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../Data/ResponsiveData";
import "./Styles/Model.css";
import fetcher from "../fetcher";
import ExperinceCard from "./ExperinceCard";

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
		: models.data.map((item, index) => {
				return <ModelCard car={item} key={index} />;
		  });

	return (
		<div className="models">
			<h1>Browse by make</h1>
			<h5>Only the best</h5>
			<div className="eachModel">
				<Carousel
					responsive={responsive}
					swipeable={true}
					itemClass="carouselCard">
					{model}
				</Carousel>
			</div>
		</div>
	);
}

export default BrowseMake;
