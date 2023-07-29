import React from "react";

import ListCar from "./ListCar";
import Sharing from "./Sharing";
import Protected from "./Protected";
import GetStarted from "./GetStarted";
import Logo from "./Logo";
import Earn from "./Earn";
function BecomeHost() {
	return (
		<>
			<ListCar />
			<Logo />
			<Earn />
			<Sharing />

			{/* <Sharing />
			<Protected />
			<GetStarted /> */}
		</>
	);
}

export default BecomeHost;
