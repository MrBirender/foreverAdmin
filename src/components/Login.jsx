import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import api from "../api/apiConfig";

const Login = ({ setToken }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await api.post("/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login Success");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Header with logo */}
      <div className="py-6 px-8 bg-orange-500 flex justify-start items-center">
        <img className="w-40" src={assets.logo} alt="logo" />
      </div>

      {/* Centered form */}
      <div className="flex-grow flex justify-center items-center ">
        <div className="bg-gray-100 shadow-md rounded-lg max-w-2xl w-full px-8 py-16">
          <h1 className="text-4xl font-semibold mb-6 text-orange-500 text-center">
            Admin Panel
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 max-w-lg mx-auto"
          >
            <div className="mb-3">
              <p className="text-2xl font-medium text-gray-700 mb-2">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="requiredrounded-md text-2xl w-full px-3 py-4 border border-gray-300 outline-none placeholder:text-xl"
                type="email"
                placeholder="your@gmail.com"
              />
            </div>
            <div className="mb-3">
              <p className="text-2xl font-medium text-gray-700 mb-2">
                Password
              </p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="required rounded-md text-2xl w-full px-3 py-4 border border-gray-300 outline-none placeholder:text-xl"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="bg-orange-500 text-white text-2xl px-4 py-2 mt-4 w-full rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
