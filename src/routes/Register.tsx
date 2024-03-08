import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTextComponent from "../components/Common/ErrorTextComponent";
import useAuthProvider from "../hooks/useAuthProvider";

interface ResponseMessageType {
  message: string;
  isSuccess: boolean | undefined;
}
const Register = () => {
  const [responseMessage, setResponseMessage] = useState<ResponseMessageType>({
    message: "",
    isSuccess: undefined,
  });
  const navigate = useNavigate();
  const { registerUser } = useAuthProvider();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      setIsSubmitted(true);
      const response = await registerUser(values);
      if (response) {
        if (response?.message && response?.success === true) {
          setResponseMessage({
            message: response.message,
            isSuccess: true,
          });
          setTimeout(() => {
            navigate("/verify-email", { replace: true });
          }, 1000);
          setIsSubmitted(false);

        } else {
          setResponseMessage({
            message: response.message,
            isSuccess: false,
          });
          setIsSubmitted(false);
        }
      }
    },
  });

  //   const navigate = useNavigate();
  console.log(responseMessage.message);
  const InputField =
    "rounded-md h-10 mb-4 w-full p-2 border-[1px] border-slate-500";
  const InputFieldError =
    "rounded-md h-10 mb-4 w-full p-2 border-[1px] border-red-500";
  const LoginButton = "rounded-md h-10 mb-4 w-full bg-primary text-white";

  return (
    <div className="flex flex-row items-center justify-center h-[100vh] w-full bg-slate-300">
      <div className="BoxContainer lg:w-1/3 md:w-1/2 w-[300px] h-fit py-6 bg-white shadow-lg rounded-md ">
        <h2 className="text-2xl font-bold text-left px-4 mb-4">
          Welcome to Task Management System!
        </h2>
        <p className="text-left px-4 mb-4">
          Please Register to continue using the application.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-10/12 mx-auto  justify-center"
        >
          <label
            htmlFor="username"
            className="text-left text-sm w-full  opacity-60"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={
              touched.username && errors.username ? InputFieldError : InputField
            }
            value={values.username}
            onChange={handleChange}
          />
          <ErrorTextComponent
            touched={touched.username}
            errors={errors.username}
          />
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
            placeholder="email"
            className={
              touched.email && errors.email ? InputFieldError : InputField
            }
            value={values.email}
            onChange={handleChange}
          />
          <ErrorTextComponent touched={touched.email} errors={errors.email} />{" "}
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
          <label
            htmlFor="confirmPassword"
            className="text-left text-sm w-full opacity-60 "
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className={
              touched.confirmPassword && errors.confirmPassword
                ? InputFieldError
                : InputField
            }
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <ErrorTextComponent
            touched={touched.confirmPassword}
            errors={errors.confirmPassword}
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
          <button
            type="submit"
            disabled={isSubmitted ? true : false}
            className={LoginButton}
          >
            {isSubmitted ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
