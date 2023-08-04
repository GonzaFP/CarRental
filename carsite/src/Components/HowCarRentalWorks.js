import React from "react";
import "./Styles/HowWorks.css";
import { howWorksData } from "../Data/FAQData";

function HowCarRentalWorks() {
	let data = howWorksData.map((item, index) => {
		return (
			<div>
				<h3>{item.title}</h3>
				<p>{item.type}</p>
			</div>
		);
	});

	return (
		<section className="WorksSection">
			<div className="WorksContainer">
				<div className="WorksItem">
					<h2>How CarRental works</h2>
					<h5>Finest transport</h5>
				</div>
				<div className="WorksData">{data}</div>
			</div>
		</section>
	);
}

export default HowCarRentalWorks;
