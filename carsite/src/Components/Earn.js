import React from "react";
import { earnData } from "../Data/FAQData";
import "./Styles/Earn.css";

function Earn() {
	const data = earnData.map((item, index) => {
		return (
			<div key={index}>
				<h4>$ {item.amount}</h4>
				<p>{item.type}</p>
			</div>
		);
	});
	return (
		<section className="earnSection">
			<div className="earnContainer">
				<h1>How much could you earn?</h1>
				<p>You can share unlimited number of cars.</p>
				<div className="classTypes">{data}</div>
				<div className="earnBtn">
					<button>GetStarted</button>
				</div>
			</div>
		</section>
	);
}

export default Earn;
