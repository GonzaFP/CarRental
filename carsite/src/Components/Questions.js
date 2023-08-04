import React from "react";
import { FAQData } from "../Data/FAQData";
import FAQs from "./FAQs";

function Questions() {
	let data = FAQData.map((item, index) => {
		if (index === FAQData.length - 1) {
			return <FAQs item={item} index={index} className="last" />;
		}
		return <FAQs item={item} index={index} />;
	});
	return (
		<div className="accordion">
			<h2>Frequently asked questions </h2>
			<h5>List of answers</h5>
			<div className="fa">{data}</div>
		</div>
	);
}

export default Questions;
