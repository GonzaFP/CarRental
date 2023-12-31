import React from "react";
import { useSelector } from "react-redux";
import FavCardItems from "./favCardItems";

function FavCard() {
	const { User, favCar } = useSelector((state) => state.mainReducer);
	const data =
		favCar.length > 0
			? favCar.map((item, index) => {
					return <FavCardItems item={item} index={index} />;
			  })
			: null;

	return (
		<div className="favs">
			<h2>{`${User?.name}'s favourities`}</h2>
			<div className="favCars">{data}</div>
		</div>
	);
}

export default FavCard;
