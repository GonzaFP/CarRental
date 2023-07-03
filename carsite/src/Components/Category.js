import React from "react";
import { categoryData } from "../Data/CarData";
import ModelCard from "./modelCard";
import Carousel from "react-elastic-carousel";
import "./Styles/Model.css";

const breakpoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2 },
	{ width: 700, itemsToShow: 3 },
	{ width: 800, itemsToShow: 5 },
];
function BrowseCategory() {
	let model = categoryData.map((car, index) => {
		return <ModelCard car={car} key={index} />;
	});
	return (
		<div className="model">
			<h3>Browse by category</h3>
			<Carousel breakPoints={breakpoints}>{model}</Carousel>
		</div>
	);
}

export default BrowseCategory;
