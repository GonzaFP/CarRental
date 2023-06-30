import "./App.css";
import Home from "./Components/Home";
import BecomeHost from "./Components/BecomeHost";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/Signup";
import FirstSignup from "./Components/FirstSignup";
import ForgotPassword from "./Components/ForgotPassword";
import HowWorks from "./Components/HowWorks";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="host" element={<BecomeHost />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="firstsignup" element={<FirstSignup />} />
					<Route path="forgotpwd" element={<ForgotPassword />} />
					<Route path="howworks" element={<HowWorks />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
