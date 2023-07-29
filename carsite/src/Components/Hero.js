import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Styles/Hero.css";
function Hero() {
	return (
		<div className="hero">
			<form className="heroContainer">
				<div className="box">
					<h3>Destination</h3>
					<input
						type="search"
						placeholder="City, airport,address or hotel"
					/>
				</div>

				<div className="box">
					<h3>Pick-up Date</h3>
					<input type="date" />
				</div>

				<div className="box">
					<h3>Return Date</h3>
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
