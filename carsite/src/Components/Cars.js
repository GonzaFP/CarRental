import React, { useState } from "react";
import "./Styles/Cars.css";
import StarRating from "./StarRating";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import PriceDetails from "./PriceDetails";

function Cars(props) {
	const [showPrice, setShowPrice] = useState(false);
	const { image, title, price, trips, rating } = props.car;
	return (
		<div className="carContainer">
			{showPrice && <PriceDetails setClose={setShowPrice} />}
			<Link>
				<div className="cars">
					<div className="carBody">
						<div className="image">
							<img src={image} alt="" />
						</div>
						<div className="carInfo">
							<h3>{title}</h3>
							<StarRating id="stars" />
							<MdOutlineFavoriteBorder id="icon" />

							<p>pick up at place.</p>
							<h4>Trips: {trips}</h4>
							<div className="price">
								<h3>&pound;{`${price}/day`}</h3>
								<p onClick={() => setShowPrice(true)}>
									Price details
								</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default Cars;
