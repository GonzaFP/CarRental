import React, { useEffect, useState } from "react";
import fetcher from "../fetcher";
import SortModal from "./SortModal";
import Cars from "./Cars";
import { useDispatch, useSelector } from "react-redux";
import { sortCars } from "../Store/ReducerFunction";
import { BsSliders } from "react-icons/bs";
import PriceSort from "./PriceSort";
import FilterModal from "./FilterModal";
import NoCars from "./NoCars";

function BrowseCars() {
	const { sortedCars } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();
	const [openFilter, setOpenFilter] = useState(false);
	const [carData, setCarData] = useState({ errorMessage: "", data: [] });
	const [unSortedCarData, setUnsortedCarData] = useState({
		errorMessage: "",
		data: [],
	});
	const [openSort, setOpenSort] = useState(false);
	const [openPrice, setOpenPrice] = useState(false);
	const [filterBtn, showFilterBtn] = useState(true);

	useEffect(() => {
		if (!sortedCars) {
			const fetchCars = async () => {
				const cars = await fetcher("cars");
				setCarData(cars);
				setUnsortedCarData(cars);
			};
			fetchCars();
			return;
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
				setCarData(sortedCars);
			};
			fetchCars();
			return;
		}
		setCarData(sortedCars);
	}, [sortedCars]);

	useEffect(() => {
		document.body.style.overflow =
			openPrice || openFilter || openSort ? "hidden" : "unset";
	}, [openSort, openFilter, openPrice]);

	let data = carData?.errorMessage
		? `Error: ${carData.errorMessage}`
		: carData?.data?.map((item, index) => {
				return <Cars car={item} key={index} />;
		  });

	return (
		<div className="allCars">
			{openSort && (
				<SortModal
					closeSort={setOpenSort}
					Cars={carData}
					unSorted={unSortedCarData}
				/>
			)}
			{openPrice && (
				<PriceSort
					closeSort={setOpenPrice}
					Cars={carData}
					unSorted={unSortedCarData}
				/>
			)}
			{openFilter && (
				<FilterModal
					openFilterModal={setOpenFilter}
					Cars={carData}
					unSorted={unSortedCarData}
					showFilterBtn={showFilterBtn}
				/>
			)}
			<div>
				<div className="sortBtns">
					<button
						className="sort"
						id={
							sortedCars?.sort === "ascend" ||
							sortedCars?.sort === "descend"
								? "sorted"
								: ""
						}
						onClick={() => setOpenSort(!openSort)}>
						{sortedCars?.sort === "ascend" ||
						sortedCars?.sort === "descend"
							? `Sort by - ${sortedCars?.BtnLabel}`
							: "Sort by"}
					</button>
					<button
						className="sort"
						onClick={() => setOpenPrice(!openPrice)}
						id={sortedCars?.value?.length > 0 && "sortedPrice"}>
						{sortedCars?.value?.length > 0
							? `Price-  US$ ${sortedCars.value[0]} - US$ ${sortedCars.value[1]}`
							: "Price"}
					</button>

					<button
						id="morefilterBtn"
						onClick={() => {
							setOpenFilter(true);
							showFilterBtn(false);
						}}>
						<span>
							<BsSliders />
						</span>
						More Filters
					</button>
				</div>
			</div>

			{carData.data ? (
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
