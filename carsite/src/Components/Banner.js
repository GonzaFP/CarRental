import React from "react";
import "./Styles/Banner.css";
import { BiPhoneCall } from "react-icons/bi";

function Banner({ item }) {
	const { title, image, icons } = item;
	return (
		<section className="bannerSection">
			<img src={image} alt="" />
			<div className="bannerOverLay">
				<h1>{title}</h1>

				{icons && (
					<p>
						{" "}
						<span>
							<BiPhoneCall id="callIcon" />
						</span>{" "}
						&nbsp; <span id="phone">Phone:</span> (000) 000 0000
						0000{" "}
					</p>
				)}
			</div>
		</section>
	);
}

export default Banner;
