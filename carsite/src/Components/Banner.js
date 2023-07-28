import React from "react";
import "./Styles/Banner.css";
import { BiPhoneCall } from "react-icons/bi";

function Banner() {
	return (
		<section className="bannerSection">
			<img src="banner.jpg" alt="" />
			<div className="bannerOverLay">
				<h1>Save money with CarRental</h1>
				<p>
					{" "}
					<span>
						<BiPhoneCall id="callIcon" />
					</span>{" "}
					&nbsp; <span id="phone">Phone:</span> (000) 000 0000 0000{" "}
				</p>
			</div>
		</section>
	);
}

export default Banner;
