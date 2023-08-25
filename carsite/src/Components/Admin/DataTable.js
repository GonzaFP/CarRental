import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Styles/DataTable.css";
import { useNavigate } from "react-router-dom";
import { serverFetcher } from "../../fetcher";
import { AddToBookedTrips } from "../../Store/ReducerFunction";

function DataTable() {
	const { BookedTrips, User } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleView = async (id) => {
		navigate(`/tripdetails/${id}`);
	};

	const handleDelete = async (carID) => {
		const updatedTrips = BookedTrips.filter((trip) => {
			return trip.car.id !== carID;
		});
		dispatch(AddToBookedTrips(updatedTrips));

		const data = await serverFetcher("delete-a-booked-car", {
			carID: carID,
			uid: User?.id,
		});
	};

	const rows = BookedTrips?.map((item) => {
		const { car } = item;
		return {
			id: car.id,
			title: car.title,
			// image: car.image,
			location: car.location,
			price: car.price.toLocaleString(),
			startDate: car.date1,
			endDate: car.date2,
			days: car.numberofDays,
			totalPrice: car.totalPrice.toLocaleString(),
			status: item.status,
			sessionID: item.sessionID,
			AmountPaid: (item.AmountPaid / 100).toLocaleString(),
		};
	});

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "title", headerName: "Car", width: 130 },
		{
			field: "status",
			headerName: "Status",
			width: 100,
			renderCell: (params) => {
				return (
					<div>
						{params?.row.status == "booked" ? (
							<div className="Progress">Booked</div>
						) : params?.row.status == "progress" ? (
							<div className="pending">In progress</div>
						) : params?.row.status == "cancelled" ? (
							<div className="overdue">Cancelled </div>
						) : (
							<div className="overdue">Overdue</div>
						)}
					</div>
				);
			},
		},
		{
			field: "location",
			headerName: "Pickup-location",
			width: 120,
		},
		{
			field: "startDate",
			headerName: "Start date",
			width: 150,
		},
		{
			field: "endDate",
			headerName: "End date",
			width: 150,
		},

		{
			field: "days",
			headerName: "Total days",
			width: 80,
		},
		{
			field: "price",
			headerName: "Price/day",
			width: 70,
		},

		{
			field: "totalPrice",
			headerName: "Total price",
			width: 100,
		},

		{
			field: "AmountPaid",
			headerName: "Amount paid",
			width: 100,
		},

		{
			field: "actions",
			headerName: "Actions",

			sortable: false,
			width: 200,
			renderCell: (params) => {
				return (
					<div className="actionButtons">
						<button
							className="View"
							onClick={() => handleView(params.row.id)}>
							View
						</button>
						<button
							className="Delete"
							onClick={() => handleDelete(params.row.id)}>
							Delete
						</button>
					</div>
				);
			},
		},
	];
	return (
		<div
			style={{
				overflow: "hidden",
			}}>
			<div
				style={{
					display: "table",
					tableLayout: "fixed",
					height: 400,
					width: "100%",
				}}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
					checkboxSelection
				/>
			</div>
		</div>
	);
}

export default DataTable;
