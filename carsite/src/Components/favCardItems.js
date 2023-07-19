import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/FavCard.css";
import StarRating from "./StarRating";
import { BsFillHeartFill } from "react-icons/bs";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveFavModal from "./RemoveFavModal";

function FavCardItems(props) {
	const [openModal, setOpenModal] = useState(false);
	const { image, title, price, trips, rating, id } = props.item;

	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "unset";
	}, [openModal]);

	return (
		<>
			{openModal && <RemoveFavModal showModal={setOpenModal} id={id} />}
			<div className="fav">
				<div className="card">
					<Link>
						<div className="carCard">
							<img src={image} />
							<Tooltip title="Remove car from favourities.">
								<IconButton
									id="favicon"
									onClick={() => setOpenModal(true)}>
									<BsFillHeartFill />
								</IconButton>
							</Tooltip>
							<h4>{title}</h4>
							<div className="detail">
								<StarRating id="stars" />
								<h5>Trips: {trips}</h5>
							</div>
							<h4 id="price">US$ {`${price} /day`}</h4>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export default FavCardItems;
