import React from "react";
import "./Styles/Model.css";
import { Link } from "react-router-dom";

function ModelCard(props) {
	const { title, image, id } = props.car;

	return (
		<Link to={`model/${id}`}>
			<div className="modelCard">
				<img src={image} />

				<h4>{title}</h4>
			</div>
		</Link>
	);
}

export default ModelCard;
