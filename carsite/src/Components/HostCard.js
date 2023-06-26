import React from "react";
import "./Styles/hosts.css";
function HostCard(props) {
	const { name, image, date, customer, message, trips } = props.host;
	return (
		<div className="hosts">
			<div className="profile">
				<img src={image} alt="" />

				<div className="trips">
					<div className="name">{name}</div>
					<div className="trip">{trips} trips.</div>
				</div>
			</div>

			<p>"{message}"</p>
			<div className="customer">
				<p>
					{customer} -<span>{date}</span>
				</p>
			</div>
		</div>
	);
}

export default HostCard;
