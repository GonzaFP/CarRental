import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./Styles/SortModal.css";
import { useDispatch, useSelector } from "react-redux";
import { sortCars } from "../Store/ReducerFunction";

function PriceSort({ closeSort, Cars, unSorted }) {
	const dispatch = useDispatch();
	const { sortedCars } = useSelector((state) => state.mainReducer);
	const [items, setItems] = useState(Cars);
	const [value, setValue] = useState([10, 250]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (sortedCars) {
			if (sortedCars?.value?.length > 0) {
				setValue([sortedCars.value[0], sortedCars.value[1]]);
				setItems(sortedCars);
			} else {
				setValue([10, 250]);
			}
		}
	}, [sortedCars]);

	const handleReset = () => {
		if (items.sort !== undefined) {
			dispatch(
				sortCars({
					errorMessage: items?.errorMessage,
					items: unSorted.data,
					value: [],
					checked: items?.sort,
					sortType: "sortby",
					BtnLabel: items?.BtnLabel,
					carMake: sortedCars.carMake,
					features: sortedCars.features,
				})
			);
		} else {
			dispatch(
				sortCars({
					errorMessage: items?.errorMessage,
					items: unSorted.data,
					value: [],
					checked: items?.sort,
					sortType: "price",
					BtnLabel: items?.BtnLabel,
					carMake: sortedCars.carMake,
					features: sortedCars.features,
				})
			);
		}
		closeSort(false);
	};
	const handleSort = () => {
		dispatch(
			sortCars({
				checked: sortedCars?.sort,
				items: items.data,
				sortType: "price",
				value: value,
				carMake: sortedCars.carMake,
				features: sortedCars.features,
			})
		);
		closeSort(false);
	};

	return (
		<div className="priceSort">
			<ClearOutlinedIcon
				className="close"
				onClick={() => closeSort(false)}
			/>
			<label>
				US$ {value[0]} - US$ {value[1]}/day
			</label>
			<div className="slider">
				<Slider
					value={value}
					onChange={handleChange}
					valueLabelDisplay="auto"
					min={10}
					max={250}
					step={5}
					size="small"
					sx={{
						width: 300,

						"& .MuiSlider-thumb": {
							borderRadius: "1px",
						},
					}}
				/>
			</div>

			<div className="applyBtn">
				<button onClick={handleSort}> View results </button>
				{sortedCars && (
					<button id="reset" onClick={handleReset}>
						Remove
					</button>
				)}
			</div>
		</div>
	);
}

export default PriceSort;
