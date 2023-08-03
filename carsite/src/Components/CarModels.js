import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sortCars } from "../Store/ReducerFunction";
import SortBtns from "./SortBtns";
import fetcher from "../fetcher";
import Cars from "./Cars";

function CarModels() {
	const { sortedCars } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();

	const [unSortedCarData, setUnsortedCarData] = useState({
		errorMessage: "",
		data: [],
	});
	const { modelId } = useParams();
	const [loading, setLoading] = useState(true);
	const [modelCars, setModelCars] = useState({
		errorMessage: "",
		data: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetcher(`cars?catId=${modelId}`);
			setModelCars(response);
			setLoading(false);
		};
		fetchData();
	}, [modelId]);

	useEffect(() => {
		if (!sortedCars) {
			setUnsortedCarData(modelCars);
			return;
		} else if (sortedCars?.data?.length === 0) {
			dispatch(
				sortCars({
					errorMessage: modelCars.errorMessage,
					data: modelCars.data,
					value: [],
					sort: sortedCars?.sort,
					BtnLabel: sortedCars?.BtnLabel,
				})
			);
			return;
		}
	}, [sortedCars]);

	let modelData = modelCars.errorMessage
		? `Error: ${modelCars.errorMessage}`
		: modelCars.data.map((car, index) => {
				return <Cars car={car} key={index} />;
		  });
	return (
		<div className="allCars">
			<div>
				<SortBtns
					unSortedCarData={unSortedCarData}
					carData={modelCars}
				/>
			</div>
			<div className="carTitle">
				<h2>{`${modelCars.data.length} cars at or near LTN`}</h2>
				<h5>These cars can be picked up at or near airport.</h5>
			</div>
			{modelData}
		</div>
	);
}

export default CarModels;
