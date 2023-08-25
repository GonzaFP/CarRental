import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

function SharedSideNav() {
	return (
		<div className="dashboard">
			<SideNav />
			<Outlet />
		</div>
	);
}

export default SharedSideNav;
