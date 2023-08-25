import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sortCars } from "../Store/ReducerFunction";
import SortBtns from "./SortBtns";
import fetcher from "../fetcher";
import Cars from "./Cars";
import Spinner from "./Spinner";
import Heroo from "./Heroo";

function CarModels() {
	const { sortedCars, BookedTrips } = useSelector(
		(state) => state.mainReducer
	);
	const dispatch = useDispatch();

	const [unSortedCarData, setUnsortedCarData] = useState({
		errorMessage: "",
		data: [],
	});
	const { modelId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [modelCars, setModelCars] = useState({
		errorMessage: "",
		data: [],
	});
	const [isBooked, setIsBooked] = useState(false);
	const [bookedCars, setBookedCars] = useState([]);

	useEffect(() => {
		BookedTrips?.map((item) =>
			setBookedCars((prev) => [...prev, item.car.id])
		);
	}, [BookedTrips]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetcher(`cars?catId=${modelId}`);
			setModelCars(response);
			setIsLoading(false);
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
				if (bookedCars.includes(car.id)) {
					return <Cars car={car} key={index} isbooked={true} />;
				}
				return <Cars car={car} key={index} isbooked={false} />;
		  });

	return (
		<div className="allCars">
			<Heroo setIsLoading={setIsLoading} />
			<div>
				<SortBtns
					unSortedCarData={unSortedCarData}
					carData={modelCars}
				/>
			</div>
			{isLoading ? (
				<Spinner />
			) : (
				<div>
					<div className="carTitle">
						<h2>{`${modelCars?.data.length} cars at or near LTN`}</h2>
						<h5>These cars can be picked up at or near airport.</h5>
					</div>
					<div>{modelData}</div>
				</div>
			)}
		</div>
	);
}

export default CarModels;
