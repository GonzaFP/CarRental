import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsSliders } from "react-icons/bs";
import SortModal from "./SortModal";
import PriceSort from "./PriceSort";
import FilterModal from "./FilterModal";

function SortBtns({ unSortedCarData, carData }) {
	const [openSort, setOpenSort] = useState(false);
	const [openPrice, setOpenPrice] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const [filterBtn, showFilterBtn] = useState(true);
	const { sortedCars } = useSelector((state) => state.mainReducer);
	return (
		<>
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
					</span>{" "}
					&nbsp; More Filters
				</button>
			</div>
		</>
	);
}

export default SortBtns;
