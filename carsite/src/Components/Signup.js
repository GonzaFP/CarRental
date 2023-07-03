import React from "react";
import "./Styles/signup.css";
import { auth } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "../Features/Schema";
import { yupResolver } from "@hookform/resolvers/yup";

function SignUp() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		const { email, password, firstName, lastName, notify, terms } = data;
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		updateProfile(user, { displayName: `${firstName} ${lastName}` });
		console.log(user);
		navigate(-1);
	};
	return (
		<div className="signupContainer">
			<h2>Create an account</h2>
			<form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
				<div className="name">
					<div
						className={
							errors.firstName ? "highlight" : "firstname"
						}>
						<span>First name</span>
						<input type="text" {...register("firstName")} />
						<span className="error">
							{errors.firstName?.message}
						</span>
					</div>
					<div className={errors.lastName ? "highlight" : "lastname"}>
						<span>Last name</span>
						<input type="text" {...register("lastName")} />
						<span className="error">
							{errors.lastName?.message}
						</span>
					</div>
				</div>

				<span className="driverName">
					Enter your name as it appears on your driver's license
				</span>

				<div className={errors.email ? "highlights" : "mail"}>
					<span>Email</span>
					<input type="text" {...register("email")} />
					<span className="error">{errors.email?.message}</span>
				</div>

				<div className={errors.password ? "highlights" : "password"}>
					<span>Password</span>
					<input type="password" {...register("password")} />
					<span className="error">{errors.password?.message}</span>
				</div>

				<div
					className={
						errors.confirmPassword ? "highlights" : "password"
					}>
					<span>Confirm Password</span>
					<input type="password" {...register("confirmPassword")} />
					<span className="error">
						{errors.confirmPassword?.message}
					</span>
				</div>

				<div className="checkbox">
					<div className="check">
						<input type="checkbox" {...register("terms")} />

						<span>
							I agree to the{" "}
							<span
								className={
									errors.password ? "redterms" : "terms"
								}>
								terms of service{" "}
							</span>{" "}
							and{" "}
							<span
								className={
									errors.password ? "redterms" : "terms"
								}>
								privacy policy.
							</span>
						</span>
					</div>
					<span className="error">{errors.terms?.message}</span>
					<div className="check">
						<input type="checkbox" {...register("notify")} />
						<span>Yes, send me deals, discounts, and updates!</span>
					</div>
				</div>

				<button>Sign up</button>
			</form>
			<div className="login">
				<p>Already have an account?</p>
				<button onClick={() => navigate("/signin")}>Log in</button>
			</div>
		</div>
	);
}

export default SignUp;
