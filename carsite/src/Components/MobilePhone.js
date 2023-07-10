import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./Styles/MobilePhone.css";
import { useNavigate } from "react-router-dom";

function MobilePhone() {
 const navigate = useNavigate()
	const [value, setValue] = useState();
	const [className, setClassName] = useState("inactive");
	const [disabled, setDisabled] = useState(true);

	const handleChange = () => {
		if (value !== "") {
			setValue(value);
			setDisabled(false);
			setClassName("active");
			return;
		}
	};

	return (
		<div className="phone">
			<h1>Enter mobile phone</h1>
			<p>
				We’ll send you a text message with a code to verify your number.
				We’ll only share your number with your host or guest after
				you’ve booked a trip.
			</p>
			<PhoneInput
				placeholder="Enter phone number"
				value={value}
				onChange={handleChange}
				className="phonenumber"
			/>
			<div className="inputcheck">
				<input type="checkbox" />
				<span>Get important trip updates via text message.</span>
			</div>
			<div>
				<button className={className} disabled={disabled}>
					Send code
				</button>
				<button className="whiteBtns" onClick={()=>navigate(-1)}>Cancel</button>
			</div>
		</div>
	);
}

export default MobilePhone;
