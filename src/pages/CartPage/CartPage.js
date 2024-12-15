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
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";

const CartPage = () => {
  const cartData = useSelector((state) => state.cart.storeCart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [addPayPage, setAddPaypage] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [card, setCard] = useState(false);
  
  const [orderLoading, setOrderLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [loader, setLoader] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [slotBookModal, setSlotBookModal] = useState(false);
  const [timeSlotData, setTimeSlotData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentPageModal, setPaymentPageModal] = useState(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false)
  const TimeSlotObject = {
    first: "9AM - 10AM",
    second: "10AM - 11AM",
    third: "11AM - 12PM",
    fourth: "1PM - 2PM",
    fifth: "2PM - 3PM",
    sixth: "3PM - 4PM",
    seventh: "5PM - 6PM",
    eight: "7PM - 8PM",
  };

  const [selectedOption, setSelectedOption] = useState(null);

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
    setBookingDetails((prev)=>({
      ...prev,
      name:"sajal",
      email:"ssajal@gmail.com",
      contact:"123345334535"
    }))
  };

  const handelOpenSlotBookModal = () => {
    setSlotBookModal(true);
    setOpenAddressModal(false);
  };

  const handelOpenPaymentModal = () => {
    setSlotBookModal(false);
    setPaymentPageModal(true);
  };

  const handelSlotBook = (key, value) => {
    setTimeSlotData(key);
    setBookingDetails((prev) => ({
      ...prev,
      slot: { key: key, value: value },
    }));
  };

  const handelAddressAndSelectSlot = (e, type) => {
    setBookingDetails((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };
  function generate20DigitNumber() {
    let randomNumber = '';
    for (let i = 0; i < 20; i++) {
        // Append a random digit (0-9) to the string
        randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
}

  const handelFinalOrder = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/razorpay-key`)
    
      const final_order = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/create-order`,
        {
          ...bookingDetails,
          amount: price * 100, 
          currency: "INR",
          receipt : `receipt#${generate20DigitNumber().toString()}`,
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
        description: "Test Transaction",
        image: "https://your_logo_url",
        order_id: final_order.data.id,
        handler: async function (response) {
          console.log("Payment Successful:", response);
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/verify-payment`,
            {
              order_id: response?.razorpay_order_id,
              payment_id: response?.razorpay_payment_id,
              signature: response?.razorpay_signature,
              user: user.id ,
              items: cartData,
              address: {address1: bookingDetails.address1, address2: bookingDetails.address2, address3: bookingDetails.address3, landmark: bookingDetails.landmark, pincode: bookingDetails.pincode},
              bookingDate: bookingDetails.bookingDate,
              timeSlot: bookingDetails.slot,
              paymentMode:bookingDetails.paymentMode
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          dispatch(setStoreCart([]))
          localStorage.removeItem('cart');
          setPaymentSuccessModal(true)
          setPaymentPageModal(false);
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
    } catch (error) {
      console.log("Error placing final order:", error);
    }
  };

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
                          <div className="product__quantity__increment__button__container">
                            <button onClick={() => minusHandler(e)}>
                              <FaMinus />
                            </button>
                            <span>{e.buyqun}</span>
                            <button onClick={() => plusHandeler(e)}>
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart_product__price">
                        <MdCurrencyRupee size={16} />
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
                  <span>
                    <MdCurrencyRupee size={16} />
                    {price}
                  </span>
                </div>
                <div className="price__part__element">
                  <span>Platform Fee</span>
                  <span>
                    <MdCurrencyRupee size={16} />
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
      {openAddressModal && <div className="modal_from_bottom_whole_container">
        <div className="modal_heading">
          <span >Add address</span>
          <RxCross2 size={26} onClick={() => setOpenAddressModal(false)} />

        </div>
        <div className="address_details_modal">
          <div className="address_details_input">
            <label>Address line 1</label>
            <input placeholder="Enter address" onChange={(e) => handelAddressAndSelectSlot(e, "address1")} />
          </div>
          <div className="address_details_input">
            <label>Address line 2</label>
            <input placeholder="Enter address" onChange={(e) => handelAddressAndSelectSlot(e, "address2")} />
          </div>
          <div className="address_details_input">
            <label>Address line 3</label>
            <input placeholder="Enter address" onChange={(e) => handelAddressAndSelectSlot(e, "address3")} />
          </div>
          <div className="address_details_input">
            <label>Landmark</label>
            <input placeholder="Enter landmark" onChange={(e) => handelAddressAndSelectSlot(e, "landmark")} />
          </div>
          <div className="address_details_input">
            <label>Pincode</label>
            <input placeholder="Enter pincode" onChange={(e) => handelAddressAndSelectSlot(e, "pincode")} />
          </div>
          <div className="modal_button_whole_container">
            <button onClick={() => handelOpenSlotBookModal()}>Add address {" "}  {'>>'} {" "}  Select slot</button>
          </div>
        </div>
      </div>}

      {slotBookModal && <div className="modal_from_bottom_whole_container">
        <div className="modal_heading">
          <span >Add slot</span>

          <RxCross2 size={26} onClick={() => setSlotBookModal(false)} />
        </div>
        <div className="address_details_modal">
          <div className="address_details_input">
            <label>Select date</label>
            <input type='date' placeholder="Enter pincode" onChange={(e) => handelAddressAndSelectSlot(e, "bookingDate")} />
          </div>
          <div className="address_details_input">

            <label>Select slot</label>
            <div className="modal_time_slot">
              {Object.entries(TimeSlotObject).map(([key, value]) => (
                <div className={`time_slot_element ${timeSlotData === key && "active_time_slot"}`} key={key} onClick={() => handelSlotBook(key, value)}>
                  {value}
                </div>
              ))}

            </div>
          </div>

          <div className="modal_button_whole_container">
            <button onClick={() => handelOpenPaymentModal()}>Select slot {" "}  {'>>'} {" "}  Select payment mode</button>
          </div>
        </div>
      </div>}

      {paymentPageModal && <div className="modal_from_bottom_whole_container">
        <div className="modal_heading">
          <span >Select payment Mode</span>

          <RxCross2 size={26} onClick={() => setPaymentPageModal(false)} />
        </div>
        <div className="address_details_modal">
          <div className="address_details_input">
            <label>Select mode</label>
            <div className="radio_button_container">
              <input type='radio' name="payment" value="online" onChange={(e) => handelAddressAndSelectSlot(e, "paymentMode")}/>
              <lable>Online</lable>
            </div>
            <div className="radio_button_container">
              <input type='radio' name="payment" value="cash" onChange={(e) => handelAddressAndSelectSlot(e, "paymentMode")}/>
              <lable>Cash</lable>
            </div>
          </div>

          <div className="modal_button_whole_container">
            <button onClick={() => handelFinalOrder()}>{isEmpty(bookingDetails?.paymentMode) && "Edit Address or slot"}
            {bookingDetails?.paymentMode === "online" && "Make payment"}
            {bookingDetails?.paymentMode === "cash" && "Confirm booking"}
            </button>
          </div>
        </div>
      </div>}

      {paymentSuccessModal && <PaymentSuccess totalBalance={price} setPaymentSuccessModal={setPaymentSuccessModal}/>}



      {orderLoading && (
        <div className="place__order__loading">Loading....</div>
      )}
    </Layout>

  );
};

export default CartPage;