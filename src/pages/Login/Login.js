import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Store/authSlice';
// import { setUserData } from '../../Store/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
     const dispatch = useDispatch()

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
            console.log(data);
            if(data.success)
            {
                // dispatch(setUserData(data.user))
                dispatch(loginSuccess(data))
                // dispatch(setToken(data.token))
                navigate("/")

            }
           
           
        } catch (error) {
            console.error("Error during login:", error.response ? error.response.data : error.message);
         
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
        </div>
    )
}

export default Login
