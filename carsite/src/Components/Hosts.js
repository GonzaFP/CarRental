import React from "react";
import { topHosts } from "../Data/HostData";
import HostCard from "./HostCard";
import { responsiveHost } from "../Data/ResponsiveData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Hosts() {
	let Host = topHosts.map((item, index) => {
		return <HostCard host={item} key={index} />;
	});

	return (
		<div className="topHostSection">
			<div className="topHostTitle">
				<h1>Meet the hosts</h1>
				<h5>Top hosts on CarRental </h5>
			</div>
			<div className="topHosts">{Host}</div>
		</div>
	);
}

export default Hosts;
