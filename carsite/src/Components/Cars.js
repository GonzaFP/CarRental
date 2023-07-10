import React, { useEffect, useState } from "react";
import "./Styles/Cars.css";
import StarRating from "./StarRating";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import PriceDetails from "./PriceDetails";
import { useDispatch, useSelector } from "react-redux";
import { addFavCar } from "../Store/ReducerFunction";
import { BsFillHeartFill } from "react-icons/bs";
import { removeFavCar } from "../Store/ReducerFunction";

function Cars(props) {
	const [showPrice, setShowPrice] = useState(false);
	const { image, title, price, trips, rating, id } = props.car;
	const dispatch = useDispatch();
	const { User, favCar } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	const [liked, setLiked] = useState(false);

	const removeCar = () => {
		dispatch(removeFavCar(id));
		setLiked(false);
	};

	const handleFav = () => {
		if (User) {
			dispatch(addFavCar({ image, title, price, trips, rating, id }));
			setLiked(true);
		} else {
			navigate("/signin");
		}
	};

	useEffect(() => {
		const handleLiked = (a) => {
			favCar.map((item) => {
				if (item.id === a) {
					setLiked(true);
					return;
				}
			});
		};
		handleLiked(id);
	}, []);

	useEffect(() => {
		document.body.style.overflow = showPrice ? "hidden" : "unset";
	}, [showPrice]);
	return (
		<div className="carContainer">
			{showPrice && <PriceDetails setClose={setShowPrice} />}

			<div className="cars">
				<div className="carBody">
					<div className="image">
						<img src={image} alt="" />
					</div>
					<div className="carInfo">
						<h3>{title}</h3>
						{liked ? (
							<Tooltip title="Remove car from favourities.">
								<IconButton id="favicon" onClick={removeCar}>
									<BsFillHeartFill />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title="Add car to favourites">
								<IconButton id="icon" onClick={handleFav}>
									<MdOutlineFavoriteBorder />
								</IconButton>
							</Tooltip>
						)}

						<p>pick up at place.</p>
						<h4>Trips: {trips}</h4>
						<div className="price">
							<h3>&pound;{`${price}/day`}</h3>
							<p onClick={() => setShowPrice(true)}>
								Price details
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cars;
