import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Styles/NavbarStyles.css";

function Trips() {
	return (
		<nav className="bar">
			<NavLink
				className={({ isActive }) =>
					isActive ? "link active" : "link"
				}
				to="/booked"
				end>
				Booked
			</NavLink>

			<NavLink
				className={({ isActive }) =>
					isActive ? "link active" : "link"
				}
				to="booked/history">
				History
			</NavLink>
		</nav>
	);
}

export default Trips;
