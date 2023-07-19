import React from "react";
import "./Styles/Perfect.css";
import { useNavigate } from "react-router-dom";

function PerfectCars() {
	const navigate = useNavigate();
	return (
		<div className="browse">
			<img src="lamb.png" alt="lamborghini" />
			<div className="right">
				<h3>
					Find the perfect car{" "}
					<span className="span">to take on the great outdoors</span>
				</h3>
				<p>
					Go prepared in a rugged 4x4 to take on winter roads with
					ease, or a camper van to take you to the trees.
				</p>
				<button onClick={() => navigate("/browsecars")}>
					Browse cars
				</button>
			</div>
		</div>
	);
}

export default PerfectCars;
