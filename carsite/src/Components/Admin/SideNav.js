import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../Components/Styles/SideNav.css";
import { FaUsers, FaTachometerAlt, FaCar } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";

function SideNav() {
	const [className, setClassName] = useState("hide");
	const [toggle, setToggle] = useState(false);

	const handleDisplay = () => {
		setClassName(() => {
			return toggle ? "showNav" : "hideNav";
		});
		setToggle(!toggle);
	};

	return (
		<div className="sideNav">
			<div className="menu" onClick={handleDisplay}>
				<MenuIcon id="navIcon" />
				<h2>Quick links</h2>
			</div>
			<nav className={`NavLinks ${className}`}>
				<NavLink
					className={({ isActive }) =>
						isActive ? "linkTrip activeTrip" : "linkTrip"
					}
					to="/summary"
					end>
					<FaTachometerAlt className="sideIcons" />{" "}
					<span className="navSpan">Summary</span>
				</NavLink>

				<NavLink
					className={({ isActive }) =>
						isActive ? "linkTrip activeTrip" : "linkTrip"
					}
					to="allbookedcars">
					<FaCar className="sideIcons" /> Booked Cars
				</NavLink>

				<NavLink
					className={({ isActive }) =>
						isActive ? "linkTrip activeTrip" : "linkTrip"
					}
					to="users">
					<FaUsers className="sideIcons" /> Users
				</NavLink>
			</nav>
		</div>
	);
}

export default SideNav;
