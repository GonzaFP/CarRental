import React from "react";
import "../Styles/Summary.css";
import { ClipBoardData } from "../../Data/ClipBoardData";
import Widgets from "./Widgets";
import { useSelector } from "react-redux";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import RecentTranscations from "./RecentTranscations";
import AllTimeData from "./AllTimeData";

function Summary() {
	const { Stats } = useSelector((state) => state.mainReducer);
	const { userStats, bookedCarStats } = Stats || {};
	const { lastMonthUsers, currentMonthUsers } = userStats || {};
	const { lastMonthCars, currentMonthCars } = bookedCarStats || {};

	const currentUserStats = currentMonthUsers?.length;
	const prevUserStats = lastMonthUsers?.length;
	const usersPercent =
		((currentUserStats - prevUserStats) / prevUserStats) * 100;

	const currentCarStats = currentMonthCars?.length;
	const lastCarStats = lastMonthCars?.length;
	let carsPercent = ((currentCarStats - lastCarStats) / lastCarStats) * 100;

	const currentEarnings = currentMonthCars.reduce((total, currentvalue) => {
		return total + currentvalue.AmountPaid / 100;
	}, 0);

	const preEarnings = lastMonthCars.reduce((total, currentvalue) => {
		return total + currentvalue.AmountPaid / 100;
	}, 0);
	let earnPercent = ((currentEarnings - preEarnings) / preEarnings) * 100;

	if (carsPercent === Infinity) {
		carsPercent = 0;
	}
	const ClipBoardData = [
		{
			icon: <FaUsers />,
			digits: currentUserStats,
			isMoney: false,
			title: "Users",
			color: "rgb(102, 108, 255)",
			bgColor: "rgba(102, 108, 255, 0.12)",
			percent: usersPercent === Infinity ? 0 : usersPercent,
			className: "Users",
		},
		{
			icon: <FaClipboard />,
			digits: currentCarStats,
			isMoney: false,
			title: "Orders",
			color: "rgb(38, 198, 249)",
			bgColor: "rgba(38, 198, 249, 0.12)",
			percent: carsPercent === Infinity ? 0 : carsPercent,
			className: "ClipBoard",
		},
		{
			icon: <FaChartBar />,
			digits: currentEarnings,
			isMoney: true,
			title: "Earnings",
			color: "rgb(253, 181, 40)",
			bgColor: " rgba(253, 181, 40, 0.8)",
			percent: earnPercent === Infinity ? 0 : earnPercent,
			className: "Chart",
		},
	];

	return (
		<div className="summmaryContainer">
			<div className="mainStats">
				<div className="overView">
					<div className="title">
						<h2>Over view</h2>
						<p>Performance compared to last month.</p>
					</div>
					<div className="widgetWrapper">
						{ClipBoardData.map((item, index) => {
							return <Widgets key={index} data={item} />;
						})}
					</div>
				</div>
			</div>
			<div className="sideStats">
				<RecentTranscations />
				<AllTimeData />
			</div>
		</div>
	);
}

export default Summary;
