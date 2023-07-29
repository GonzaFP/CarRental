import React from "react";
import StarRating from "./StarRating";

function ReviewCard({ item }) {
	const { title, message, rating, customer, date } = item;
	return (
		<div className="Reviews">
			<div className="reviewTitle">
				<h3>{title}</h3>
				<StarRating value={rating} />
			</div>
			<div className="reviewBody">
				<p>{message}</p>
				<p id="customer">
					<span>{customer}</span> - <span>{date}</span>
				</p>
			</div>
		</div>
	);
}

export default ReviewCard;
