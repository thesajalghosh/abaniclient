import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import './Register.css';
import { RxCross2 } from "react-icons/rx";

// Define Joi validation schema
const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email address'
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number must be 10 digits'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long'
  })
});

const Register = () => {
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [afterRegisterData, setAfterRegisterData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize useForm with Joi resolver
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, formData);

      if (data && data.success) {
        console.log("Successfully registered:", data);
        setAfterRegisterData(data);
        setLoginModal(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="register__page__whole__container">
      <div>
        {loginModal && (
          <Modal
            header={<div className="login__page__modal__header flex justify-between items-center">
              <span>Go to Login Page</span>
              <span onClick={() => setLoginModal(false)}><RxCross2 size={25} /></span>
            </div>}
            body={<div className="login__page__modal__body"><span>{afterRegisterData.message},</span><span> Log in now to use our app</span></div>}
            footer={<div className="mt-4 mb-4"><button onClick={() => navigate("/login")} className="bg-transparent w-48 text-lg hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Login Now</button></div>}
          />
        )}

        <div className="register__page__header">Register</div>
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__ele">
            <label>Name</label>
            <input name="name" {...register('name')} className="w-96" />
            <div className="error__message">{errors.name && errors.name.message}</div>
          </div>
          <div className="form__ele">
            <label>Email</label>
            <input name="email" {...register('email')} className="w-96" />
            <div className="error__message">{errors.email && errors.email.message}</div>
          </div>
          <div className="form__ele">
            <label>Phone No.</label>
            <input name="phone" {...register('phone')} className="w-96" />
            <div className="error__message">{errors.phone && errors.phone.message}</div>
          </div>
          <div className="form__ele">
            <label>Password</label>
            <input name="password" type="password" {...register('password')} className="w-96" />
            <div className="error__message">{errors.password && errors.password.message}</div>
          </div>
          <div className="button__container">
            {/* <button
          type="submit"
          className={`btn__design register__btn ${isLoading ? 'btn--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : 'Register'}
        </button> */}
            <button disabled={isLoading} type="submit" class="py-2 px-4 flex justify-center items-center  button_color_style   focus:ring-offset-blue-200  w-96 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
              {isLoading && <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
              </svg>}
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="open__login__page">
        <span>Already registered? Log in now.</span>
        <button className="btn__design" onClick={() => navigate("/login")}>Log In</button>
      </div>
    </div>
  );
};

export default Register;