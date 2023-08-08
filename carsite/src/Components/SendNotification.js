import React from "react";
import { Months, Days } from "../Data/Months";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { auth } from "../Firebase/Firebase";
import "./Styles/SendNotification.css";

function SendNotification() {
	const date = new Date(auth.currentUser.metadata.creationTime);
	const signupDate = ` ${Days[date.getDay()]}, ${date.getDate()} ${
		Months[date.getMonth()]
	}, ${date.getFullYear()}`;

	return (
		<div className="notifyContainer">
			<div className="notifyLeft">
				<Avatar
					className="avatar"
					sx={{
						bgcolor: deepPurple[500],
						width: 60,
						height: 60,
					}}>
					CR
				</Avatar>
			</div>
			<div className="notifyRight">
				<h4>Welcome to CarRental</h4>
				<p>
					Thanks for joining our community. May your adventure begin.
				</p>
				<p>{signupDate}</p>
			</div>
		</div>
	);
}

export default SendNotification;
