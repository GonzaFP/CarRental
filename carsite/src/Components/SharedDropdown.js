import React from "react";

import { Outlet } from "react-router-dom";
import Trips from "./Trips";

function SharedDropdowm() {
	return (
		<div>
			<Trips />
			<Outlet />
		</div>
	);
}

export default SharedDropdowm;
