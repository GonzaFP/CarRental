import React from "react";
import "./Styles/Sharing.css";
import { howWorksData } from "../Data/FAQData";

function HowCarRentalWorks() {
	let data = howWorksData.map((item, index) => {
		return (
			<>
				<h3>{item.title}</h3>
				<p>{item.type}</p>
			</>
		);
	});

	return (
		<section className="sharingSection">
			<div className="sharingContainer">
				<div className="sharingLeft">
					<img src="works.jpg" alt="" />
				</div>

				<div className="sharingRight">
					<h2>How CarRental works</h2>

					<div className="sharingOptions">{data}</div>
				</div>
			</div>
		</section>
	);
}

export default HowCarRentalWorks;
