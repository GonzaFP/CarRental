import React from "react";
import { HostData } from "../Data/HostData";
import HostCard from "./HostCard";
import { responsiveHost } from "../Data/ResponsiveData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Hosts() {
	let Host = HostData.map((item, index) => {
		return <HostCard host={item} key={index} />;
	});
	return (
		<div className="hostcontainer">
			<h2>Meet the hosts</h2>
			<h3>Top hosts on CarRental </h3>
			<Carousel responsive={responsiveHost}>{Host}</Carousel>
		</div>
	);
}

export default Hosts;
