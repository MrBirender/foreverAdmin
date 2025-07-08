import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { List, Order, Add } from "./pages/index.js";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";



const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  /* setting token to local storage */
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vm, 25px)] my-8 text-grya-600 text-base">
              <Routes>
                <Route path="/" element={<Add token={token}/>} />
                <Route path="/order" element={<Order token={token}/>} />
                <Route path="/List" element={<List token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
