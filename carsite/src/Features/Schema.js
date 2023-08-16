import * as yup from "yup";
export const schema = yup.object().shape({
	firstName: yup.string().required("First name is required."),
	lastName: yup.string().required("Last name is required."),
	email: yup
		.string()
		.email("Enter a valid email address.")
		.required("Enter your email address."),
	terms: yup.bool().oneOf([true], "Check our privacy policy."),
	notify: yup.bool().optional(),
	password: yup
		.string()
		.min(6, "Passwords must be at least 6 characters.")
		.required("Enter a password"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Confirm password"),
});

export const schema2 = yup.object().shape({
	where: yup.string().required("Field cannot be empty"),
	from: yup.string().required("Field cannot be empty"),
	until: yup.string().required("Field cannot be empty"),
});

export const licenseSchema = yup.object().shape({
	firstName: yup.string().required("Enter your first name"),
	lastName: yup.string().required("Enter your last name"),
	// country: yup.string().required("Please select a country"),
	licenseNumber: yup.string().required("Fill in license number"),
	ExpirationDate: yup.string().required("Select a date"),
});
