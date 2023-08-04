import React from "react";
import "./Styles/Images.css";

function Images() {
	return (
		<section className="ImagesSection">
			<div className="ImagesContainer">
				<div className="image1 imageOption">
					<img src="car1.jpg" alt="" />
				</div>

				<div className="image2 imageOption">
					<img src="car2.jpg" alt="" id="imagetwo" />
					<img src="car3.jpg" alt="" />
				</div>

				<div className="image3 imageOption">
					<img src="car4.jpg" alt="" />
				</div>
			</div>
		</section>
	);
}

export default Images;
