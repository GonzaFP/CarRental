import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavCar } from "../Store/ReducerFunction";
import { removeFavCar } from "../Store/ReducerFunction";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { BsFillHeartFill, BsDot } from "react-icons/bs";
import { MdSanitizer, MdLocationPin } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveCar } from "../Data/ResponsiveData";
import "./Styles/carDetails.css";
import StarRating from "./StarRating";
import PriceDetails from "./PriceDetails";
import { useNavigate } from "react-router-dom";

function CarDetails(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { User, favCar } = useSelector((state) => state.mainReducer);
	const [itemsToShow, setitemsToShow] = useState(4);
	const [featuretoggle, setFeatureToggle] = useState(false);
	const [showspecs, setShowSpecs] = useState(false);
	const [specstoggle, setSpecsToggle] = useState(false);
	const [showPrice, setShowPrice] = useState(false);
	const [liked, setLiked] = useState(false);
	const {
		id,
		title,
		images,
		baseUrl,
		image,
		price,
		description,
		specs,
		features,
		host,
		photo,
		trips,
		joined,
		rating,
	} = props.item;

	const handleFavCars = () => {
		if (User && !liked) {
			dispatch(addFavCar({ image, title, price, trips, rating, id }));
			setLiked(true);
		} else if (User && liked) {
			dispatch(removeFavCar(id));
			setLiked(false);
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
	const imageItem = images?.map((item, index) => (
		<img
			src={`${baseUrl}${item}`}
			alt=""
			key={index}
			className="carImage"
		/>
	));

	const handleFeatures = () => {
		if (featuretoggle) {
			setitemsToShow(features.length);
			setFeatureToggle(!featuretoggle);
			return;
		}
		setitemsToShow(4);
		setFeatureToggle(!featuretoggle);
	};

	const handleSpecs = () => {
		setShowSpecs(!showspecs);

		setSpecsToggle(!specstoggle);
	};
	const specsData = specs.map((item, index) => {
		return <p key={index}>{item}</p>;
	});

	const featureData = features.slice(0, itemsToShow).map((item, index) => {
		return <p key={index}>{item}</p>;
	});
	return (
		<div className="carDetails">
			<div className="caroul">
				{liked ? (
					<Tooltip title="Remove car from favourities.">
						<IconButton
							id="favicon"
							className="likeicon"
							onClick={handleFavCars}>
							<BsFillHeartFill />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Add car to favourites">
						<IconButton
							id="icon"
							className="likeicon"
							onClick={handleFavCars}>
							<MdOutlineFavoriteBorder />
						</IconButton>
					</Tooltip>
				)}
				<Carousel responsive={responsiveCar}>{imageItem}</Carousel>
			</div>
			<div className="body">
				<div className="leftside">
					<div className="header">
						<h1>{title}</h1>
						<div className="specs">{specsData}</div>
					</div>

					<div className="hostdetails">
						<div className="hostedby">
							<h4 className="subtitle">Hosted by </h4>
						</div>
						<div className="hostprofile">
							<div className="hostpic">
								<img src={photo} alt="" />
							</div>
							<div className="hostname">
								<h4>{host}</h4>
								<div className="tripdetails">
									<span>{`${trips} trips`}</span>
									<span>
										<BsDot id="icon" />
									</span>
									<span>{`Joined ${joined}`}</span>
								</div>
								<p id="respond">
									Typically responds within 1 minute.
								</p>
							</div>
						</div>
					</div>

					<div className="training">
						<span className="overviewIcon">
							<MdSanitizer />
						</span>
						<span>
							{`${host} has completed training on enhanced cleaning
							and disinfection practices.`}
						</span>
					</div>

					<div className="description">
						<h4 className="subtitle">description</h4>
						<span>
							<MdLocationPin className="overviewIcon" />
						</span>
						<span>
							Pick up from Temple Fortune, NW11. Close to North
							Circular.
						</span>
						<p>
							{showspecs
								? description
								: `${description.substring(0, 132)}`}
						</p>
						<div className="moreBtn">
							<button onClick={handleSpecs}>
								{specstoggle ? "Less" : "More"}
							</button>
						</div>
					</div>

					<div className="features">
						<h4 className="subtitle">Features</h4>
						<div className="featureData">{featureData}</div>
						<div className="moreBtn">
							<button onClick={handleFeatures}>
								{featuretoggle ? "More" : "Less"}
							</button>
						</div>
					</div>

					<div className="guidelines">
						<h4 className="subtitle">Guidelines</h4>
						<p>
							Please do not eat or drink in the car, because it
							creates a mess.
						</p>
					</div>

					<div className="ratings">
						<h4 className="subtitle">Ratings and Reviews</h4>
						<div className="hostprofile">
							<div className="hostpic">
								<img src="/host5.jpg" alt="" />
							</div>
							<div className="hostname">
								<StarRating id="stars" value={rating} />
								<div className="reviewdetails">
									<span>Jonathan</span>
									<span id="date">27 June 2023</span>
								</div>
								<p id="review">
									{`${host} was really helpful and honest.
									definitely will rent from him in the future!`}
								</p>
							</div>
						</div>
					</div>

					<div className="ratings">
						<div className="hostprofile">
							<div className="hostpic">
								<img src="/host10.jpg" alt="" />
							</div>
							<div className="hostname">
								<StarRating id="stars" value={rating} />
								<div className="reviewdetails">
									<span>Joanna</span>
									<span id="date">10 May 2023</span>
								</div>
								<p id="review">
									Great communication throughout. The car was
									a comfortable ride with enough space for 4
									suitcases. All around a positive experience!
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="rightside">
					<div className="price">
						<span id="cutprice">&pound;200</span>
						<span id="unitprice">&pound;{price}</span>
						<span> / day</span>
						{/* <button onClick={() => setShowPrice(true)}>
							Price details
						</button> */}
					</div>

					<div className="form">
						<form>
							<h3>Trip start</h3>
							<input type="date" />
							<h3>Trip end</h3>
							<input type="date" />
							<h4>Pickup & return location </h4>
							<input type="text" />
							<p>
								We’ll send you the exact address once your trip
								is booked.
							</p>
							<button>Continue</button>
						</form>
					</div>

					<div className="cancel">
						<AiOutlineLike id="likeIcon" />
						<div>
							<h4>Free cancellation</h4>
							<p>Full refund for the next 1 hour.</p>
						</div>
					</div>

					<div className="distance">
						<div className="distancelabel">
							<h4>Distance included</h4>
							<div>
								<h4>600 mi</h4>
							</div>
						</div>
						<p> &pound;0.22/mi fee for additional miles driven</p>
					</div>
					<div className="insurancepolicy">
						<h4 className="subtitle">Insurance & Protection</h4>
						<p>Insurance via DDD</p>
					</div>

					<div className="addFac">
						<button onClick={handleFavCars}>
							<span>
								{liked ? (
									<Tooltip title="Remove car from favourities.">
										<IconButton id="Btnfavicon">
											<BsFillHeartFill />
										</IconButton>
									</Tooltip>
								) : (
									<Tooltip title="Add car to favourites">
										<IconButton>
											<MdOutlineFavoriteBorder />
										</IconButton>
									</Tooltip>
								)}
							</span>
							{liked
								? "Remove from favourites"
								: "	Add to favourites"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CarDetails;
