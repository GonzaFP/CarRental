import React from "react";
import Banner from "./Banner";

function HeroBanner() {
	const item = {
		image: "banner.jpg",
		title: "Save money with CarRental",
		icons: true,
	};

	return <Banner item={item} />;
}

export default HeroBanner;
