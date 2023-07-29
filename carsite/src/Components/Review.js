import React from "react";
import { Reviews } from "../Data/HostData";
import ReviewCard from "./ReviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveReview } from "../Data/ResponsiveData";
import "./Styles/Review.css";

function Review() {
	let data = Reviews.map((item, index) => {
		return <ReviewCard item={item} key={index} />;
	});
	return (
		<section className="reviewSection">
			<h1>We value our clients' feedback</h1>
			<Carousel
				responsive={responsiveReview}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={2000}
				arrows={false}
				slidesToSlide={1}
				itemClass="reviewCarousel"
				containerClass="reviewContainerClass"
				shouldResetAutoplay={true}>
				{data}
			</Carousel>
		</section>
	);
}

export default Review;
