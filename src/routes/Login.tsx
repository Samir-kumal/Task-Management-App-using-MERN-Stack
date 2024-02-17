import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTextComponent from "../components/Common/ErrorTextComponent";
import useAuthProvider from "../hooks/useAuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login, responseMessage } = useAuthProvider();
  const token = localStorage.getItem("token");
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
     
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid Email Address"),
      password: Yup.string().required("Password is required"),
    }),
  });
  console.log(responseMessage);
  // const loginUser = async (values: { email: string; password: string }) => {
  //   try {
  //     const response = await axios.post("http://localhost:9001/login", {
  //       email: values.email,
  //       password: values.password,
  //     });
  //     console.log(response.data.token);
  //     localStorage.setItem("token", response.data.token);
  //     setResponseMessage({
  //       message: "Login Successful",
  //       isSuccess: true,
  //     });
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1000);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //     setResponseMessage({
  //       message: error.response.data.message,
  //       isSuccess: false,
  //     });
  //   }
  // };

  const InputField =
    "rounded-md h-10 mb-4 w-full p-2 border-[1px] border-slate-500";
  const InputFieldError =
    "rounded-md h-10 mb-4 w-full p-2 border-[1px] border-red-500";
  const LoginButton = "rounded-md h-10 mb-4 w-full bg-slate-500 text-white";

  return (
    <div className="flex flex-row items-center justify-center h-[100vh] w-full bg-slate-300">
      <div className="BoxContainer w-1/3 h-fit py-6 bg-white shadow-lg rounded-md ">
        <h2 className="text-2xl font-bold text-left px-4 mb-4">
          Welcome to Task Management System!
        </h2>
        <p className="text-left px-4 mb-4">
          Please login to continue using the application.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-10/12 mx-auto  justify-center"
        >
          <label
            htmlFor="username"
            className="text-left text-sm w-full  opacity-60"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className={
              touched.email && errors.email ? InputFieldError : InputField
            }
            value={values.email}
            onChange={handleChange}
          />
          <ErrorTextComponent touched={touched.email} errors={errors.email} />
          <label
            htmlFor="password"
            className="text-left text-sm w-full opacity-60 "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={
              touched.password && errors.password ? InputFieldError : InputField
            }
            value={values.password}
            onChange={handleChange}
          />
          <ErrorTextComponent
            touched={touched.password}
            errors={errors.password}
          />
          {responseMessage && responseMessage.message && (
            <p
              className={`${
                responseMessage.isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {responseMessage.message}
            </p>
          )}

          <a href="#" className="text-right text-sm w-full opacity-60">
            Forgot Password?
          </a>

          <button type="submit" className={LoginButton}>
            Login
          </button>
          <p className="text-xs">OR</p>
          <button
            onClick={() => navigate("/register")}
            className=" text-md text-center w-full opacity-60"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
