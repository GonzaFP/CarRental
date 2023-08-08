import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import BecomeHost from "./Components/BecomeHost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./Firebase/Firebase";

import Layout from "./Components/Layout";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/Signup";
import FirstSignup from "./Components/FirstSignup";
import ForgotPassword from "./Components/ForgotPassword";
import HowWorks from "./Components/HowWorks";
import Favourites from "./Components/Favourites";

import Inbox from "./Components/Inbox";
import Booked from "./Components/Booked";
import History from "./Components/History";
import SharedDropdowm from "./Components/SharedDropdown";
import SharedInbox from "./Components/SharedInbox";
import Messages from "./Components/Messages";
import Notify from "./Components/Notify";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import Accounts from "./Components/Accounts";
import ChangePassword from "./Components/ChangePassword";
import MobilePhone from "./Components/MobilePhone";
import Approved from "./Components/Approved";
import CarModels from "./Components/CarModels";
import PriceDetails from "./Components/PriceDetails";
import CarDetails from "./Components/CarDetails";
import CarInfo from "./Components/CarInfo";
import BrowseCars from "./Components/BrowseCars";
import "./Components/Styles/GlobalStyles.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getInitials, login, logout } from "./Store/ReducerFunction";
import { PiSunThin } from "react-icons/pi";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authuser) => {
			if (authuser) {
				const profileQuery = query(
					collection(db, "users"),
					where("user.id", "==", authuser.uid)
				);
				getDocs(profileQuery).then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						dispatch(login(doc.data().user));
					});
				});
				dispatch(getInitials(authuser.displayName));
			} else {
				dispatch(logout());
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="host" element={<BecomeHost />} />
						<Route path="signin" element={<SignIn />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="firstsignup" element={<FirstSignup />} />
						<Route path="forgotpwd" element={<ForgotPassword />} />
						<Route path="howworks" element={<HowWorks />} />

						<Route path="approved" element={<Approved />} />
						<Route path="pricedetails" element={<PriceDetails />} />
						<Route path="browsecars" element={<BrowseCars />} />
						<Route path="model/:modelId" element={<CarModels />} />
						<Route path="cars/:carId" element={<CarInfo />} />
						<Route
							path="changepassword"
							element={<ChangePassword />}
						/>

						<Route element={<ProtectedRoute />}>
							<Route path="messages" element={<SharedInbox />}>
								<Route index element={<Messages />} />
								<Route
									exact
									path="messages/notify"
									element={<Notify />}
								/>
							</Route>

							<Route path="profile" element={<Profile />} />
							<Route
								path="editprofile"
								element={<EditProfile />}
							/>
							<Route path="favourites" element={<Favourites />} />
							<Route path="accounts" element={<Accounts />} />
							<Route path="booked" element={<SharedDropdowm />}>
								<Route index element={<Booked />} />
								<Route
									exact
									path="booked/history"
									element={<History />}
								/>
							</Route>

							<Route path="messages" element={<SharedInbox />}>
								<Route index element={<Messages />} />
								<Route
									path="messages/notify"
									element={<Notify />}
								/>
							</Route>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
