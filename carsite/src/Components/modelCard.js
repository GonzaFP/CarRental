import React from "react";
import "./Styles/Model.css";

function ModelCard(props) {
	console.log(props);
	const { name, image } = props.car;

	return (
		<div className="carCard">
			<img src={image} />
			<h4>{name}</h4>
		</div>
	);
}

export default ModelCard;
