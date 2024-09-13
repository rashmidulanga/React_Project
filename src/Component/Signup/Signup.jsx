import React from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "../Alert/alert";

// Define the validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [alertMessage, setAlertMessage] = React.useState(""); // State for alert message
  const [alertType, setAlertType] = React.useState(""); // State for alert type

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate a successful registration
    setTimeout(() => {
      setSubmitting(false);
      setAlertMessage("Registration successful!");
      setAlertType("success");
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}{" "}
      {/* Show alert */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="addUserForm">
            <div className="inputGroup">
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Enter your name"
                className="input"
              />
              <ErrorMessage name="name" component="p" className="error" />

              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your Email"
                className="input"
              />
              <ErrorMessage name="email" component="p" className="error" />

              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                className="input"
              />
              <ErrorMessage name="password" component="p" className="error" />

              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="off"
                placeholder="Confirm Password"
                className="input"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="error"
              />

              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="login">
        <p>Already have an Account?</p>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
