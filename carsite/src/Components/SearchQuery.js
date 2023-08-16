import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddToBooked } from "../Store/ReducerFunction";
import "./Styles/Hero.css";
import { BookQuery } from "../Store/ReducerFunction";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

function SearchQuery({ classNames, setIsLoading, CarDetails }) {
	const { searchQuery, User } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const tomorrow = dayjs().add(1, "day");
	const nextTomorrow = dayjs().add(2, "day");
	const [query, setQuery] = useState(
		searchQuery || {
			startDate: tomorrow,
			endDate: nextTomorrow,
		}
	);
	const {
		hero,
		heroContainer,
		box,
		search,
		inputClass,
		buttonClass,
		buttonType,
	} = classNames;
	const { id, title, image, price, host, photo, trips, rating } =
		CarDetails || {};

	const [error, setError] = useState("");

	useEffect(() => {
		const { startDate, endDate } = query || {};
		const date1 = new Date(startDate);
		const date2 = new Date(endDate);
		const time = date2.getTime() - date1.getTime();
		const numberofDays = Math.round(time / (1000 * 60 * 60 * 24)) + 1;

		setQuery((prevQuery) => {
			return {
				...prevQuery,
				numberofDays: numberofDays,
			};
		});
		setIsLoading && setIsLoading(true);
		dispatch(BookQuery(query));
	}, [query?.startDate, query?.endDate, searchQuery]);

	const compareDates = (date1, date2) => {
		return date1 < date2;
	};

	const handleFromDateChange = (value) => {
		const isDateBefore = compareDates(value, query.startDate);

		if (isDateBefore) {
			setQuery((prev) => {
				return {
					...prev,
					startDate: value,
				};
			});
		} else {
			setQuery((prev) => {
				return {
					...prev,
					endDate: value,
					startDate: value,
				};
			});
		}
	};

	const handleEndDateChange = (value) => {
		const isDateBefore = compareDates(value, query.startDate);

		if (isDateBefore) {
			setQuery((prev) => {
				return {
					...prev,
					endDate: value,
					startDate: value,
				};
			});
		} else {
			setQuery((prev) => {
				return {
					...prev,
					endDate: value,
				};
			});
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setQuery((prevQuery) => {
			return {
				...prevQuery,
				[name]: value,
			};
		});
	};

	const handleEnterKey = (event) => {
		if (event.key === "Enter") {
			setIsLoading && setIsLoading(true);
			dispatch(BookQuery(query));
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();

		const { location, startDate, endDate } = query;
		if (!location) {
			setError("This field cannot be empty");
			return;
		}

		dispatch(BookQuery(query));
		navigate("/browsecars");
	};

	const handleContinue = (event) => {
		event.preventDefault();
		if (!User) {
			navigate("/signin");
			return;
		}
		const { location, startDate, endDate, numberofDays } = query || {};
		const date1 = new Date(startDate).toString();
		const date2 = new Date(endDate).toString();

		const totalPrice = price * numberofDays;
		if (!location) {
			setError("This field cannot be empty");
			return;
		}

		dispatch(
			AddToBooked({
				image,
				title,
				price,
				trips,
				rating,
				id,
				host,
				photo,
				totalPrice,
				location,
				date1,
				date2,
				numberofDays,
			})
		);
		if (User?.approvedToDrive) {
			navigate("/confirmbooking");
		} else {
			navigate("/approved");
		}
	};
	return (
		<div className={hero}>
			<form className={heroContainer}>
				<div className={box}>
					<h3>Pickup & return location</h3>

					<input
						className={inputClass}
						type="text"
						placeholder="City, airport,address or hotel"
						name="location"
						value={query?.location}
						onChange={handleChange}
						onKeyDown={handleEnterKey}
					/>
					<p className="errors">{error}</p>
				</div>

				<div className={box}>
					<h3>Trip start</h3>
					<DateTimePicker
						value={query?.startDate}
						disablePast
						slotProps={{
							textField: { variant: "standard" },
						}}
						onChange={handleFromDateChange}
					/>
					{/* <input
						type="date"
						name="from"
						min={0}
						value={query.from}
						{...register("from")}
						onChange={handleChange}
					/> */}
					{/* <p className="errors">{errors.from?.message}</p> */}
				</div>

				<div className={box}>
					<h3>Trip end</h3>
					<DateTimePicker
						value={query?.endDate}
						disablePast
						slotProps={{ textField: { variant: "standard" } }}
						onChange={handleEndDateChange}
					/>
					{/* <input
						type="date"
						name="until"
						value={query.until}
						{...register("until")}
						onChange={handleChange}
					/> */}
					{/* <p className="errors">{errors.until?.message}</p> */}
				</div>

				<div className={search}>
					{buttonType === "continueBtn" ? (
						<button
							onClick={handleContinue}
							className={`${inputClass} ${buttonClass}`}>
							Continue
						</button>
					) : (
						<button onClick={handleSearch}>Search cars</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default SearchQuery;
