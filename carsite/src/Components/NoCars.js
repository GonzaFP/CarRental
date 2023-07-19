import React from "react";
import { FaRoad } from "react-icons/fa";
import "./Styles/NoCars.css";
import { useDispatch } from "react-redux";
import { sortCars } from "../Store/ReducerFunction";

function NoCars({ unSorted }) {
	const dispatch = useDispatch();

	const handleReset = () => {
		dispatch(
			sortCars({
				checked: "relevant",
				items: unSorted.data,
				sortType: "sortby",

				carMake: "select",
				features: [],
			})
		);
	};
	return (
		<div className="noCars">
			<div className="body">
				<FaRoad id="road" />
			</div>
			<div className="subbody">
				<h3>No cars found</h3>
				<button onClick={handleReset}>Reset filters</button>
			</div>
		</div>
	);
}

export default NoCars;
