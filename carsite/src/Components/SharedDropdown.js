import React from "react";

import { Outlet } from "react-router-dom";
import Trips from "./Trips";

function SharedDropdowm() {
	return (
		<div className="TripsInfoContainer">
			<Trips />
			<Outlet />
		</div>
	);
}

export default SharedDropdowm;
