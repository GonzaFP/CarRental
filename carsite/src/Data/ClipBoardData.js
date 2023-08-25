import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";

export const ClipBoardData = [
	{
		icon: <FaUsers />,
		digits: 50,
		isMoney: false,
		title: "Users",
		color: "rgb(102, 108, 255)",
		bgColor: "rgba(102, 108, 255, 0.12)",
		percent: 30,
		className: "Users",
	},
	{
		icon: <FaClipboard />,
		digits: 100,
		isMoney: false,
		title: "Orders",
		color: "rgb(38, 198, 249)",
		bgColor: "rgba(38, 198, 249, 0.12)",
		percent: 30,
		className: "ClipBoard",
	},
	{
		icon: <FaChartBar />,
		digits: 50000,
		isMoney: true,
		title: "Earnings",
		color: "rgb(253, 181, 40)",
		bgColor: " rgba(253, 181, 40, 0.8)",
		percent: 30,
		className: "Chart",
	},
];
