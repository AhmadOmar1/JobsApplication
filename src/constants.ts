import * as Yup from "yup";

export const LOGIN_VALIDATION_SCHEMA = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(4, "Password must be at least 6 characters").required("Required"),
});