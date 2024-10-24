import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Store/authSlice';
// import { setUserData } from '../../Store/authSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
     const dispatch = useDispatch()

     const showToastMessage = () => {
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      };

    const handelchange = ((e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
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
                // Backend responded with an error status code (e.g., 400, 401, etc.)
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
                // Request was made but no response was received
                toast.error("No response from server. Please try again later.");
            } else {
                // Something else happened while setting up the request
                toast.error(`Error: ${error.message}`);
            }
    
            console.error("Error during login:", error);
        }
    };
    

    return (
        <div className="login__page__whole__container">
            <div>


                <div className="login__page__header">Log In</div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="form__ele">
                        <label>Email</label>
                        <input name="email" value={formData.email} onChange={handelchange} />
                    </div>
                    <div className="form__ele">
                        <label>Password</label>
                        <input name="password" value={formData.password} onChange={handelchange} />
                    </div>
                    <div className="button__container">

                        <button type="submit" className="btn__design register__btn">Login</button>
                    </div>
                </form>
            </div>
            <div className="open__register__page">
                <span>If you are not register user, then register now</span>
                <button className="btn__design" onClick={() => navigate("/register")}>Register</button>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
