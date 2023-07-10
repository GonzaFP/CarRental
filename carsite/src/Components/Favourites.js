import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Display from "./Display";
import { BsFillCarFrontFill } from "react-icons/bs";
import "./Styles/Display.css";

function Favourites() {
	const { User } = useSelector((state) => state.mainReducer);
	console.log("the user in state is", User);
	const title = `${User?.name}'s favourite cars`;
	const image = <BsFillCarFrontFill id="car" />;
	const subtitle = `No favourite cars`;
	const message = `You’ll be able to access your favorited cars here.`;
	return (
		<Display
			title={title}
			image={image}
			subtitle={subtitle}
			message={message}
		/>
	);
}

export default Favourites;
