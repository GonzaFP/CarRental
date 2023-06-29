import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Styles/Hero.css";
function Hero() {
	return (
		<div className="hero">
			<form className="heroContainer">
				<div className="box">
					<span>Destination</span>
					<input
						type="search"
						placeholder="City, airport,address or hotel"
					/>
				</div>

				<div className="box">
					<span>Pick-up Date</span>
					<input type="date" />
				</div>

				<div className="box">
					<span>Return Date</span>
					<input type="date" />
				</div>

				<div className="search">
					<button className=" HideBtn">Search cars</button>
					<FaSearch className="searchIcon" />
				</div>
			</form>
		</div>
	);
}

export default Hero;
