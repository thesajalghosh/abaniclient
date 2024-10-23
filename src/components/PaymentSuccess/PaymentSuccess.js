import React from 'react';
import './PaymentSuccess.css';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ totalBalance, setPaymentSuccessModal }) => {
  const navigate = useNavigate()
  return (
    <div className="payment_success_whole_container">
   <div className="payment_success_header">
<IoArrowBackOutline size={25} onClick={()=> setPaymentSuccessModal(false)}/>
<span>Payment success</span>
   </div>

    <div className="payment_success_container">
      <div className="payment_success_message">
        <h2>Payment Successful!</h2>
        <p>Your payment of <span>${totalBalance}</span> was completed successfully.</p>
      </div>
      <button className="view_order_button" onClick={()=> navigate("/bookings")}>View Order</button>
    </div>
   

    </div>
  );
};

export default PaymentSuccess;
