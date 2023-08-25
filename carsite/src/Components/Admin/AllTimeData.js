import React from "react";
import "../../Components/Styles/AllTimeStyles.css";
import { useSelector } from "react-redux";
function AllTimeData() {
	const { BookedTrips, AllUsers } = useSelector((state) => state.mainReducer);
	return (
		<div className="AllTimeContainer">
			<h3>All time data</h3>

			<div className="Info">
				<div className="InfoTitle">Users</div>
				<div className="InfoData">{AllUsers?.length}</div>
			</div>
			<div className="Info">
				<div className="InfoTitle">Cars</div>
				<div className="InfoData">200</div>
			</div>
			<div className="Info">
				<div className="InfoTitle">Booked Cars</div>
				<div className="InfoData">{BookedTrips?.length}</div>
			</div>
			<div className="Info">
				<div className="InfoTitle">Earnings</div>
				<div className="InfoData">$200</div>
			</div>
		</div>
	);
}

export default AllTimeData;
