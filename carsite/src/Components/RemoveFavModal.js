import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./Styles/RemoveFav.css";
import { removeFavCar } from "../Store/ReducerFunction";
import { useDispatch } from "react-redux";

function RemoveFavModal({ showModal, id }) {
	const dispatch = useDispatch();

	const removeCar = () => {
		dispatch(removeFavCar(id));
		showModal(false);
	};

	return (
		<div className="removeFav">
			<ClearOutlinedIcon
				className="closeFav"
				onClick={() => showModal(false)}
			/>
			<div className="title">
				<h2>Remove from favourities?</h2>
			</div>
			<div className="body">
				<p>
					Are you sure you want to remove this Tesla Model 3 from your
					favorites?
				</p>
			</div>
			<div className="removeBtns">
				<div className="decline">
					<button onClick={() => showModal(false)}>cancel</button>
				</div>
				<div className="remove">
					<button onClick={removeCar}>Remove</button>
				</div>
			</div>
		</div>
	);
}

export default RemoveFavModal;
