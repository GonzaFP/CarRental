import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function StarRating({ value }) {
	return (
		<Rating allowHover={false} size={25} initialValue={value} readonly />
	);
}

export default StarRating;
