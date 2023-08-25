import React, { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../../Firebase/Firebase";
import {
	collection,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";

function Widgets({ data, usersPercent }) {
	const { icon, digits, isMoney, title, percent, className } = data;

	return (
		<div className="widget">
			<div className={` ${className} widgetIcon`}>{icon}</div>
			<div className="widgetText">
				<h2>{isMoney ? `$` + digits.toLocaleString() : digits}</h2>
				<p>{title}</p>
			</div>

			{percent < 0 ? (
				<>
					<div className="Percentage red">
						{Math.floor(percent) + "%"}
					</div>
				</>
			) : (
				<>
					<div className="Percentage green">
						{Math.floor(percent) + "%"}
					</div>
				</>
			)}
		</div>
	);
}

export default Widgets;
