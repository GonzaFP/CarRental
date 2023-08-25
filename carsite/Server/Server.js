const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment");
const { getAuth } = require("firebase-admin/auth");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const admin = require("firebase-admin");
const stripe = require("stripe")(
	"sk_test_51NHM1TKegTPnAwbFCVxDn5uttIiCZi2IUYzecEJsRyVpnZOKZuD9U2UXs2UhD0miYiBZpdCNWvUwWSUtp0TMRnBo00Uz6PAHvn"
);
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
var serviceAccount = require("./admin.json");
const { ref, deleteObject } = require("firebase/storage");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "gs://fir-auth-62ac5.appspot.com",
});

const db = getFirestore();
const storage = getStorage();
const bucket = getStorage().bucket();

const userRef = db.collection("users");
const bookedCarRef = db.collection("BookedVehicles");

const getTrip = async (req, res, next) => {
	const { carID, uid } = req.body;
	if (req.profile.Profile.isAdmin === true) {
		await bookedCarRef
			.where("car.id", "==", carID)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					return (req.carRef = doc.ref);
				});
			});
		next();
	} else {
		res.send("Permission denied");
	}
};

const getUserProfile = async (req, res, next) => {
	const { uid } = req.body;

	await userRef
		.where("Profile.id", "==", uid)
		.get()
		.then((response) => {
			response.forEach((doc) => {
				req.profile = doc.data();
				req.ref = doc.ref;
			});
		});

	next();
};

const getUsers = async (req, res, next) => {
	if (req.profile?.Profile?.isAdmin === false) {
		return res.send({ Profile: req.profile?.Profile });
	}

	await userRef
		.where("Profile.isAdmin", "==", false)
		.get()
		.then((response) => {
			const users = response.docs.map((doc) => {
				return doc.data();
			});
			return (req.users = users);
		});
	next();
};

const getBookedCars = async (req, res, next) => {
	const { uid } = req.body;
	if (req.profile?.Profile.isAdmin === false) {
		await bookedCarRef
			.where("uid", "==", uid)
			.orderBy("timestamp", "desc")
			.get()
			.then((response) => {
				const bookedCars = response.docs.map((doc) => {
					return doc.data();
				});
				return res.send({ bookedCars: bookedCars });
			});
	} else {
		await bookedCarRef
			.orderBy("timestamp", "desc")
			.get()
			.then((response) => {
				const bookedCars = response.docs.map((doc) => {
					return doc.data();
				});
				req.bookedCars = bookedCars;
			});
		next();
	}
};

app.post("/get-a-user", getUserProfile, async (req, res) => {
	res.send({ profile: req.profile });
});

app.post("/delete-a-booked-car", getUserProfile, getTrip, async (req, res) => {
	await bookedCarRef.doc(`${req.carRef._path.segments[1]}`).delete();
	res.send({ message: "trip deleted" });
});

app.post("/delete-user", getUserProfile, async (req, res) => {
	const { uid } = req.body;

	// ! delete the user auth
	getAuth()
		.deleteUser(uid)
		.then(console.log("user deleted"))
		.catch((err) => {
			res.send({ err: err });
		});

	// ! delete the user from db

	await userRef.doc(`${req.ref._path.segments[1]}`).delete();

	// ! delete user photo from storage
	if (req.profile?.Profile.photo !== null) {
		await bucket.file(`profilePhotos/${uid}`).delete();
	}
});

const userStats = async (req, res, next) => {
	const { authuser, dates } = req.body;
	const { prevStart, currentStart } = dates;
	const lastMonthUsers = req.users.filter((user) => {
		const time =
			(user.timestamp._seconds +
				user.timestamp._nanoseconds / 1000000000) *
			1000;
		const date = new Date(time);
		const prevDate = new Date(prevStart);
		return date.getMonth() === prevDate.getMonth();
	});

	const currentMonthUsers = req.users.filter((user) => {
		const time =
			(user.timestamp._seconds +
				user.timestamp._nanoseconds / 1000000000) *
			1000;
		const date = new Date(time);
		const currentDate = new Date(currentStart);
		return date.getMonth() === currentDate.getMonth();
	});

	req.userStats = {
		lastMonthUsers: lastMonthUsers,
		currentMonthUsers: currentMonthUsers,
	};
	next();
};
app.post(
	"/auth-user",
	getUserProfile,
	getUsers,
	userStats,
	async (req, res) => {
		const { authuser, dates } = req.body;
		res.send({
			Profile: req?.profile?.Profile,
			userStats: req?.userStats,
		});
	}
);

const getCarCharge = async (req, res, next) => {
	const { isAdmin, id, status } = req.body;
	if (!isAdmin && status !== "cancelled") {
		return res.send("Permission denied.");
	} else if (isAdmin || status === "cancelled") {
		await bookedCarRef
			.where("created", "==", id)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					return (req.ref = doc.ref);
				});
				next();
			});
	}
};

const bookedCarStats = async (req, res, next) => {
	const { authuser, dates } = req.body;
	const { prevStart, currentStart } = dates;
	const lastMonthCars = req.bookedCars.filter((car) => {
		const time =
			(car.timestamp._seconds + car.timestamp._nanoseconds / 1000000000) *
			1000;
		const date = new Date(time);
		const prevDate = new Date(prevStart);
		return date.getMonth() === prevDate.getMonth();
	});

	const currentMonthCars = req.bookedCars.filter((car) => {
		const time =
			(car.timestamp._seconds + car.timestamp._nanoseconds / 1000000000) *
			1000;
		const date = new Date(time);
		const currentDate = new Date(currentStart);
		return date.getMonth() === currentDate.getMonth();
	});

	req.CarStats = {
		lastMonthCars: lastMonthCars,
		currentMonthCars: currentMonthCars,
	};
	next();
};

app.post("/get-all-users", getUserProfile, getUsers, async (req, res) => {
	res.send({ users: req.users });
});

app.post(
	"/get-booked-cars",
	getUserProfile,
	getBookedCars,
	bookedCarStats,
	(req, res) => {
		const { authuser, dates } = req.body;

		res.send({
			bookedCars: req.bookedCars,
			carStats: req.CarStats,
		});
	}
);

app.get("/month", async (req, res) => {
	const prevMonth = moment()
		.month(moment().month())
		.set("date", 1)
		.format("YYYY-MM-DD HH:mm:ss");
	res.send(prevMonth);
});

app.post("/charge-cancel-fee", getCarCharge, async (req, res) => {
	const { session_id, amount, isAdmin, id, status } = req.body;

	const session = await stripe.checkout.sessions.retrieve(session_id);
	const setupIntent = await stripe.setupIntents.retrieve(
		session.setup_intent
	);
	const payment_method_id = setupIntent.payment_method;
	const customerId = setupIntent.customer;

	const paymentIntent = await stripe.paymentIntents.create({
		customer: customerId,
		payment_method: payment_method_id,
		amount: amount,
		currency: "usd",
		confirm: true,
	});
	const tripRef = bookedCarRef.doc(`${req.ref._path.segments[1]}`);
	const response = await tripRef.update({
		status: status,
		AmountPaid: FieldValue.increment(amount),
		timestamp: FieldValue.serverTimestamp(),
	});
	res.send({ AmountPaid: amount, status: status });
});

app.post("/create-checkout-session", async (req, res) => {
	const { car, uid } = req.body;
	const customer = await stripe.customers.create();
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "setup",
		customer: customer.id,
		success_url: `http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cars/${car.id}`,
	});

	// res.redirect(303, session.url);
	res.send({ url: session.url });
});

app.post("/create-payment-intent", getCarCharge, async (req, res) => {
	const { session_id, amount, isAdmin, id, status } = req.body;

	if (isAdmin === true) {
		const session = await stripe.checkout.sessions.retrieve(session_id);
		const setupIntent = await stripe.setupIntents.retrieve(
			session.setup_intent
		);
		const payment_method_id = setupIntent.payment_method;
		const customerId = setupIntent.customer;

		const paymentIntent = await stripe.paymentIntents.create({
			customer: customerId,
			payment_method: payment_method_id,
			amount: amount,
			currency: "usd",
			confirm: true,
		});
		const tripRef = bookedCarRef.doc(`${req.ref._path.segments[1]}`);
		const response = await tripRef.update({
			status: status,
			AmountPaid: FieldValue.increment(amount),
			timestamp: FieldValue.serverTimestamp(),
		});
		res.send({ AmountPaid: amount, status: status });
	} else {
		res.send("Permission denied.");
	}
});

app.post("/charge-overdue", getCarCharge, async (req, res) => {
	const { session_id, amount, isAdmin, id, status } = req.body;

	if (isAdmin === true) {
		const session = await stripe.checkout.sessions.retrieve(session_id);
		const setupIntent = await stripe.setupIntents.retrieve(
			session.setup_intent
		);
		const payment_method_id = setupIntent.payment_method;
		const customerId = setupIntent.customer;

		const paymentIntent = await stripe.paymentIntents.create({
			customer: customerId,
			payment_method: payment_method_id,
			amount: amount,
			currency: "usd",
			confirm: true,
		});

		const tripRef = bookedCarRef.doc(`${req.ref._path.segments[1]}`);
		const response = await tripRef.update({
			status: status,
			AmountPaid: FieldValue.increment(amount),
			timestamp: FieldValue.serverTimestamp(),
		});
		res.send({ AmountPaid: amount, status: status });
	} else {
		res.send("Permission denied.");
	}
});

app.listen(4242, () => {
	console.log("Node server listening on port 4242!");
});

// const chargeCustomer = async (customerId) => {
// 	const paymentMethods = await stripe.paymentMethods.list({
// 		customer: customerId,
// 		type: "card",
// 	});
// 	try {
// 		const paymentIntent = await stripe.paymentIntents.create({
// 			amount: amount,
// 			currency: "usd",
// 			customer: customerId,
// 			payment_method: paymentMethods.data[0].id,
// 			off_session: true,
// 			confirm: true,
// 			automatic_payment_methods: {
// 				enabled: true,
// 			},
// 		});
// 	} catch (err) {
// 		// Error code will be authentication_required if authentication is needed
// 		console.log("Error code is: ", err.code);
// 		const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
// 			err.raw.payment_intent.id
// 		);
// 		console.log("PI retrieved: ", paymentIntentRetrieved.id);
// 	}
// };

// app.post("/create-checkout-session", async (req, res) => {
// 	const customer = await stripe.customers.create();
// 	const session = await stripe.checkout.sessions.create({
// 		payment_method_types: ["card"],
// 		mode: "setup",
// 		customer: "{{CUSTOMER_ID}}",
// 		success_url:
// 			"http://localhost:3000/booked?session_id={CHECKOUT_SESSION_ID}",
// 		cancel_url: "https://localhost:3000/cancel",
// 		customer: customer.id,
// 	});
// 	res.send("hello");
// });
// app.post("/create-payment-intent", async (req, res) => {
// 	const { items, amount } = req.body;
// 	const customer = await stripe.customers.create();

// 	// Create a PaymentIntent with the order amount and currency
// 	const paymentIntent = await stripe.paymentIntents.create({
// 		customer: customer.id,
// 		setup_future_usage: "off_session",
// 		amount: amount,
// 		currency: "usd",
// 		automatic_payment_methods: {
// 			enabled: true,
// 		},
// 	});
// 	console.log(paymentIntent.client_secret);
// 	res.send({
// 		clientSecret: paymentIntent.client_secret,
// 	});
// });

// app.get("/secret", async (req, res) => {
// 	const intent = // ... Fetch or create the PaymentIntent
// 		res.json({ client_secret: intent.client_secret });
// });

// const session_id = new URLSearchParams(window.location.search).get(
// 	"session_id"
// );

// const some = async () => {
// 	const session = await stripe.checkout.sessions.retrieve(session_id);
// 	console.log("session", session);
// };
// some();

// phone_number_collection: {
// 	enabled: true,
// },
// line_items: [
// 	{
// 		price_data: {
// 			currency: "usd",
// 			product_data: {
// 				name: car.title,

// 				description: car.location,
// 				metadata: {
// 					id: car.id,
// 				},
// 			},
// 			unit_amount: car.price * 100,
// 		},
// 		// Provide the exact Price ID (for example, pr_1234) of the product you want to sell

// 		quantity: car.numberofDays,
// 	},
// ],
