import React, { useEffect, useState } from "react";
import "./Styles/CheckOut.css";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import CheckOutMessage from "./CheckOutMessage";

function CheckoutSuccess() {
	const { User, BookedTrips } = useSelector((state) => state.mainReducer);
	const [session_id, setSessionID] = useState();
	const [isLoading, setisLoading] = useState(true);
	useEffect(() => {
		const session_id = new URLSearchParams(window.location.search).get(
			"session_id"
		);
		setSessionID(session_id);
		if (BookedTrips !== null || undefined) {
			setisLoading(false);
		}
	}, [BookedTrips]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<CheckOutMessage session_id={session_id} />
			)}
		</>
	);
}

export default CheckoutSuccess;

// useEffect(() => {
// 	const session_id = new URLSearchParams(window.location.search).get(
// 		"session_id"
// 	);
// 	setSessionID(session_id);

// 	if (User) {
// 		const getBookedCar = async () => {
// 			await getDocs(
// 				query(
// 					collection(db, "BookedVehicles"),
// 					where("uid", "==", User?.id),
// 					orderBy("timestamp", "desc")
// 				)
// 			).then((response) => {
// 				const newData = response.docs.map((doc) => {
// 					return doc.data().car;
// 				});

// 				setBookedCar(newData[0]);
// 				setisLoading(false);
// 			});
// 		};
// 		getBookedCar();
// 	}
// }, []);

// useEffect(() => {
// 	const updateCar = async () => {
// 		const profileQuery = query(
// 			collection(db, "BookedVehicles"),
// 			where("car.id", "==", bookedCar?.id)
// 		);

// 		getDocs(profileQuery).then((response) => {
// 			response.forEach((doc) => {
// 				updateDoc(doc.ref, {
// 					sessionID: sessionID,
// 				});
// 			});
// 		});
// 	};
// 	updateCar();
// }, [sessionID]);

// console.log("boo", bookedCar);

// if (User) {
// 	const getBookedCar = async () => {
// 		await getDocs(
// 			query(
// 				collection(db, "BookedVehicles"),
// 				where("uid", "==", User?.id),
// 				orderBy("timestamp", "desc")
// 			)
// 		).then((response) => {
// 			const newData = response.docs[0].data();
// 			const profileQuery = query(
// 				collection(db, "BookedVehicles"),
// 				where("car.id", "==", newData?.id)
// 			);

// 			getDocs(profileQuery).then((response) => {
// 				response.forEach((doc) => {
// 					updateDoc(doc.ref, {
// 						sessionID: session_id,
// 					});
// 				});
// 			});
// 			setBookedCar(newData);
// 			setisLoading(false);
// 		});
// 	};
// 	getBookedCar();
// }
