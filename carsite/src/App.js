import "./App.css";
import Home from "./Components/Home";
import BecomeHost from "./Components/BecomeHost";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="host" element={<BecomeHost />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
