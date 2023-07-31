import React from "react";
import "./Styles/Sharing.css";
import { sharingData } from "../Data/FAQData";

function Sharing() {
	let data = sharingData.map((item, index) => {
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
					<img src="share.jpg" alt="" />
				</div>

				<div className="sharingRight">
					<h2>How sharing your car works</h2>

					<div className="sharingOptions">{data}</div>
				</div>
			</div>
		</section>
	);
}

export default Sharing;
