/*
! component charges a user if:
! they return the car past the due date.
! when they return the car.
! component also sends a user a notification whenever trip is starting, nearing approaching date or is past due date.
*/

import React from "react";
import { useSelector } from "react-redux";
import Summary from "./Summary";
import SideNav from "./SideNav";

function DashBoard() {
	const { User } = useSelector((state) => state.mainReducer);

	return (
		<div className="dashboard">
			<SideNav />
			<Summary />
		</div>
	);
}

export default DashBoard;
