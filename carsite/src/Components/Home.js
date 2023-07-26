import React from "react";
import Front from "./Front";
import Works from "./Works";
import BrowseMake from "./BrowseMake";
import PerfectCars from "./PerfectCars";
import Experience from "./Experience";

import Hosts from "./Hosts";
import Become from "./Become";
import Hero from "./Hero";
import FuelDreams from "./FuelDreams";
import Header from "./Header";

function Home() {
	return (
		<div>
			<Header />
			<Front />

			<Experience />
			<PerfectCars />
			<BrowseMake />
			<FuelDreams />
			{/* <BrowseMake /> */}
			{/*
			<FuelDreams />

			<Hosts /> */}
		</div>
	);
}

export default Home;
