import React from "react";
import { IoMdNotifications } from "react-icons/io";
import Display from "./Display";

function Notify() {
	const title = `Notifications`;
	const image = <IoMdNotifications id="car" />;
	const subtitle = `No notifications`;

	return (
		<div>
			<Display title={title} image={image} subtitle={subtitle} />
		</div>
	);
}

export default Notify;
