import React from "react";
import { BsEnvelope } from "react-icons/bs";
import Display from "./Display";

function Messages() {
	const title = `Messages`;
	const image = <BsEnvelope id="car" />;
	const subtitle = `No messages`;

	return (
		<div>
			<Display title={title} image={image} subtitle={subtitle} />
		</div>
	);
}

export default Messages;
