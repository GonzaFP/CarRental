import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import "./Styles/Become.css";

function Become() {
	return (
		<div className="choice">
			<div className="guest">
				<h2>
					Book a car <span className="greater">&gt;</span>
				</h2>
				<p>
					Down the street or across the country, find the perfect
					vehicle for your next adventure.
				</p>
			</div>
			<FaRegHandshake id="icon" />

			<div className="host">
				<h2>
					Become a host <span className="greater">&gt;</span>
				</h2>
				<p>
					Accelerate your entrepreneurship and start building a small
					car sharing business on Turo.
				</p>
			</div>
		</div>
	);
}

export default Become;
