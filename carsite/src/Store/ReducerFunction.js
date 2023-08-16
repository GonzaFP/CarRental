import { createSlice } from "@reduxjs/toolkit";
import BookedCar from "../Components/BookedCar";

export const initialState = {
	User: null,
	profile: null,
	favCar: [],
	initials: null,
	sortedCars: "",
	searchQuery: null,
	licenseInfo: null,
	BookedCar: null,
};

export const ReducerFunction = createSlice({
	name: "appReducer",
	initialState,
	reducers: {
		// !this is where the reducers will go.
		login: (state, action) => {
			return {
				...state,
				User: action.payload,
			};
		},

		logout: (state) => {
			return {};
		},

		setLicenseInfo: (state, action) => {
			return {
				...state,
				licenseInfo: action.payload,
			};
		},

		updateUser: (state, action) => {
			return {
				...state,
				User: action.payload,
			};
		},
		notify: (state, action) => {
			return {
				...state,
				User: {
					...state.User,
					sendNotification: action.payload.sendNotification,
				},
			};
		},
		BookQuery: (state, action) => {
			return {
				...state,
				searchQuery: action.payload,
			};
		},

		AddToBooked: (state, action) => {
			return {
				...state,
				BookedCar: action.payload,
			};
		},

		getInitials: (state, action) => {
			const initialsArray = action.payload.split(" ");
			const name = initialsArray[0][0] + initialsArray[1][0];
			const intials = name.toUpperCase();
			return {
				...state,
				initials: intials,
			};
		},

		addFavCar: (state, action) => {
			const foundItem = state.favCar.some(
				(item) => item.id === action.payload.id
			);
			if (!foundItem) {
				return {
					...state,
					favCar: [...state.favCar, action.payload],
				};
			} else {
				return {
					...state,
				};
			}
		},

		removeFavCar: (state, action) => {
			return {
				...state,
				favCar: state.favCar.filter(
					(item) => item.id !== action.payload
				),
			};
		},

		uploadProfilePhoto: (state, action) => {
			return {
				...state,
				User: {
					...state.User,
					photo: action.payload,
				},
			};
		},

		sortCars: (state, action) => {
			let mainArray = action.payload?.items;
			const payload = action?.payload;
			let array;
			if (payload.features?.length > 0) {
				const featureSort = mainArray.filter((item) => {
					return payload.features?.every((feature) =>
						item.features?.includes(feature)
					);
				});

				array = featureSort;
			} else {
				array = mainArray;
			}

			if (payload?.sortType === "sortby") {
				const ascend = [...array].sort(
					(carA, carB) => carA.price - carB.price
				);

				const descend = [...array].sort(
					(carA, carB) => carB.price - carA.price
				);

				if (payload?.checked === "ascend") {
					return {
						...state,
						sortedCars: {
							...state.sortedCars,
							data: ascend,
							sort: payload?.checked,
							BtnLabel: "Price- low to high",
							value: payload?.value,
							carMake: payload?.carMake,
							features: payload?.features,
						},
					};
				} else if (payload?.checked === "descend") {
					return {
						...state,
						sortedCars: {
							...state.sortedCars,
							data: descend,
							sort: payload?.checked,
							BtnLabel: "Price- high to low",
							value: payload?.value,
							carMake: payload?.carMake,
							features: payload?.features,
						},
					};
				} else if (payload?.checked === "relevant") {
					return {
						...state,
						sortedCars: {
							...state.sortedCars,
							data: array,
							sort: "relevant",
							BtnLabel: "",
							value: payload?.value,
							carMake: payload?.carMake,
							features: payload?.features,
						},
					};
				}
			} else {
				let filterarray;
				if (payload.value?.length > 0) {
					filterarray = array?.filter((item) => {
						return (
							item.price >= payload?.value[0] &&
							item.price <= payload?.value[1]
						);
					});
				} else {
					filterarray = array;
				}

				if (payload?.checked === "ascend") {
					const sortedArray = [...filterarray].sort(
						(CarA, CarB) => CarA.price - CarB.price
					);
					return {
						...state,
						sortedCars: {
							...state.sortedCars,
							data: sortedArray,
							sort: payload?.checked,
							BtnLabel: "Price- low to high",
							value: payload?.value,
							carMake: payload?.carMake,
							features: payload?.features,
						},
					};
				} else if (payload?.checked === "descend") {
					const sortedArray = [...filterarray].sort(
						(CarA, CarB) => CarB.price - CarA.price
					);
					return {
						...state,
						sortedCars: {
							...state.sortedCars,
							data: sortedArray,
							sort: payload?.checked,
							BtnLabel: "Price- high to low",
							value: payload?.value,
							carMake: payload?.carMake,
							features: payload?.features,
						},
					};
				} else {
					return {
						...state,
						sortedCars: {
							...state.sortedCars,
							data: filterarray,
							sort: payload?.checked,
							features: payload?.features,

							value: payload?.value,
							carMake: payload?.carMake,
						},
					};
				}
			}
		},
	},
});

export const {
	login,
	logout,
	notify,
	uploadProfilePhoto,
	addFavCar,
	removeFavCar,
	getInitials,
	sortCars,
	updateUser,
	BookQuery,
	setLicenseInfo,
	AddToBooked,
} = ReducerFunction.actions;
export default ReducerFunction.reducer;
