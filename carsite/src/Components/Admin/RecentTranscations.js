import React from "react";
import "../../Components/Styles/RecentTranscations.css";
import { useSelector } from "react-redux";
import moment from "moment";

function RecentTranscations() {
	const { BookedTrips } = useSelector((state) => state.mainReducer);
	const recent = BookedTrips.slice(0, 3);

	return (
		<div className="transContainer">
			<h3>Latest Bookings</h3>
			{recent.map((item, index) => {
				return (
					<div className="recentTrans" key={index}>
						<p id="carName">{item.car.title}</p>
						<p>{`$${item.AmountPaid / 100}`.toLocaleString()}</p>
						<p>{moment(item.created).fromNow()}</p>
					</div>
				);
			})}
		</div>
	);
}

export default RecentTranscations;
