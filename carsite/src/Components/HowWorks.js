import "./Styles/HowWorks.css";
import Hero from "./Hero.js";
import HowCarRentalWorks from "./HowCarRentalWorks";
import Endless from "./Endless";
import BrowseMake from "./BrowseMake";
import BrowseCategory from "./Category";
import Insurance from "./insurance";
import FAQ from "./FAQs";
import Questions from "./Questions";

function HowWorks() {
	return (
		<div className="workContainer">
			<div className="hero">
				<Hero />
			</div>
			<HowCarRentalWorks />
			<Endless />
			<BrowseMake />
			<BrowseCategory />
			<Insurance />
			<Questions />
		</div>
	);
}

export default HowWorks;
