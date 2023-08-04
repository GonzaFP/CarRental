import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Display from "./Display";
import { BsFillCarFrontFill } from "react-icons/bs";
import "./Styles/Display.css";
import FavCard from "./FavCard";

function Favourites() {
	const { User, favCar } = useSelector((state) => state.mainReducer);

	const title = `${User?.name}'s favourite cars`;
	const image = <BsFillCarFrontFill id="car" />;
	const subtitle = `No favourite cars`;
	const message = `You’ll be able to access your favorite cars here.`;
	return (
		<div className="favContainer">
			{!User || favCar.length === 0 ? (
				<Display
					title={title}
					image={image}
					subtitle={subtitle}
					message={message}
				/>
			) : (
				<FavCard />
			)}
		</div>
	);
}

export default Favourites;
