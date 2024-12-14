import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define Joi schema
const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email address",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const onSubmit = async (formData) => {
        setIsLoading(true)
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, formData);

            if (data.success) {
                dispatch(loginSuccess(data)); // Save user data and token
                navigate("/"); // Redirect on success
                toast.success("Successfully logged in!");
            }
        } catch (error) {
            // Handle different error cases in the catch block
            if (error.response) {
                const { status, data } = error.response;

                if (status === 400) {
                    toast.error(data.message || "Validation error: Email and password are required");
                } else if (status === 401) {
                    toast.error(data.message || "Unauthorized: Email or password incorrect");
                } else if (status === 403) {
                    toast.error(data.message || "Forbidden: Role does not match");
                } else if (status === 500) {
                    toast.error(data.message || "Internal server error");
                } else {
                    toast.error(data.message || "Unknown error occurred");
                }
            } else if (error.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error(`Error: ${error.message}`);
            }

            console.error("Error during login:", error);
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="login__page__whole__container">
            <div>
                <div className="login__page__header">Log In</div>
                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__ele">
                        <label>Email</label>
                        <input 
                            {...register("email")}
                            placeholder="Enter your email"
                            className="w-96"
                        />
                        {errors.email && <div className="error__message">{errors.email.message}</div>}
                    </div>
                    <div className="form__ele">
                        <label>Password</label>
                        <input 
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            className="w-96"
                        />
                        {errors.password && <div className="error__message">{errors.password.message}</div>}
                    </div>
                    <div className="mt-12">
                        {/* <button type="submit" className="btn__design register__btn">Login</button> */}
                        <button  disabled={isLoading}   type="submit" class="py-2 px-4 flex justify-center items-center  button_color_style   focus:ring-offset-blue-200  w-96 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
  {isLoading &&  <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>}
    Login
</button>
                    </div>
                </form>
            </div>
            <div className="open__register__page">
                <span>If you are not a registered user, then register now</span>
                <button className="btn__design" onClick={() => navigate("/register")}>Register</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;