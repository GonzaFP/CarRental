import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./Styles/CancelBookModal.css";
import { useDispatch } from "react-redux";
import { updateBookedTrips } from "../Store/ReducerFunction";
import { serverFetcher } from "../fetcher";

function CancelBookModal({
	setShowCancel,
	setIsCancel,
	chargeextra,
	cancelPrice,
	SessionID,
	created,
}) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleCancel = async () => {
		setLoading(true);
		dispatch(
			updateBookedTrips({
				type: "status",
				value: {
					amountPaid: cancelPrice,
					status: "cancelled",
				},
			})
		);
		/*
		! if a user cancels later than start date, charge them
		! 20% of unit price
		*/
		if (chargeextra === true && SessionID !== null) {
			const data = await serverFetcher("charge-cancel-fee", {
				session_id: SessionID,
				amount: cancelPrice * 100,
				isAdmin: false,
				id: created,
				status: "cancelled",
			});
		}
		setIsCancel(true);
		setShowCancel(false);
		setLoading(false);
	};

	return (
		<div className="CancelBookModal">
			<div className="CancelBookClear">
				<ClearOutlinedIcon onClick={() => setShowCancel(false)} />
			</div>
			<div className="CancelBookTitle">
				<h2>Proceed to cancel?</h2>
			</div>

			<div className="CancelBookBody">
				{chargeextra === true && (
					<p>{`If you proceed now, we will charge you $${cancelPrice}`}</p>
				)}
				{chargeextra === false && <p>We are sorry.</p>}
			</div>

			<div className="CancelBookBtns">
				<button onClick={() => setShowCancel(false)}>cancel</button>
				<button
					onClick={handleCancel}
					disabled={loading}
					className={loading && `disabledBtn`}>
					{loading ? "Processing" : "proceed"}
				</button>
			</div>
		</div>
	);
}

export default CancelBookModal;
