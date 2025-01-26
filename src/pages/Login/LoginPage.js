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
import { RxCross2 } from "react-icons/rx";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [otpModal, setOtpModal] = useState(false);
    const [otp, setOtp] = useState("")
    const [userEnteredOtp, setUserEnteredOtp] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [userDetailsModal, setUserDetailsModal] = useState(false)

    // Joi schema for phone number validation
    const schema = Joi.object({
        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be 10 digits",
                "string.empty": "Phone number is required",
            }),

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
    }
    const onSubmit = async (formData) => {
        setIsLoading(true)
        try {
            setUserDetails({ ...userDetails, "phone": formData.phone })
            const otp = generateOTP();
            const response = await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.REACT_APP_OTP_KEY}&variables_values=${otp}&route=otp&numbers=${formData.phone},9609238676}`)

            setOtp(otp)

            setOtpModal(true)
        } catch (error) {
            console.log("error", error)
        }finally{
            setIsLoading(false)
        }

    };
    const handelVerifyOtp = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/check-user`, { phone: userDetails?.phone });

            if (data.success) {
                if (data.userExist) {
                    dispatch(loginSuccess(data)); // Save user data and token
                    navigate("/"); // Redirect on success
                    toast.success("Successfully logged in!");
                } else if (!data.userExist) {
                    setUserDetailsModal(true)
                    setOtpModal(false)

                }
            }

        } catch (error) {
            console.log("error", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handelOnchangeUserDetails = (e, field) => {
        setUserDetails({ ...userDetails, [field]: e.target.value })

    }

    const handelCreateAccount = async () => {
        setIsLoading(true)
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/create-account`, userDetails);

            if (data.success) {
                dispatch(loginSuccess(data));
                navigate("/");
                toast.success("Successfully logged in!");
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>


            <div className="login__page__whole__container p-7">
                <div >
                    <div className="login__page__header">Log In</div>
                    <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__ele">
                            <label>Phone Number</label>
                            <input
                                {...register("phone")}
                                placeholder="Enter your phone number"
                                className="w-80"
                            />
                            {errors.phone && <div className="error__message">{errors.phone.message}</div>}
                        </div>

                        <div className="mt-12">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="py-2 px-4 flex justify-center items-center button_color_style focus:ring-offset-blue-200 w-80 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
                            >
                                {isLoading && (
                                    <svg
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="mr-2 animate-spin"
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                                    </svg>
                                )}
                                Generate OTP
                            </button>
                        </div>
                    </form>
                </div>
                <div className="open__register__page">
                    <button className="btn__design" onClick={() => navigate("/")}>
                        Back to Home page
                    </button>
                </div>
                <ToastContainer />
            </div>
            {otpModal && (<div className='enter_otp_modal'>
                <div className='otp_modal'>
                    <div className='otp_modal_header flex items-center justify-between border-b-2 border-gray-400 p-4'>
                        <span className='text-xl'>Phone verification</span>
                        <span onClick={() => setOtpModal(false)}><RxCross2 size={30} /></span>

                    </div>
                    <div className='flex flex-col items-center gap-4 p-4 mt-10'>

                        <input type='text' className='otp_input' placeholder='Enter otp' value={userEnteredOtp} onChange={(e) => setUserEnteredOtp(e.target.value)} />

                        <button
                            disabled={userEnteredOtp?.length !== 4}
                            onClick={() => handelVerifyOtp()}
                            type="submit"
                            className="py-2 px-4 mt-12 flex justify-center items-center bg-blue-600 text-white text-xl focus:ring-offset-blue-200 w-10/12 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-800 disabled:shadow-sm
                            "
                        >
                            {isLoading && (
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="mr-2 animate-spin"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                                </svg>
                            )}
                            Submit
                        </button>
                    </div>
                </div>


            </div>)}
            {userDetailsModal && (<div className='enter_otp_modal'>
                <div className='otp_modal'>
                    <div className='otp_modal_header flex items-center justify-between border-b-2 border-gray-400 p-4'>
                        <span className='text-xl'>Enter details</span>
                        <span onClick={() => setOtpModal(false)}><RxCross2 size={30} /></span>

                    </div>
                    <div className='flex flex-col items-center gap-4 p-4 mt-10'>

                        <input type='text' className='otp_input' placeholder='Enter full name' value={userDetails.name} onChange={(e) => handelOnchangeUserDetails(e, "name")} />

                        <button
                            disabled={userDetails?.name?.length < 3 ?? false}
                            onClick={() => handelCreateAccount()}
                            type="submit"
                            className="py-2 px-4 mt-12 flex justify-center items-center bg-blue-600 text-white text-xl focus:ring-offset-blue-200 w-10/12 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-800 disabled:shadow-sm
                            "
                        >
                            {isLoading && (
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="mr-2 animate-spin"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                                </svg>
                            )}
                            Submit
                        </button>
                    </div>
                </div>


            </div>)}
        </>
    );
};

export default Login;
