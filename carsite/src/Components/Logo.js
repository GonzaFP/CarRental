import React from "react";
import { logoData } from "../Data/CarData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveReview } from "../Data/ResponsiveData";
import "./Styles/Logo.css";

function Logo() {
	let data = logoData.map((item, index) => {
		return <img src={item} key={index} className="logoImg" />;
	});

	return (
		<section className="LogoSection">
			<h1>What is CarRental?</h1>
			<p>
				An international marketplace where guests book any car they want
				and hosts build successful businesses sharing their cars.
			</p>
			<Carousel
				responsive={responsiveReview}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={2000}
				arrows={false}
				slidesToSlide={1}
				itemClass="LogoCarousel"
				containerClass="LogoContainerClass"
				shouldResetAutoplay={true}>
				{data}
			</Carousel>
		</section>
	);
}

export default Logo;
