import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { licenseSchema } from "../Features/Schema";
function SelectCountry({ userInfo, setUserInfo }) {
	const [Loading, setLoading] = useState(true);
	const [countryState, setCountryState] = useState({
		countries: [],
		errorMessage: "",
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(licenseSchema),
	});
	const handleChange = (event) => {
		setUserInfo((prevState) => {
			return {
				...prevState,
				country: event.target.value,
			};
		});
	};

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch(
					`https://restcountries.com/v3.1/all`
				);
				const countriesData = await response.json();
				setLoading(false);

				setCountryState((prevState) => {
					return {
						...prevState,
						countries: countriesData,
					};
				});
			} catch (error) {
				setLoading(false);
				setCountryState((prevState) => {
					return {
						...prevState,
						errorMessage: error.code,
					};
				});
			}
		};
		fetchCountries();
	}, []);

	return (
		<>
			<select
				className="countrySelect"
				value={userInfo.country}
				onChange={handleChange}>
				<option>--Select country--</option>
				{countryState.countries.map((item, index) => {
					return (
						<option value={item.name.common} key={index}>
							{item.name.common}
						</option>
					);
				})}
			</select>
		</>
	);
}

export default SelectCountry;
