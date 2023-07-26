import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Experience.css";
import { ExperienceData } from "../Data/ExperienceData";
import ExperinceCard from "./ExperinceCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../Data/ResponsiveData";
import "./Styles/Experience.css";

function Experience() {
	let data = ExperienceData.map((item, index) => {
		return <ExperinceCard item={item} key={index} />;
	});
	return (
		<div className="main">
			<h3>Browse by experience</h3>
			<div className="categories">{data}</div>
		</div>
	);
}

export default Experience;
