import React from "react";
import SearchQuery from "./SearchQuery";

function Hero() {
	const classNames = {
		hero: "hero",
		heroContainer: "heroContainer",
		box: "box",
		search: "search",
	};

	return <SearchQuery classNames={classNames} />;
}

export default Hero;
