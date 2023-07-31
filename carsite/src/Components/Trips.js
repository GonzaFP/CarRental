import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Styles/Trips.css";

function Trips() {
	return (
		<nav className="bar">
			<NavLink
				className={({ isActive }) =>
					isActive ? "linkTrip activeTrip" : "linkTrip"
				}
				to="/booked"
				end>
				Booked
			</NavLink>

			<NavLink
				className={({ isActive }) =>
					isActive ? "linkTrip activeTrip" : "linkTrip"
				}
				to="booked/history">
				History
			</NavLink>
		</nav>
	);
}

export default Trips;
