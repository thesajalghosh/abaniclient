import React from 'react';
import './PaymentSuccess.css';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { isNotEmpty } from '../../utils/CommonUtilsFunction';

const BookingSuccess = ({ totalBalance, setPaymentSuccessModal, successfulOrderDetails }) => {
  const navigate = useNavigate()

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return (
    <div className="payment_success_whole_container">
      <div className="payment_success_header">
        <IoArrowBackOutline size={25} onClick={() => setPaymentSuccessModal(false)} />
        <span>Booking</span>
      </div>


      <section class="bg-white py-8 antialiased md:py-16">
  <div class="mx-auto max-w-2xl px-4 2xl:px-0">
    <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl mb-2">Thanks for your order!</h2>
    <p class="text-gray-500 mb-6 md:mb-8">
      Your order id{" "}
      <a href="#" class="font-medium text-gray-900 hover:underline">#{successfulOrderDetails?.order?._id}</a>
    </p>
    <p class="text-gray-400 mb-6">Your service is booked. One of our customer service executives will contact you shortly.</p>
    <div class="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 mb-6 md:mb-8">
      <div class="flex justify-between">
        <dl class="sm:flex items-center justify-between gap-4">
          <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Booking date</dt>
          <dd class="font-medium text-gray-900 sm:text-end">{formatDate(successfulOrderDetails?.order?.bookingDate)}</dd>
        </dl>
        <dl class="sm:flex items-center justify-between gap-4">
          <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Order date</dt>
          <dd class="font-medium text-gray-900 sm:text-end">{formatDate(successfulOrderDetails?.order?.createdAt)}</dd>
        </dl>
      </div>
      <div class="flex justify-between">
        <dl class="sm:flex items-center justify-between gap-4">
          <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Time slot</dt>
          <dd class="font-medium text-gray-900 sm:text-end">{successfulOrderDetails?.order?.timeSlot?.value}</dd>
        </dl>
        <dl class="sm:flex items-center justify-between gap-4">
          <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Total price</dt>
          <dd class="font-medium text-gray-900 sm:text-end">{successfulOrderDetails?.order?.totalPrice}</dd>
        </dl>
      </div>
      <div class="flex justify-between">
        <dl class="sm:flex items-center justify-between gap-4">
          <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Payment Method</dt>
          <dd class="font-medium text-gray-900 sm:text-end">{successfulOrderDetails?.order?.paymentMode}</dd>
        </dl>
        {successfulOrderDetails?.paymentMode !== 'online' && (
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Payment status</dt>
            <dd class="font-medium text-gray-900 sm:text-end">{successfulOrderDetails?.order?.paymentStatus}</dd>
          </dl>
        )}
      </div>
      <dl class="sm:flex items-center justify-between gap-4">
        <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Address</dt>
        <dd class="font-medium text-gray-900 sm:text-end">
          {isNotEmpty(successfulOrderDetails?.order?.address) &&
            isNotEmpty(successfulOrderDetails?.order?.address?.addressLine1) &&
            successfulOrderDetails?.order?.address?.addressLine1}{" "}
          {isNotEmpty(successfulOrderDetails?.order?.address) &&
            isNotEmpty(successfulOrderDetails?.order?.address?.addressLine2) &&
            successfulOrderDetails?.order?.address?.addressLine2}{" "}
          {isNotEmpty(successfulOrderDetails?.order?.address) &&
            isNotEmpty(successfulOrderDetails?.order?.address?.addressLine3) &&
            successfulOrderDetails?.order?.address?.addressLine3}{" "}
          {isNotEmpty(successfulOrderDetails?.order?.address) &&
            isNotEmpty(successfulOrderDetails?.order?.address?.landmark) &&
            successfulOrderDetails?.order?.address?.landmark}{" "}
          {isNotEmpty(successfulOrderDetails?.order?.address) &&
            isNotEmpty(successfulOrderDetails?.order?.address?.pincode) &&
            successfulOrderDetails?.order?.address?.pincode}
        </dd>
      </dl>
      <dl class="sm:flex items-center justify-between gap-4">
        <dt class="font-normal mb-1 sm:mb-0 text-gray-500">Booked services name</dt>
        {successfulOrderDetails.items.map((item, index) => (
          <dd class="font-medium text-gray-900 sm:text-end">{`${index + 1}.`} {item?.name}</dd>
        ))}
      </dl>
    </div>
    <div class="flex items-center space-x-4 justify-between">
    <div class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={() => navigate("/bookings")}>
        Track order
      </div>
      <div  class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={() => navigate("/")}>
        Return to shopping
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default BookingSuccess;
