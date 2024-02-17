import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTextComponent from "../components/Common/ErrorTextComponent";
import useAuthProvider from "../hooks/useAuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login, responseMessage } = useAuthProvider();
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

        
          <button type="submit" className={LoginButton}>
            Login
          </button>
          <p className="text-xs">OR</p>
          <button
            onClick={() => navigate("/register")}
            className=" text-md text-center w-full opacity-60 font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
