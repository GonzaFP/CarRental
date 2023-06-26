import React from "react";
import "./Styles/Experience.css";

function ExperinceCard(props) {
	const { image, name, icon } = props.item;
	return (
		<div className="Card">
			<img src={image} />
			<div className="sub">
				{icon}
				<h4>{name}</h4>
			</div>
		</div>
	);
}

export default ExperinceCard;
