const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51NHM1TKegTPnAwbFCVxDn5uttIiCZi2IUYzecEJsRyVpnZOKZuD9U2UXs2UhD0miYiBZpdCNWvUwWSUtp0TMRnBo00Uz6PAHvn"
);

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
	const { amount } = req.body;
	console.log(amount);
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount,
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
	});
	console.log(paymentIntent.client_secret);
	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

app.listen(4242, () => {
	console.log("Node server listening on port 4242!");
});
