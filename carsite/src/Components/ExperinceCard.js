import React, { useState } from "react";
import "./Styles/Experience.css";
import { Link } from "react-router-dom";

function ExperinceCard(props) {
	const { image, name, icon } = props.item;

	return (
		<div className="Card">
			<img src={image} />
			<div className="CardOverLay">
				<div className="OverLayContent">
					<p className="toptext">
						from
						<span>
							{" "}
							<sup className="prices">$</sup>
						</span>
						<span id="superPrice" className="prices">
							180
						</span>{" "}
						<span className="prices">/ hour</span>
					</p>
					<p>
						Lorem ipsum is placeholder text commonly used in the
						graphic, print, and publishing industries
					</p>
				</div>
			</div>

			<div className="sub">
				{icon && icon}
				<Link to="/browsecars">{name}</Link>
			</div>
		</div>
	);
}

export default ExperinceCard;
