import React from "react";
import { FaCarSide } from "react-icons/fa";
import Display from "./Display";

function Trips() {
	const title = `Booked`;
	const image = <FaCarSide id="car" />;
	const subtitle = `No booked trips`;
	const message = `This is where you can access information about your trips.`;
	return (
		<div>
			<Display
				title={title}
				image={image}
				subtitle={subtitle}
				message={message}
			/>
		</div>
	);
}

export default Trips;
