import React, { useEffect, useState } from "react";
import fetcher from "../fetcher";

import Cars from "./Cars";
import { useDispatch, useSelector } from "react-redux";
import { sortCars } from "../Store/ReducerFunction";
import Spinner from "./Spinner";
import NoCars from "./NoCars";
import SortBtns from "./SortBtns";

function BrowseCars() {
	const { sortedCars } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [carData, setCarData] = useState({ errorMessage: "", data: [] });
	const [unSortedCarData, setUnsortedCarData] = useState({
		errorMessage: "",
		data: [],
	});

	useEffect(() => {
		<Spinner />;
		if (!sortedCars) {
			const fetchCars = async () => {
				const cars = await fetcher("cars");
				setIsLoading(false);
				setCarData(cars);
				setUnsortedCarData(cars);
			};
			fetchCars();
		} else if (sortedCars?.data?.length === 0) {
			const fetchCars = async () => {
				const cars = await fetcher("cars");

				dispatch(
					sortCars({
						errorMessage: cars.errorMessage,
						data: cars.data,
						value: [],
						sort: sortedCars?.sort,
						BtnLabel: sortedCars?.BtnLabel,
					})
				);
				setIsLoading(false);
				setCarData(sortedCars);
			};
			fetchCars();
		} else {
			setIsLoading(false);
			setCarData(sortedCars);
		}
	}, [sortedCars]);

	let data = carData?.errorMessage
		? `Error: ${carData.errorMessage}`
		: carData?.data?.map((item, index) => {
				return <Cars car={item} key={index} />;
		  });

	return (
		<div className="allCars">
			<div>
				<SortBtns unSortedCarData={unSortedCarData} carData={carData} />
			</div>
			{isLoading ? (
				<Spinner />
			) : carData.data ? (
				<>
					<div className="carTitle">
						<h2>{`${carData.data?.length} cars found`}</h2>
						<h5>These cars can be picked up at or near airport.</h5>
					</div>
					{data}
				</>
			) : (
				<NoCars unSorted={unSortedCarData} />
			)}
		</div>
	);
}

export default BrowseCars;
