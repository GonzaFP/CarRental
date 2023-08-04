import "./Styles/HowWorks.css";
import Hero from "./Hero.js";
import HowCarRentalWorks from "./HowCarRentalWorks";
import Endless from "./Endless";
import BrowseMake from "./BrowseMake";
import BrowseCategory from "./Category";
import Protected from "./Protected";
import FAQ from "./FAQs";
import Questions from "./Questions";
import Banner from "./Banner";
import Images from "./Images";

function HowWorks() {
	return (
		<div className="workContainer">
			<div className="workBanner">
				<HowCarRentalWorks />
			</div>
			<Images />
			<Banner item={{ image: "how2.jpg" }} />
			<BrowseMake />
			<Protected />
			<Questions />
		</div>
	);
}

export default HowWorks;
