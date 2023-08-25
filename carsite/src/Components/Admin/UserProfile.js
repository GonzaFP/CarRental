import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import "../../Components/Styles/UserProfileStyles.css";
import { Avatar } from "@material-ui/core";

function UserProfile({ user, license, userCars }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (
			user !== undefined ||
			license !== undefined ||
			userCars?.length > 0
		) {
			setLoading(false);
		}
	}, [user]);

	console.log("li", license);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div>
					<div className="userProfileContainer">
						<div className="userProfileDiv profileDiv">
							<h2>User profile</h2>
							<Avatar
								src={user?.photo}
								sx={{
									width: 200,
									height: 200,
								}}
								className="profileAvatar"
							/>
							<p>{`Name: ${user?.name}`}</p>
							<p>{`Email: ${user?.email}`}</p>
							<p>{`User id: ${user?.id}`}</p>
							<p>{`Approved to drive: ${user?.approvedToDrive}`}</p>
							<p>{`Send notifications: ${user?.sendNotification}`}</p>
						</div>

						{license !== null && (
							<div className="userLicenseDiv profileDiv">
								<h2>Driving licence</h2>
								<p>{`First name: ${license?.firstName}`}</p>
								<p>{`Middle name: ${license?.middleName}`}</p>
								<p>{`Last name: ${license?.lastName}`}</p>
								<p>{`Country: ${license?.country}`}</p>
								<p>{`Licence number: ${license?.licenseNumber}`}</p>
								<p>{`Expiration date: ${license?.ExpirationDate}`}</p>
							</div>
						)}
					</div>

					{userCars?.length > 0 && (
						<>
							<h2 className="tripsBooked">Trips booked</h2>
							<div className="userOrders">
								{userCars.map((item, index) => {
									const {
										car: {
											title,
											image,
											location,
											date1,
											date2,
											price,
											totalPrice,
										},
										AmountPaid,
									} = item;
									return (
										<div className="profileDiv" key={index}>
											<h2>{`${title}`}</h2>
											<img src={image} />
											<p>{`Location: ${location}`}</p>
											<p>{`Trip starts: ${date1}`}</p>
											<p>{`Trip ends: ${date2}`}</p>
											<p>{`Price/day: $${price}`}</p>
											<p>{`Total: $${totalPrice}`}</p>
											<p>{`Amount paid: $${AmountPaid}`}</p>
										</div>
									);
								})}
							</div>
						</>
					)}
				</div>
			)}{" "}
		</>
	);
}

export default UserProfile;
