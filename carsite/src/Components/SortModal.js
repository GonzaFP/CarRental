import React, { useEffect, useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./Styles/SortModal.css";
import { useDispatch, useSelector } from "react-redux";
import { sortCars } from "../Store/ReducerFunction";

function SortModal({ closeSort, Cars, unSorted }) {
	const dispatch = useDispatch();
	const { sortedCars } = useSelector((state) => state.mainReducer);
	const initialChecked = sortedCars ? sortedCars.sort : "relevant";
	const [checked, setChecked] = useState(initialChecked);
	const [items, setItems] = useState(Cars);

	useEffect(() => {
		if (sortedCars) {
			setItems(sortedCars);
			return;
		}
	}, [sortedCars]);

	const handleChange = (event) => {
		setChecked(event.target.value);
	};

	const handleReset = () => {
		if (sortedCars.value?.length > 0) {
			dispatch(
				sortCars({
					checked: "relevant",
					items: items.data,
					sortType: "price",
					value: sortedCars.value,
					carMake: sortedCars.carMake,
					features: sortedCars.features,
				})
			);
		} else {
			dispatch(
				sortCars({
					checked: "relevant",
					items: items.data,
					sortType: "sortby",
					value: sortedCars.value,
					carMake: sortedCars.carMake,
					features: sortedCars.features,
				})
			);
		}
		closeSort(false);
	};

	const handleSort = () => {
		if (checked !== "relevant") {
			dispatch(
				sortCars({
					checked: checked,
					items: items.data,
					sortType: "sortby",
					value: sortedCars.value,
					carMake: sortedCars.carMake,
					features: sortedCars.features,
				})
			);
		} else {
			if (sortedCars?.value !== undefined) {
				dispatch(
					sortCars({
						checked: "relevant",
						items: items.data,
						sortType: "price",
						value: sortedCars.value,
						carMake: sortedCars.carMake,
						features: sortedCars.features,
					})
				);
			} else {
				dispatch(
					sortCars({
						checked: "relevant",
						items: items.data,
						sortType: "sortby",
						value: sortedCars.value,
						carMake: sortedCars.carMake,
						features: sortedCars.features,
					})
				);
			}
		}

		closeSort(false);
	};

	return (
		<div className="sortModal">
			<ClearOutlinedIcon
				className="close"
				onClick={() => closeSort(false)}
			/>
			<div>
				<label>
					<input
						type="radio"
						name="sort"
						value="relevant"
						checked={checked === "relevant"}
						onChange={handleChange}
					/>
					Relevance
				</label>
			</div>

			<div>
				<label>
					<input
						type="radio"
						name="sort"
						value="ascend"
						checked={checked === "ascend"}
						onChange={handleChange}
					/>
					Price: low to high
				</label>
			</div>
			<div>
				<label>
					<input
						type="radio"
						name="sort"
						value="descend"
						checked={checked === "descend"}
						onChange={handleChange}
					/>
					Price: high to low
				</label>
			</div>
			<div className="applyBtn">
				<button onClick={handleSort}>Apply</button>
				{checked !== "relevant" && (
					<button id="reset" onClick={handleReset}>
						Reset
					</button>
				)}
			</div>
		</div>
	);
}

export default SortModal;
