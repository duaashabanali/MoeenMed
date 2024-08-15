import * as yup from "yup";

export const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  fullName: yup.string().required("Full name is required"),
  date: yup.string().required("Date is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  streetAddress: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup
    .string()
    .required("ZIP Code is required")
    .matches(/^\d{5}$/, "ZIP Code must be exactly 5 digits"),
});
