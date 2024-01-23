import React from "react";
import { toast } from "react-hot-toast";

import { TEInput, TERipple } from "tw-elements-react";
import { useState } from "react";
import { signup } from "../services/api";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State for form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle signup form submission
  const handleSignup = async () => {
    // try {

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
    };

    // Perform signup API request
    try {
      await signup(signupData);
      toast.success("Signup Successful");
      navigate("/"); // Navigate to the login page on successful signup
    } catch (error) {
      console.error("Signup failed. Please try again.");
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 items-center justify-center">
        <form>
          <div className="grid grid-cols-2 gap-4">
            {/* <!--First name input--> */}
            <TEInput
              type="text"
              label="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mb-6"
            ></TEInput>

            {/* <!--Last name input--> */}
            <TEInput
              type="text"
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mb-6"
            ></TEInput>
          </div>

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
          <TEInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mb-6"
          ></TEInput>

          {/* <!--Submit button--> */}
          <TERipple rippleColor="light" className="w-full">
            <button
              type="button"
              className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </TERipple>
        </form>
      </div>
    </div>
  );
};

export default Signup;
