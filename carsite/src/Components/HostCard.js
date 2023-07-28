import React from "react";
import "./Styles/hosts.css";
import StarRating from "./StarRating";

function HostCard(props) {
	const { name, image, rating, trips } = props.host;
	return (
		<div className="topHostContainer">
			<img src={image} alt="" />

			<div className="topHostTrips">
				<h2>{name}</h2>
				<StarRating value={rating} />
				<h3>{trips} trips.</h3>
			</div>

			{/* <p>"{message}"</p>
			<div className="customer">
				<p>
					{customer} -<span>{date}</span>
				</p>
			</div> */}
		</div>
	);
}

export default HostCard;
