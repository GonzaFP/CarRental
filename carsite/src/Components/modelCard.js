import React from "react";
import "./Styles/Model.css";
import { Link } from "react-router-dom";

function ModelCard(props) {
	const { title, image, id } = props.car;

	return (
		<div className="card">
			<Link to={`model/${id}`}>
				<div className="carCard">
					<img src={image} />
					<h4>{title}</h4>
				</div>
			</Link>
		</div>
	);
}

export default ModelCard;
