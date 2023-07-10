import React from "react";
import { NavLink } from "react-router-dom";
import "./Styles/NavbarStyles.css";

function Inbox() {
	return (
		<nav className="bar">
			<NavLink
				className={({ isActive }) =>
					isActive ? "link active" : "link"
				}
				to="/messages"
				end>
				Messages
			</NavLink>

			<NavLink
				className={({ isActive }) =>
					isActive ? "link active" : "link"
				}
				to="messages/notify">
				Notifications
			</NavLink>
		</nav>
	);
}
export default Inbox;
