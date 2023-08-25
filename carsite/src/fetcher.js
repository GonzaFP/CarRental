import moment from "moment";

const baseUrl = "http://localhost:3001/";
const backURL = "http://localhost:4242/";

const fetcher = async (url) => {
	let responseObject = {
		errorMessage: "",
		data: [],
	};
	try {
		const response = await fetch(baseUrl + url);
		if (response.status === 404) {
			throw new Error(`${response.status} Page not found.`);
		} else if (response.status === 500) {
			throw new Error("Server Error");
		} else if (!response.ok) {
			throw new Error(`Http Error! status: ${response.status}`);
		}
		const responseData = await response.json();
		responseObject.data = responseData;
	} catch (error) {
		responseObject.errorMessage = error;
	}

	return responseObject;
};
export default fetcher;

export const serverFetcher = async (url, payload) => {
	const response = await fetch(backURL + url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	const data = await response.json();
	return data;
};

const prevMonthStart = moment()
	.month(moment().month() - 1)
	.set("date", 1)
	.format("YYYY-MM-DD HH:mm:ss");
const currentMonthStart = moment()
	.month(moment().month())
	.set("date", 1)
	.format("YYYY-MM-DD HH:mm:ss");
const prevStart = new Date(prevMonthStart).toDateString();
const currentStart = new Date(currentMonthStart).toDateString();

const prevMonthEnd = moment()
	.month(moment().month() - 1)
	.set("date", 31)
	.format("YYYY-MM-DD HH:mm:ss");
const prevEnd = new Date(prevMonthEnd).toDateString();

const currentMonthEnd = moment()
	.month(moment().month())
	.set("date", 31)
	.format("YYYY-MM-DD HH:mm:ss");
const currentEnd = new Date(currentMonthEnd).toDateString();

export const dates = {
	prevStart: prevStart,
	currentStart: currentStart,
	prevEnd: prevEnd,
	currentEnd: currentEnd,
};
