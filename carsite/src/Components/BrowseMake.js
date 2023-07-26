import React, { useState, useEffect } from "react";
import ModelCard from "./modelCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../Data/ResponsiveData";
import "./Styles/Model.css";
import fetcher from "../fetcher";
import ExperinceCard from "./ExperinceCard";

// const breakpoints = [
// 	{ width: 1, itemsToShow: 1 },
// 	{ width: 550, itemsToShow: 2 },
// 	{ width: 700, itemsToShow: 3 },
// 	{ width: 800, itemsToShow: 4 },
// ];
function BrowseMake() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		cssEase: "linear",
		arrows: "true",
	};
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
