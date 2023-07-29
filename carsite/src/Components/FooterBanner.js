import React from "react";
import Banner from "./Banner";

function FooterBanner() {
	const item = {
		image: "footer.jpg",
		title: "Choose your model & get 15% off",
		icons: false,
	};

	return <Banner item={item} />;
}

export default FooterBanner;
