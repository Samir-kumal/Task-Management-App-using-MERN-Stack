import { SetStateAction, useEffect, useState } from "react";
import Button from "../components/Button";
import useAuthProvider from "../hooks/useAuthProvider";
import ProfileIcon from "../components/svgs/ProfileIcon";
import SecurityIcon from "../components/svgs/SecurityIcon";
import EditIcon from "../components/svgs/EditIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTextComponent from "../components/Common/ErrorTextComponent";
import axios,{AxiosError} from "axios";
import { URL } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/svgs/DeleteIcon";

const token = localStorage.getItem("token");

const UserProfile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFormInput, setIsFormInput] = useState(false);
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    isSuccess: false,
  });
  const { user, logout, getUserData } = useAuthProvider();
  const username = user?.userName;
  const email = user?.userEmail;

  useEffect(() => {
    getUserData();
  }, []);

  //function to validate user password
  const validateUserPassword = async () => {
    if (token && email) {
      try {
        const response = await axios.post(
          `${URL}/validateUserPassword`,
          {
            email: email,
            password: values.oldPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log(data);

        updateUserPassword();
      } catch (error:AxiosError | any) {
        console.log(error.response.data.message);
        setResponseMessage({
          message: error.response.data.message,
          isSuccess: false,
        });
      }
    }
  };

  //function to update user password
  const updateUserPassword = async () => {
    if (token && email) {
      try {
        const response = await axios.put(
          `${URL}/updatePassword`,
          {
            email: email,
            password: values.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log(data);
        setResponseMessage({
          message: data.message,
          isSuccess: true,
        });
        logout();
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error:AxiosError | any) {
        console.log(error.response.data.message);
        setResponseMessage({
          message: error.response.data.message,
          isSuccess: false,
        });
      }
    }
  };
  console.log(email, token);

  // function to update user name
  const updateUserName = async () => {
    if (!token && !email) {
      console.error("token and email not found");
      return;
    }
    try {
      console.log("clicked 2");
      const response = await axios.put(
        `${URL}/updateUserName`,
        {
          email: email,
          name: values.username ? values.username : username,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log(data);
      setResponseMessage({
        message: data.message,
        isSuccess: true,
      });
      logout();
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 500);
    } catch (error:AxiosError | any) {
      console.log(error.response.data.message);
    }
  };


  // function to delete user
  const deleteUser = async () => {
    if (token && email) {
      try {
        const response = await axios.delete(
          `${URL}/deleteUser`,

          {
            headers: { Authorization: `Bearer ${token}` },
            data: { email: email },
          }
        );
        const data = response.data;
        console.log(data);
          alert(data.message)
        logout();
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error: AxiosError | any) {
        console.log(error.response.data.message);
      }
    }
  };


  // formik form for user profile update
  const {
    values,
    initialValues,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      username: username && username,
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      oldPassword: Yup.string().required("Password is required"),
      newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: () => {
      console.log("submitted");
    },
  });
  const options = ["Account", "Security"];
  console.log(user);
  const handleClick = (index: SetStateAction<number>) => {
    console.log("clicked");
    setSelectedIndex(index);
    setIsFormInput(false);
  };
  return (
    <div className="bg-primary/10 flex lg:flex-row md:flex-row flex-col h-lvh w-lvw">
      <div className="md:w-1/4 w-full border-r-2 border-black/10 md:h-full bg-white flex flex-col gap-y-2 items-center">
        <div className="w-full  flex flex-col items-center mt-20">
          {options.map((item, index) => (
            <Button
              onClick={() => handleClick(index)}
              key={index}
              style={` ${
                index === selectedIndex ? "bg-black/10" : "bg-white"
              } w-10/12 mx-2 rounded-lg flex flex-row items-center justify-center p-2 gap-x-2 text-black`}
            >
              {index === 0 ? <ProfileIcon /> : <SecurityIcon />}   
              {item}
            </Button>
                                            //  Change the icon based on Index.
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start relative justify-center w-full h-screen">
        <div className="absolute top-10 left-8">
          <h1 className="lg:text-6xl md:text-5xl text-4xl "> Account</h1>
          <h2 className="text-lg text-black/30">
            Manage Your Account Information
          </h2>
        </div>
        <div className="absolute right-0 bottom-0 bg-red-500 text-white rounded-md m-2">
          <Button
            onClick={() => deleteUser()}
            style="text-sm flex items-center "
          >
            <DeleteIcon />
            Delete User
          </Button>
        </div>
        {selectedIndex === 0 ? (
          <section className=" flex flex-col  items-end">
            <form className="bg-white p-4 rounded-lg flex flex-col shadow-lg h-42 ml-6">
              <h1 className="md:text-2xl text-xl font-bold mb-8">
                User Account Information
              </h1>
              <label htmlFor="username" className="">
                Username:
                {!isFormInput ? (
                  <span className="font-bold px-2">
                    {username ? username : "unavailable"}
                  </span>
                ) : (
                  <>
                    <input
                      className={`border-2 p-1 m-1 rounded-md ${
                        touched.username && errors.username
                          ? "border-red-500"
                          : "border-black/10"
                      }`}
                      type="text"
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="h-4 mt-3 w-full flex flex-row justify-center">
                      <ErrorTextComponent
                        align="center"
                        touched={touched.username}
                        errors={errors.username}
                      />
                    </div>
                  </>
                )}
              </label>
              <p
                className={` text-xs ${
                  responseMessage.isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {responseMessage.message}
              </p>
              <label htmlFor="email" className="my-2">
                Email:
                <span className="font-bold px-2 ">
                  {email ? email : "unavailable"}{" "}
                </span>
              </label>
            </form>
            <div></div>
            <div className="flex w-full justify-end">
              {isFormInput && (
                <Button
                  onClick={() => {
                    updateUserName();
                    console.log("clicked");
                  }}
                  disabled={
                    values.username === initialValues.username ||
                    errors.username
                      ? true
                      : false
                  }
                  style={`${
                    values.username === initialValues.username ||
                    errors.username
                      ? "bg-black/60 "
                      : "bg-red-500"
                  }  rounded-md text-white text-xs m-1`}
                >
                  Update
                </Button>
              )}
              <Button
                onClick={() => {
                  setIsFormInput(!isFormInput);
                }}
                style="w-1/3 text-[10px] flex flex-row items-center gap-x-2 rounded-md bg-primary/60 m-1 "
              >
                {" "}
                <EditIcon /> Edit Information
              </Button>
            </div>
          </section>
        ) : (
          <section className=" flex flex-col  items-end">
            <form className="bg-white p-4 rounded-lg flex flex-col shadow-lg h-42 ml-6">
              <h1 className="text-2xl font-bold mb-8">Security Information</h1>
              <div className="">
                {!isFormInput ? (
                  <>
                    <label htmlFor="username">Password</label>
                    <span className="font-bold px-2">{"**********"}</span>
                  </>
                ) : (
                  <>
                    <label className="text-sm px-2" htmlFor="oldPassword">
                      Old Password:
                    </label>
                    <input
                      className={`border-2 p-1 rounded-md ${
                        touched.oldPassword && errors.oldPassword
                          ? "border-red-500"
                          : "border-black/10"
                      }`}
                      type="oldPassword"
                      id="oldPassword"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="h-fit mt-4 flex justify-end">
                      <ErrorTextComponent
                        align="center"
                        touched={touched.oldPassword}
                        errors={errors.oldPassword}
                      />
                    </div>
                    <label className="text-sm px-2" htmlFor="username">
                      New Password:
                    </label>
                    <input
                      className={`border-2 p-1 rounded-md ${
                        touched.newPassword && errors.newPassword
                          ? "border-red-500"
                          : "border-black/10"
                      }`}
                      type="newPassword"
                      id="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="h-fit  mt-4 flex justify-end">
                      <ErrorTextComponent
                        align="center"
                        touched={touched.newPassword}
                        errors={errors.newPassword}
                      />
                    </div>
                  </>
                )}
              </div>
              <p
                className={` text-xs ${
                  responseMessage.isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {responseMessage.message}
              </p>
            </form>
            <div className="flex w-full justify-end">
              {isFormInput && (
                <Button
                  onClick={() => {
                    validateUserPassword();
                  }}
                  disabled={
                    values.oldPassword.length === 0 ||
                    values.newPassword.length === 0
                      ? true
                      : false
                  }
                  style={`${
                    values.oldPassword.length === 0 ||
                    values.newPassword.length === 0
                      ? "bg-black/60"
                      : "bg-red-500"
                  }  rounded-md text-white text-xs m-1`}
                >
                  Update
                </Button>
              )}
              
              <Button
                onClick={() => {
                  setIsFormInput(!isFormInput);
                }}
                style="w-1/3 text-[10px] flex flex-row items-center gap-x-2 rounded-md bg-primary/60 m-1 "
              >
                {" "}
                <EditIcon /> Edit Password
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
