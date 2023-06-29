import React from "react";
import "./Styles/Sustain.css";

function Sustain() {
	return (
		<div className="sustain">
			<h2>We are Carbon Neutral Certified</h2>
			<div className="carbon">
				<div className="left">
					Drive and share cars knowing your carbon footprint is
					balanced out by greenhouse-gas-reduction projects.
					Carbon-neutral travel on <span>Car Rental</span> is now
					verified with a carbon neutral certification!
				</div>
				<div className="right">
					<button>Explore sustainability</button>
				</div>
			</div>

			<img src="carbon.webp" alt="" />
		</div>
	);
}

export default Sustain;
