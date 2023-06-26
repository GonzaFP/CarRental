import React from "react";
import Header from "./Header";
import Front from "./Front";
import Works from "./Works";
import BrowseMake from "./BrowseMake";
import PerfectCars from "./PerfectCars";
import Experience from "./Experience";
import Sustain from "./Sustain";
import Hosts from "./Hosts";
import Become from "./Become";

function Home() {
	return (
		<div>
			<Header />
			<Front />
			<Works />
			<BrowseMake />
			<PerfectCars />
			<Experience />
			<Sustain />
			<Hosts />
			<Become />
		</div>
	);
}

export default Home;
