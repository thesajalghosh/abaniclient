import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Loader from "../../components/Loader/Loader";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import axios from "axios";
import Layout from "../../layout/Layout";
import { setStoreCart, setRemoveCart } from "../../Store/cartSlice";
import { isEmpty, isNotEmpty } from "../../utils/CommonUtilsFunction";
import BookingSuccess from "../../components/PaymentSuccess/PaymentSuccess";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";

const CartPage = () => {
  const cartData = useSelector((state) => state.cart.storeCart);
  const user = useSelector((state) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [paymentVerifyLoadingModal, setPaymentVerifyLoadingModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  const [orderLoading, setOrderLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [loader, setLoader] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [slotBookModal, setSlotBookModal] = useState(false);
  const [timeSlotData, setTimeSlotData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentPageModal, setPaymentPageModal] = useState(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false)
  const [cashBookingConfirmModal, setCashBookingConfirmModal] = useState(false)
  const [cashOrderLoading, setCashOrderLoading] = useState(false)
  const [successfulOrderDetails, setSuccessfulOrderDetails] = useState(null)
  const [makePaymentButtonLoading, setMakePaymentButtonLoading] = useState(false)
  const [captcha, setCaptcha] = useState("")
  const [slotBookingDataFilleAlert, setSlotBookingDataFilleAlert] = useState(null)
  const CAPTCHA_VALUE = "56712"
  const TIME_SLOT_OBJECT = {
    first: "9AM - 10AM",
    second: "10AM - 11AM",
    third: "11AM - 12PM",
    fourth: "1PM - 2PM",
    fifth: "2PM - 3PM",
    sixth: "3PM - 4PM",
    seventh: "5PM - 6PM",
    eight: "7PM - 8PM",
  };



  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  useEffect(() => {
    let temp = 0;
    for (var i = 0; i < cartData.length; i++) {
      temp = temp + cartData[i].price * cartData[i].buyqun;
      setPrice(temp);
    }
  }, [cartData.length]);

  const minusHandler = (ele) => {
    setLoader(true);
    let withMinus = { ...ele, buyqun: ele.buyqun - 1 };
    let newUpdatedForMinus = cartData
      .map((item) => {
        if (item._id === withMinus._id) {
          if (withMinus.buyqun === 0) {
            return null;
          }
          return withMinus;
        }
        return item;
      })
      .filter((item) => item !== null);
    dispatch(setStoreCart(newUpdatedForMinus));
    let temp = price - ele.price;
    setPrice(temp);
    setLoader(false);
  };

  const plusHandeler = (ele) => {
    setLoader(true);
    let withPlus = { ...ele, buyqun: ele.buyqun + 1 };
    let newUpdatedForPlus = cartData.map((ele) => {
      if (ele._id === withPlus._id) {
        return withPlus;
      }
      return ele;
    });
    dispatch(setStoreCart(newUpdatedForPlus));
    let temp = price + ele.price;
    setPrice(temp);
    setLoader(false);
  };

  const backFunction = () => {
    navigate(-1);
  };

  const handelOpenAddressModal = () => {
    setOpenAddressModal(true);
    setBookingDetails((prev) => ({
      ...prev,
      name: "sajal",
      email: "ssajal@gmail.com",
      contact: "123345334535"
    }))
  };

  const handelOpenSlotBookModal = () => {
    setSlotBookModal(true);
    setOpenAddressModal(false);
  };

  const handelOpenPaymentModal = () => {
    if (isEmpty(bookingDetails?.bookingDate) || isEmpty(bookingDetails?.slot)) {
      if (isEmpty(bookingDetails?.bookingDate)) {
        setSlotBookingDataFilleAlert({ bookingtext: "Please select booking date" })
      } else if (isEmpty(bookingDetails?.slot)) {
        setSlotBookingDataFilleAlert({ slottext: "Please select time slot" })
      }
    } else {
      setSlotBookModal(false);
      setPaymentPageModal(true);
      setSlotBookingDataFilleAlert(null)
    }
  };

  const handelSlotBook = (key, value) => {
    setTimeSlotData(key);
    setBookingDetails((prev) => ({
      ...prev,
      slot: { key: key, value: value },
    }));
    setSlotBookingDataFilleAlert(null)
  };

  const handelAddressAndSelectSlot = (e, type) => {
    if (type === "bookingDate") {
      setBookingDetails((prev) => ({
        ...prev,
        [type]: e,
      }));

    } else {

      setBookingDetails((prev) => ({
        ...prev,
        [type]: e.target.value,
      }));
    }
    setSlotBookingDataFilleAlert(null)
  };

  function generate20DigitNumber() {
    let randomNumber = '';
    for (let i = 0; i < 20; i++) {
      // Append a random digit (0-9) to the string
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

  // this function is used for online payment function
  const handelFinalOrder = async () => {
    // console.log("cartData", cartData)
    setMakePaymentButtonLoading(true)
    try {
      if (bookingDetails.paymentMode === 'cash') {
        setCashBookingConfirmModal(true)

      } else if (bookingDetails.paymentMode === 'online') {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/razorpay-key`)

        const final_order = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/create-order`,
          {
            ...bookingDetails,
            amount: price * 100,
            currency: "INR",
            receipt: `receipt#${generate20DigitNumber().toString()}`,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const options = {
          key: data?.key,
          amount: final_order.data.amount,
          currency: final_order.data.currency,
          name: "The Abani",
          description: "Transaction",
          image: "https://your_logo_url",
          order_id: final_order.data.id,
          handler: async function (response) {
            setPaymentVerifyLoadingModal(true);
            try {
              const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/verify-payment`,
                {
                  order_id: response?.razorpay_order_id,
                  payment_id: response?.razorpay_payment_id,
                  signature: response?.razorpay_signature,
                  user: user._id,
                  items: cartData,
                  address: {
                    address1: bookingDetails.address1,
                    address2: bookingDetails.address2,
                    address3: bookingDetails.address3,
                    landmark: bookingDetails.landmark,
                    pincode: bookingDetails.pincode,
                  },
                  bookingDate: bookingDetails.bookingDate,
                  timeSlot: bookingDetails.slot,
                  paymentMode: bookingDetails.paymentMode,
                },
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              dispatch(setStoreCart([]));
              localStorage.removeItem('cart');
              setPaymentSuccessModal(true);
              setPaymentPageModal(false);
              setSuccessfulOrderDetails(data);
            } catch (error) {
              console.error("Error verifying payment:", error);
            } finally {
              setPaymentVerifyLoadingModal(false);
            }
          },
          prefill: {
            name: bookingDetails?.name || "Your Name",
            email: bookingDetails?.email || "email@example.com",
            contact: bookingDetails?.contact || "1234567890",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
      else{
        
        setSlotBookingDataFilleAlert({ paymentMode: "Please select booking date" })
      }


    } catch (error) {
      console.log("Error placing final order:", error);
    } finally {
      setMakePaymentButtonLoading(false)
    }
  };
  const handelFinalBookingForCash = async () => {
    setCashOrderLoading(true)
    try {

      const order = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/create-cash-order`,
        {
          user: user._id,
          items: cartData,
          address: { address1: bookingDetails.address1, address2: bookingDetails.address2, address3: bookingDetails.address3, landmark: bookingDetails.landmark, pincode: bookingDetails.pincode },
          bookingDate: bookingDetails.bookingDate,
          timeSlot: bookingDetails.slot,
          paymentMode: bookingDetails.paymentMode
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }

      );
      if (order?.data?.success) {
        setSuccessfulOrderDetails(order?.data?.order)
        setPaymentSuccessModal(true)
        setCashBookingConfirmModal(false)
        setPaymentPageModal(false)
        dispatch(setStoreCart([]))
        localStorage.removeItem('cart');
      }

    } catch (error) {
      console.log(error)
    } finally {
      setCashOrderLoading(false)
    }

  }
  function convertToDateObject(dateString) {
    // Check if input is valid
    if (!dateString || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      throw new Error("Invalid date format. Use dd/mm/yyyy.");
    }

    // Split the dateString into day, month, and year
    const [day, month, year] = dateString.split("/").map(Number);

    // Create a Date object (month is 0-indexed in JavaScript)
    const dateObject = new Date(year, month - 1, day);

    // Return the Date object
    return dateObject;
  }

  // --------------------- 1.  for first modal where address and pin code we are taking ----------------
  const schema = Joi.object({
    address1: Joi.string()
      .required()
      .messages({
        "string.empty": "Address line 1 is required.",
      }),
    address2: Joi.string()
      .required()
      .messages({
        "string.empty": "Address line 2 is required.",
      }),
    address3: Joi.string()
      .optional()
      .allow("")
      .messages({
        "string.base": "Address line 3 must be a string.",
      }), // Optional field
    landmark: Joi.string()
      .required()
      .messages({
        "string.empty": "Landmark is required.",
      }),
    pincode: Joi.string()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        "string.empty": "Pincode is required.",
        "string.pattern.base": "Pincode must be a valid 6-digit number.",
      }),
  });


  // UseForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  // this function is used for address select  
  const onAddressAddSubmit = (data) => {
    console.log("Form Data:", data);
    setBookingDetails({ ...bookingDetails, ...data })
    handelOpenSlotBookModal()

  };

  // ---------------------------2.  for second modal where date and time slot we are taking ------------------





  console.log("bookingdetails", bookingDetails)
  console.log("slotBookingDataFilleAlert", slotBookingDataFilleAlert)

  return (

    <Layout backFunction={backFunction} headerEle={"Cart summary"} backButton={true}>
      {loader && <Loader />}
      <div className="cart__page__whole__container">
        {cartData.length === 0 ? (
          <>
            <div className="cart__with__no__element">
              <span>Your Cart Is Filling Lonely</span>
              <button onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          </>
        ) : (
          <div className="cart__with__element">
            <div className="user__name__cart__owner"></div>
            <div className="cart__container__whole__container">
              {cartData.map((e) => (
                <>
                  <div className="cart__element__container" key={e._id}>
                    <div className="product_name_count_price">
                      <div className="cart_element_left_part">

                        <div className="cart_product_name">{e.name}</div>
                        <div className="product__quantity__container">
                          <div className="product__quantity__increment__button__container p-2">
                            <button onClick={() => minusHandler(e)}>
                              <FaMinus />
                            </button>
                            <span className="text-lg">{e.buyqun}</span>
                            <button onClick={() => plusHandeler(e)}>
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart_product__price flex justify-center items-center text-xl">
                        <MdCurrencyRupee size={20} />
                        {e.price}
                      </div>
                    </div>
                    <div className="cart_product_description">
                      {e?.description}
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="cart__page__price__details">
              <div className="price_details_heading">
                Payment summary ({cartData.length})
              </div>
              <div className="price_details_price_part">
                <div className="price__part__element">
                  <span>Item total</span>
                  <span className="flex justify-center items-center text-xl">
                    <MdCurrencyRupee size={20} />
                    {price}
                  </span>
                </div>
                <div className="price__part__element">
                  <span>Platform Fee</span>
                  <span className="flex justify-center items-center text-xl">
                    <MdCurrencyRupee size={20} />
                    0
                  </span>
                </div>
                <div className="price__part__element">
                  <span>Shipping Fee</span>
                  <span>FREE</span>
                </div>
                <div className="price__part__element">
                  <span>Taxes and Fee</span>
                  <span>FREE</span>
                </div>
              </div>
            </div>
            <div className="place__order__button__container">
              {isNotEmpty(token) ?
                <button
                  onClick={() => handelOpenAddressModal()}
                  disabled={!user ? true : false}
                >
                  Select address and slot
                </button>
                :
                <button onClick={() => navigate("/login")}>
                  Login or Signup
                </button>
              }
            </div>
          </div>
        )}
      </div>
      {/* ---------------------1.  for first modal where address and pin code we are taking ---------------- */}
      {openAddressModal && (
        <div className="modal_from_bottom_whole_container">
          <div className="modal_heading">
            <span>Add address</span>
            <RxCross2 size={26} onClick={() => setOpenAddressModal(false)} />
          </div>
          <form onSubmit={handleSubmit(onAddressAddSubmit)} className="address_details_modal">
            {/* Address Line 1 */}
            <div className="address_details_input">
              <label>Address line 1</label>
              <input
                placeholder="Enter address"
                {...register("address1")}
              />
              {errors.address1 && <div className="error__message">{errors.address1.message}</div>}

            </div>

            {/* Address Line 2 */}
            <div className="address_details_input">
              <label>Address line 2</label>
              <input
                placeholder="Enter address"
                {...register("address2")}
              />
              {errors.address2 && <div className="error__message">{errors.address2.message}</div>}
            </div>

            {/* Address Line 3 (Optional) */}
            <div className="address_details_input">
              <label>Address line 3</label>
              <input
                placeholder="Enter address"
                {...register("address3")}
              />
              {errors.address3 && <div className="error__message">{errors.address3.message}</div>}
            </div>

            {/* Landmark */}
            <div className="address_details_input">
              <label>Landmark</label>
              <input
                placeholder="Enter landmark"
                {...register("landmark")}
              />
              {errors.landmark && <div className="error__message">{errors.landmark.message}</div>}
            </div>

            {/* Pincode */}
            <div className="address_details_input">
              <label>Pincode</label>
              <input
                placeholder="Enter pincode"
                {...register("pincode")}
              />
              {errors.pincode && <div className="error__message">{errors.pincode.message}</div>}

            </div>

            {/* Submit Button */}
            <div className="modal_button_whole_container">
              <button type="submit">
                Add address {" "} {'>>'} {" "} Select slot
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --------------------- 2.  for second modal where date and time slot code we are taking ---------------- */}
      {slotBookModal &&
        <div className="modal_from_bottom_whole_container">
          <div className="modal_heading">
            <span >Add slot</span>

            <RxCross2 size={26} onClick={() => setSlotBookModal(false)} />
          </div>
          <div className="address_details_modal">
            <div className="address_details_input">
              <label>Select date</label>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                dateFormat="dd/MM/yyyy"
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date)
                  handelAddressAndSelectSlot(date, "bookingDate")
                }

                }
              />
              {/* <input type='date' placeholder="DD/MM/YYYY" onChange={(e) => handelAddressAndSelectSlot(e, "bookingDate")} /> */}
              {!isEmpty(slotBookingDataFilleAlert) && !isEmpty(slotBookingDataFilleAlert?.bookingtext) && <div className="error__message">{slotBookingDataFilleAlert?.bookingtext}</div>}
            </div>

            <div className="address_details_input">

              <label>Select slot</label>
              <div className="modal_time_slot">
                {Object.entries(TIME_SLOT_OBJECT).map(([key, value]) => (
                  <div className={`time_slot_element ${timeSlotData === key && "active_time_slot"}`} key={key} onClick={() => handelSlotBook(key, value)}>
                    {value}
                  </div>
                ))}

              </div>
              {!isEmpty(slotBookingDataFilleAlert) && !isEmpty(slotBookingDataFilleAlert?.slottext) && <div className="error__message">{slotBookingDataFilleAlert?.slottext}</div>}
            </div>


            <div className="modal_button_whole_container">
              <button onClick={() => handelOpenPaymentModal()}>Select slot {" "}  {'>>'} {" "}  Select payment mode</button>
            </div>
          </div>
        </div>
      }

      {/* --------------------- for third modal where select payment mode code we are taking ---------------- */}
      {paymentPageModal && <div className="modal_from_bottom_whole_container">
        <div className="modal_heading">
          <span >Select payment Mode</span>

          <RxCross2 size={26} onClick={() => setPaymentPageModal(false)} />
        </div>
        <div className="address_details_modal">
          <div className="address_details_input">
            <label>Select mode</label>
            <div className="radio_button_container">
              <input type='radio' name="payment" value="online" onChange={(e) => handelAddressAndSelectSlot(e, "paymentMode")} />
              <lable>Online</lable>
            </div>
            <div className="radio_button_container">
              <input type='radio' name="payment" value="cash" onChange={(e) => handelAddressAndSelectSlot(e, "paymentMode")} />
              <lable>Cash</lable>
            </div>
            {!isEmpty(slotBookingDataFilleAlert) && !isEmpty(slotBookingDataFilleAlert?.paymentMode) && <div className="error__message">{slotBookingDataFilleAlert?.paymentMode}</div>}
          </div>

          <div className="modal_button_whole_container payment_modal_button_container">
            {/* <button >
            </button> */}
           
              <button onClick={() => {
                setPaymentPageModal(false)
                setOpenAddressModal(true)
              }
              }>Edit address</button>
      
            <button
              disabled={makePaymentButtonLoading}
              type="submit"
              className="py-2 px-4 flex justify-center items-center button_color_style focus:ring-offset-blue-200 w-80 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
              onClick={() => handelFinalOrder()}
            >
              {makePaymentButtonLoading && (
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
              {isEmpty(bookingDetails?.paymentMode) && "Order Now"}
              {bookingDetails?.paymentMode === "online" && "Make payment"}
              {bookingDetails?.paymentMode === "cash" && "Confirm booking"}
            </button>

          </div>
        </div>
      </div>}

      {cashBookingConfirmModal && <div className="cash_booking_confirm_modal">
        <div className="cash_booking_modal_heading">
          <div className="heading_name">Confirm Booking</div>
          <div className="modal_cross_icon" ><RxCross2 size={35} onClick={() => setCashBookingConfirmModal(false)} /></div>


        </div>
        <div className="cash_booking_confirm_body mt-6">


          <div className="showing_number flex justify-center items-center">
            <div className="bg-gray-400 p-2 text-xl">

              {CAPTCHA_VALUE}
            </div>
          </div>
          <div className="confirm_booking_text p-4 mt-4">Enter the captcha to confirm booking</div>
          <div className="input_final_submission_button p-4">

            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} class="appearance-none text-md py-1 px-2 focus:outline-none border-2
             focus:black-600 focus:border-blue-600 dark:bg-gray-100 text-purple-900 rounded-lg  w-[100%] h-[45px]
              dark:text-black-100 placeholder-blue-300 dark:placeholder-gray-600 font-semibold text-black
               rounded-l" type="search" name="q" placeholder="Enter above number ex-34532" />


            <button type="button" disabled={CAPTCHA_VALUE !== captcha} class="py-2 px-4 mt-6 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md" onClick={() => handelFinalBookingForCash()}>
              {cashOrderLoading && <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
              </svg>}
              Comfirm Booking
            </button>

          </div>


        </div>


      </div>}

      {paymentSuccessModal && <BookingSuccess
        totalBalance={price}
        setPaymentSuccessModal={setPaymentSuccessModal}
        successfulOrderDetails={successfulOrderDetails} />}
      {orderLoading && (
        <div className="place__order__loading">Loading....</div>
      )}

      {paymentVerifyLoadingModal && (
        <div className="verify_payment_loading">
          <div className="flex items-center justify-center h-screen flex-col gap-7">


            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <span>

              Verifying payment....
            </span>
          </div>

        </div>
      )}
    </Layout>

  );
};

export default CartPage;