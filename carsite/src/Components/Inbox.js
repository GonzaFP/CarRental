import React from "react";
import { NavLink } from "react-router-dom";
import "./Styles/Trips.css";

function Inbox() {
	return (
		<nav className="bar">
			<NavLink
				className={({ isActive }) =>
					isActive ? "linkTrip activeTrip" : "linkTrip"
				}
				to="/messages"
				end>
				Messages
			</NavLink>

			<NavLink
				className={({ isActive }) =>
					isActive ? "linkTrip activeTrip" : "linkTrip"
				}
				to="messages/notify">
				Notifications
			</NavLink>
		</nav>
	);
}
export default Inbox;
