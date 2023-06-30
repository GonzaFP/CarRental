import "./Styles/HowWorks.css";
import Hero from "./Hero.js";
import HowCarRentalWorks from "./HowCarRentalWorks";
function HowWorks() {
	return (
		<div className="workContainer">
			<div className="hero">
				<Hero />
			</div>
			<HowCarRentalWorks />
		</div>
	);
}

export default HowWorks;
