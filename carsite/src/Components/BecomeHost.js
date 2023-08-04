import React from "react";

import ListCar from "./ListCar";
import Sharing from "./Sharing";
import Protected from "./Protected";
import GetStarted from "./GetStarted";
import Logo from "./Logo";
import Earn from "./Earn";

function BecomeHost() {
	return (
		<div className="becomeHostContainer">
			<ListCar />
			<Logo />
			<Earn />
			<Sharing />
		</div>
	);
}

export default BecomeHost;
