import React from "react";
import { Outlet } from "react-router-dom";
import Inbox from "./Inbox";

function SharedInbox() {
	return (
		<div className="TripsInfoContainer">
			<Inbox />
			<Outlet />
		</div>
	);
}

export default SharedInbox;
