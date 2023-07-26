import React from "react";
import "./Styles/FuelDreams.css";

function FuelDreams() {
	return (
		<div className="fuelContainer">
			<div className="fuelTitle">
				<h1>Fuel your daydreams</h1>
				<p>Share chronicles from road trip adventures</p>
			</div>
			<div className="fuelbody">
				<img src="/drive.jpg" alt="" />
			</div>

			<div className="fuelsubbody">
				<h1>Featured Travel Destination</h1>
				<h2>Travel to Scotland</h2>
				<p>
					Embark on a journey across the epic landscapes of this
					Scottish archipelago
				</p>
			</div>
		</div>
	);
}

export default FuelDreams;
