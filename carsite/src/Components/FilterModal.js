import React, { useEffect, useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Slider from "@mui/material/Slider";
import "./Styles/FilterModal.css";
import { useDispatch, useSelector } from "react-redux";
import { sortCars } from "../Store/ReducerFunction";
import fetcher from "../fetcher";

function FilterModal({ Cars, openFilterModal, unSorted, showFilterBtn }) {
	const dispatch = useDispatch();
	const { sortedCars } = useSelector((state) => state.mainReducer);
	const initialChecked = sortedCars ? sortedCars.sort : "relevant";
	const selectedCarMake = sortedCars ? sortedCars.carMake : "select";
	const initialfeature = sortedCars ? sortedCars.features : [];
	const [value, setValue] = useState([10, 250]);
	const [valueChanged, setValueChanged] = useState(false);
	const [checked, setChecked] = useState(initialChecked);
	const [items, setItems] = useState(Cars);
	const [filter, setfilter] = useState(false);
	const [carMake, setCarMake] = useState(selectedCarMake);
	const [features, setFeatures] = useState(initialfeature);
	const [LargeScreenFilter, setLargeScreenFilter] = useState(false);

	const selectedFeatures = features?.map((item, index) => {
		return <p index={index}>{item}</p>;
	});

	/* 
			! when component first loads	
*/
	useEffect(() => {
		if (
			sortedCars &&
			(sortedCars.carMake !== "select" ||
				sortedCars.sort !== "relevant" ||
				sortedCars.features?.length > 0 ||
				sortedCars.value?.length > 0)
		) {
			setfilter(true);
		} else {
			setfilter(false);
		}
		if (sortedCars?.value?.length > 0) {
			setValueChanged(true);
		}

		if (
			sortedCars &&
			((sortedCars.carMake && sortedCars.carMake !== "select") ||
				sortedCars.features?.length > 0)
		) {
			setLargeScreenFilter(true);
		}
		if (!sortedCars.features) {
			setFeatures([]);
		}
	}, []);

	/*
	! when a user filters by car make, make an api call
 */
	useEffect(() => {
		if (carMake !== "select") {
			const fetchCar = async () => {
				const response = await fetcher(`cars?catId=${carMake}`);
				setItems(response);
				setfilter(true);
			};
			fetchCar();
			return;
		}
		setItems(unSorted);
	}, [carMake]);

	/*
	! when the sorted array changes, update state.
 */

	useEffect(() => {
		if (sortedCars) {
			if (sortedCars?.value?.length > 0) {
				setValue([sortedCars.value[0], sortedCars.value[1]]);
				setItems(sortedCars);
			} else {
				setValue([10, 250]);
				setItems(sortedCars);
			}
		}
	}, [sortedCars]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setfilter(true);
		setLargeScreenFilter(true);
		if (name === "sortby") {
			setChecked(value);
		} else if (name === "vehiclemakes") {
			setCarMake(value);
		} else {
			setFeatures([...features, value]);
		}
	};

	const handlePriceChange = (event, newValue) => {
		setValue(newValue);
		setfilter(true);
		setValueChanged(true);
	};

	const handleReset = (screensize) => {
		if (screensize === "small-screen") {
			dispatch(
				sortCars({
					checked: "relevant",
					items: unSorted.data,
					sortType: "sortby",
					value: [],
					carMake: "select",
					features: [],
				})
			);
			setfilter(false);
		} else {
			if (sortedCars?.value?.length > 0 || valueChanged) {
				dispatch(
					sortCars({
						checked: sortedCars?.sort,
						items: unSorted.data,
						sortType: "price",
						value: sortedCars?.value,
						carMake: "select",
						features: [],
					})
				);
			} else {
				dispatch(
					sortCars({
						checked: sortedCars?.sort,
						items: unSorted.data,
						sortType: "sortby",
						value: sortedCars?.value,
						carMake: "select",
						features: [],
					})
				);
			}

			setLargeScreenFilter(false);
		}
		openFilterModal(false);
		showFilterBtn(true);

		setValueChanged(false);
	};
	console.log("sort", sortedCars);

	const handleSort = () => {
		if (!filter) {
			openFilterModal(false);
			showFilterBtn(true);
			return;
		}

		if (!sortedCars && checked === "relevant" && !valueChanged) {
			dispatch(
				sortCars({
					checked: "relevant",
					items: items.data,
					sortType: "sortby",
					carMake: carMake,
					features: features,
				})
			);
		} else {
			if (checked !== "relevant") {
				if (sortedCars?.value === undefined && valueChanged === false) {
					dispatch(
						sortCars({
							checked: checked,
							items: items.data,
							sortType: "sortby",
							value: sortedCars?.value,
							carMake: carMake,
							features: features,
						})
					);
				} else {
					dispatch(
						sortCars({
							checked: checked,
							items: items.data,
							sortType: "price",
							value: value,
							carMake: carMake,
							features: features,
						})
					);
				}
			} else {
				if (sortedCars?.value === undefined && valueChanged === false) {
					dispatch(
						sortCars({
							checked: "relevant",
							items: items.data,
							sortType: "sortby",
							value: sortedCars?.value,
							carMake: carMake,
							features: features,
						})
					);
				} else {
					dispatch(
						sortCars({
							checked: "relevant",
							items: items.data,
							sortType: "price",
							value: value,
							carMake: carMake,
							features: features,
						})
					);
				}
			}
		}
		openFilterModal(false);
		showFilterBtn(true);
	};
	return (
		<div className="filterModal">
			<ClearOutlinedIcon
				className="close"
				onClick={() => {
					openFilterModal(false);
					showFilterBtn(true);
				}}
			/>
			<h2>Filters </h2>
			{filter && (
				<p id="resetsort" onClick={() => handleReset("small-screen")}>
					Reset
				</p>
			)}

			<div className="extrafilters">
				<div className="sortby">
					<h4 className="label">Sort by</h4>
					<select
						id="sortby"
						onChange={handleChange}
						value={checked}
						name="sortby">
						<option value="relevant">Relevance</option>
						<option value="ascend">Price:low to high</option>
						<option value="descend">Price:high to low</option>
					</select>
				</div>

				<div className="slider">
					<h4 className="label">Price</h4>
					<label>
						US$ {value[0]} - US$ {value[1]}/day
					</label>
					<Slider
						value={value}
						onChange={handlePriceChange}
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
			</div>

			<div className="sortby">
				<h4 className="label">Vehicle Makes</h4>
				<select
					id="sortby"
					onChange={handleChange}
					name="vehiclemakes"
					value={carMake}>
					<option value="select">-- Select --</option>
					<option value="0">Audi</option>
					<option value="11">AM General</option>
					<option value="1">Bentely</option>
					<option value="3">BMW</option>
					<option value="2">Mercedes-Benz</option>
					<option value="4">Ford</option>
					<option value="5">Jeep</option>
					<option value="6">Porsche</option>
					<option value="7">Range Rover</option>
					<option value="toyota">Toyota</option>
					<option value="8">Telsa</option>
					<option value="12">Suzuki</option>
					<option value="13">Subaru</option>
					<option value="9">Volkswagen</option>
					<option value="10">Jaguar</option>
				</select>
			</div>

			<div className="sortby">
				<h4 className="label">Features</h4>

				{/*
					display selected features 
				 */}
				{selectedFeatures}

				<select
					id="sortby"
					onChange={handleChange}
					value={features}
					name="features">
					<option value="select">-- Select --</option>
					<option value="All-wheel drive">All-wheel drive</option>
					<option value="Apple CarPlay">Apple CarPlay</option>
					<option value="Automatic transmission">
						Automatic transmission
					</option>
					<option value="AUX input">AUX input</option>
					<option value="Backup camera">Backup camera</option>
					<option value="Blind spot warning">
						Blind spot warning
					</option>
					<option value="GPS">GPS</option>
					<option value="Heated seats">Heated seats</option>
					<option value="Snow tires or chains">
						Snow tires or chains
					</option>
				</select>
			</div>
			<div className="applyBtn">
				<button onClick={handleSort}>View results</button>
				{LargeScreenFilter && (
					<button
						onClick={() => handleReset("large-screen")}
						id="resetBtn">
						Reset
					</button>
				)}
			</div>
		</div>
	);
}

export default FilterModal;
