import React from "react";

import ListCar from "./ListCar";
import Sharing from "./Sharing";
import Protected from "./Protected";
import GetStarted from "./GetStarted";
function BecomeHost() {
	return (
		<>
			<ListCar />
			<Sharing />
			<Protected />
			<GetStarted />
		</>
	);
}

export default BecomeHost;
