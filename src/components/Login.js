import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../services/api";
import { v4 as uuidV4 } from "uuid";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {

    const loginData = {
      ...formData,
    };
    // Perform signup API request
    try {
      await login(loginData);
      toast.success("Login Successful");

      navigate('/document')
      
 

    } catch (error) {
      console.error("Login failed. Please try again.");
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="block w-full max-w-md  rounded-lg  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form>
          {/* <!--Email input--> */}
          <TEInput
            type="email"
            label="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-6"
          ></TEInput>

          {/* <!--Password input--> */}
          <TEInput
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mb-6"
          ></TEInput>

          {/* <!--Remember me checkbox--> */}
          <div className="mb-6 flex min-h-[1.5rem] items-center justify-center  ">
            <TERipple rippleColor="light" className="w-full">
              <button
                type="button"
                onClick={handleLogin}
                className=" w-full  rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
              >
                LOGIN
              </button>
            </TERipple>
          </div>

          {/* <!--Submit button--> */}
          <div className=" flex gap-3  mb-0 mt-2 pt-1 text-sm font-semibold">
            Don't have an account?{" "}
            <Link to="/signup">
              <div className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">
                SIGNUP
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
