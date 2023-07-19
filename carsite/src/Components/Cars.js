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
			{showPrice && (
				<PriceDetails setClose={setShowPrice} price={price} />
			)}
			<div className="allCars">
				<div className="card">
					<div className="carCard">
						<Link to={`/cars/${id}`}>
							<img src={image} alt="" />
						</Link>
						<div className="rightCard">
							{liked ? (
								<Tooltip title="Remove car from favourities.">
									<IconButton
										id="favicon"
										onClick={removeCar}>
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
							<Link to={`/cars/${id}`}>
								<h4>{title}</h4>
							</Link>
							<div className="detail">
								<StarRating id="stars" />
								<div>
									<h5>pick up at place.</h5>
									<h5>Trips: {trips}</h5>
								</div>
							</div>
							<div className="price">
								<h4>US$ {`${price} /day`}</h4>
								<p onClick={() => setShowPrice(true)}>
									Price details
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cars;
