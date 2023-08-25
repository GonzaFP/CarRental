import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";
import { useSelector } from "react-redux";

const promise = loadStripe(
	"pk_test_51NHM1TKegTPnAwbFD6KwJGNfLKiom5az03Pj5UZOcbN9NuS5WOHUC0XwsKOf87oCjYttt1tQfbGRzx8ueAnlNSec00rhQ6ppw9"
);

function Payment() {
	const { BookedCar } = useSelector((state) => state.mainReducer);
	const { totalPrice } = BookedCar || {};
	const [clientSecret, setClientSecret] = useState();

	useEffect(() => {
		fetch("http://localhost:4242/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount: totalPrice }),
		})
			.then((response) => response.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);
	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};
	return (
		<>
			{clientSecret && (
				<Elements stripe={promise} options={options}>
					<PaymentForm />
				</Elements>
			)}
		</>
	);
}

export default Payment;
