import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const InputField =
    "rounded-md h-10 mb-4 w-10/12 p-2 border-[1px] border-slate-500";
  const LoginButton = "rounded-md h-10 mb-4 w-10/12 bg-slate-500 text-white";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
  };
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
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center w-11/12 mx-auto  justify-center"
        >
          <label
            htmlFor="username"
            className="text-left text-sm w-10/12  opacity-60"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={InputField}
            value={username}
            onChange={handleInputChange}
          />
          <label
            htmlFor="password"
            className="text-left text-sm w-10/12 opacity-60 "
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className={InputField}
            value={password}
            onChange={handleInputChange}
          />
          <a href="#" className="text-right text-sm w-10/12 opacity-60">
            Forgot Password?
          </a>

          <button className={LoginButton}>Login</button>
          <a href="#" className="text-left text-sm w-10/12 opacity-60">
            Register
          </a>
          <p>OR</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
