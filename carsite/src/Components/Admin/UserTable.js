import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { serverFetcher } from "../../fetcher";
import { AddAllUsers } from "../../Store/ReducerFunction";
import { Avatar } from "@material-ui/core";

function UserTable() {
	const { AllUsers } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleViewUser = async (id) => {
		navigate(`/summary/userprofile/${id}`);
	};

	const handleDeleteUser = async (id) => {
		const updatedUsers = AllUsers.filter((user) => {
			console.log("user", user);
			return user.Profile.id !== id;
		});
		console.log("update", updatedUsers);
		dispatch(AddAllUsers(updatedUsers));

		await serverFetcher("delete-user", {
			uid: id,
		});
	};

	const rows = AllUsers?.map((user) => {
		const { Profile } = user;

		const { id, name, photo, email } = Profile;
		return {
			id: id,
			name: name,
			avatar: photo,
			email: email,
		};
	});

	const columns = [
		{
			field: "avatar",
			headerName: "Avatar",
			width: 100,
			renderCell: (params) => {
				return <Avatar src={params.row.avatar} />;
			},
		},
		{ field: "id", headerName: "ID", width: 300 },
		{ field: "name", headerName: "Name", width: 130 },

		{
			field: "email",
			headerName: "Email",
			width: 200,
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
							onClick={() => handleViewUser(params.row.id)}>
							View
						</button>
						<button
							className="Delete"
							onClick={() => handleDeleteUser(params.row.id)}>
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
			<div style={{ height: 400, width: "100%", marginLeft: "100px" }}>
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

export default UserTable;
