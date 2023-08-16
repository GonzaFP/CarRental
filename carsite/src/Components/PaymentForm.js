import React, { useEffect, useState } from "react";
import {
	AddressElement,
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import "./Styles/Payment.css";
import { useSelector } from "react-redux";

function PaymentForm() {
	const { User, BookedCar } = useSelector((state) => state.mainReducer);

	const stripe = useStripe();
	const elements = useElements();
	const [message, setMessage] = useState(null);
	const [Loading, setLoading] = useState(false);
	const [billingAddress, setBillingAddress] = useState(null);
	const paymentElementOptions = {
		layout: "tabs",
	};

	useEffect(() => {
		if (!stripe) return;

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) return;

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded");
					break;
				case "processing":
					setMessage("Payment processing");
					break;
				case "requires_payment_method":
					setMessage(
						"Your payment was not successful, please try again."
					);
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handlePayment = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// disable form submission until Stripe.js has loaded.
			return;
		}

		setLoading(true);

		await addDoc(collection(db, "bookedCars"), {
			car: BookedCar,
			uid: User?.id,
			email: User?.email,
			address: billingAddress,
			created: Date.now(),
			timestamp: serverTimestamp(),
		});

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/booked",
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setLoading(false);
	};

	const handleBillingChange = (event) => {
		if (event.complete) {
			const address = event.value;

			setBillingAddress(address);
		}
	};

	return (
		<div className="paymentForm">
			<h2>Payment Details</h2>
			<form className="formContainer">
				<div className="address ">
					<h3>Billing address </h3>

					<AddressElement
						options={{
							mode: "shipping",

							fields: {
								phone: "always",
							},
							validation: {
								phone: {
									required: "always",
								},
							},
							defaultValues: {
								name: User?.name,
							},
						}}
						onChange={handleBillingChange}
					/>
				</div>

				<div className="payment">
					<h3>Payment method </h3>
					<PaymentElement
						id="payment-element"
						options={paymentElementOptions}
					/>
					<button
						disabled={Loading || !stripe || !elements}
						id="submit"
						onClick={handlePayment}>
						<span id="button-text">
							{Loading ? (
								<div className="spinner" id="spinner">
									Processing
								</div>
							) : (
								"Pay now"
							)}
						</span>
					</button>
					{/* Show any error or success messages */}
					{message && <div id="payment-message">{message}</div>}
				</div>
			</form>
		</div>
	);
}

export default PaymentForm;
