import React from "react";
import "./Styles/Display.css";

function Display({ title, image, subtitle, message }) {
	return (
		<div>
			<div className="Display">
				<h2>{title}</h2>

				<div className="info">
					{image}
					<h3>{subtitle}</h3>
					<p> {message}</p>
				</div>
			</div>
		</div>
	);
}

export default Display;
