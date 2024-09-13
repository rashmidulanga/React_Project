import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "../Alert/alert";

// Define the validation schema with Yup
const validationSchema = Yup.object({
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
});

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [alertMessage, setAlertMessage] = React.useState(""); // State for alert message
  const [alertType, setAlertType] = React.useState(""); // State for alert type

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    // Simulate a successful login
    setTimeout(() => {
      setSubmitting(false);
      setAlertMessage("Login successful!");
      setAlertType("success");

      // Redirect to the Todo List after login success
      setTimeout(() => {
        navigate("/todo"); // Redirect to Todo list page
      }, 2000);
    }, 1000);
  };

  return (
    <div className="addUser">
      <h3>Sign In</h3>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}{" "}
      {/* Show alert */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="addUserForm">
            <div className="inputGroup">
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
                placeholder="Enter your Password"
                className="input"
              />
              <ErrorMessage name="password" component="p" className="error" />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="login">
        <p>Don't have an Account?</p>
        <Link to="/" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
