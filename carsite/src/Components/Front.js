import React, { useEffect, useState, useRef } from "react";
import "./Styles/Front.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveCar } from "../Data/ResponsiveData";
import { headerImageData } from "../Data/CarData";
import Header from "./Header";
import Hero from "./Hero";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

function Front() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const length = headerImageData?.length;
	const timeOut = useRef(null);

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		setCurrentSlide((prevSlide) =>
	// 			prevSlide === length - 1 ? 0 : prevSlide + 1
	// 		);
	// 	}, 3000);
	// 	return () => clearInterval(intervalId);
	// }, []);
	const nextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === length - 1 ? 0 : prevSlide + 1
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? length - 1 : prevSlide - 1
		);
	};

	return (
		<section className="heroSection">
			<div className="heroWrapper">
				{headerImageData.map((item, index) => {
					return (
						<div className="heroSlide" key={index}>
							{index === currentSlide && (
								<div className="heroSlider">
									<img src={item} alt="image of a car" />
									<div className="heroContent">
										<h1>
											The world's largest car sharing
											marketplace
										</h1>
										<h3>
											Book a car by completing the form
											below.
										</h3>
										<Hero />
									</div>
								</div>
							)}
						</div>
					);
				})}
				<div className="sliderArrow">
					<BsArrowLeft className="Arrow" onClick={prevSlide} />
					<BsArrowRight className="Arrow" onClick={nextSlide} />
				</div>
			</div>
		</section>
	);
}

export default Front;
