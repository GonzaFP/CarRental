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
import Banner from "./Banner";

function Home() {
	return (
		<div>
			<Header />
			<Front />
			<Experience />
			<Banner />
			<PerfectCars />
			<BrowseMake />
			<Hosts />
			{/* <FuelDreams /> */}
			{/* <BrowseMake /> */}
			{/*
			<FuelDreams />

			<Hosts /> */}
		</div>
	);
}

export default Home;
