import React, { useState } from "react";
import "./Styles/Heroo.css";
import SearchQuery from "./SearchQuery";

function Heroo({ setIsLoading }) {
	const classNames = {
		hero: "",
		heroContainer: "HerContainer",
		box: "query",
		search: "hideQuery",
	};

	return <SearchQuery classNames={classNames} setIsLoading={setIsLoading} />;
}

export default Heroo;
