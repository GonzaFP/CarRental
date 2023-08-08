import React from "react";

import SendNotification from "./SendNotification";
function Notify() {
	return (
		<div className="notifications">
			<div className="notifyTitle">
				<h2>Notifications</h2>
			</div>

			<div className="notifySub">
				<h4>Activity</h4>
			</div>
			<div className="notifyBody">
				<SendNotification />
			</div>
		</div>
	);
}

export default Notify;
