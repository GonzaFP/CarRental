import React from "react";
import "./Styles/Experience.css";
import { ExperienceData } from "../Data/ExperienceData";
import ExperinceCard from "./ExperinceCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../Data/ResponsiveData";

function Experience() {
	let data = ExperienceData.map((item, index) => {
		return <ExperinceCard item={item} key={index} />;
	});
	return (
		<div className="main">
			<h3>Browse by experience</h3>
			<Carousel responsive={responsive}>{data}</Carousel>
		</div>
	);
}

export default Experience;
