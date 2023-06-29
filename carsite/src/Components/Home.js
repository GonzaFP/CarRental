import React from "react";
import Front from "./Front";
import Works from "./Works";
import BrowseMake from "./BrowseMake";
import PerfectCars from "./PerfectCars";
import Experience from "./Experience";
import Sustain from "./Sustain";
import Hosts from "./Hosts";
import Become from "./Become";
import Hero from "./Hero";

function Home() {
	return (
		<div>
			<Front />
			<Hero />
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
