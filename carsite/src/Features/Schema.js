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
