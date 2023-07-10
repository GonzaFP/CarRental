import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function StarRating() {
	const [rating, setRating] = useState(0);
	const handleRating = (rate) => {
		setRating(rate);
	};

	return (
		<Rating
			onClick={handleRating}
			allowHover={false}
			size={20}
			readonly={true}
		/>
	);
}

export default StarRating;
