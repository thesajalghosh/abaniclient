import React from "react";
import "./Footer.css";
import { IoHomeOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate()
  const cartData = useSelector((state) => state.cart.storeCart);
  return (
    <div>
      <div className="mobile__device__footer">
        <div className="mobile__device__footer__container">
          <div className="mobile__device__footer__item"  onClick={()=>navigate("/")}>
            <div className="mobile__device__icon">
              <IoHomeOutline size={23} />
            </div>
            <div className="mobile__device__name">Home</div>
          </div>
          <div className="mobile__device__footer__item" onClick={()=> navigate("/bookings")}>
            <div className="mobile__device__icon">
              <IoBookmarksOutline size={23} />
            </div>
            <div className="mobile__device__name">Booking</div>
          </div>
          <div className="mobile__device__footer__item" onClick={()=>navigate("/cart-page")}>
          { cartData.length > 0 && <div className="total_cart_count">
            {cartData.length > 0 && <div>{cartData.length}</div>}
          </div>}
            <div className="mobile__device__icon">
              <IoBagCheckOutline size={23} />
            </div>
            <div className="mobile__device__name">Cart</div>
          </div>
          <div className="mobile__device__footer__item">
            <div className="mobile__device__icon">
              <IoHelpCircleOutline size={23} />
            </div>
            <div className="mobile__device__name">Help</div>
          </div>
         
          <div className="mobile__device__footer__item" onClick={()=> navigate("/account")}>
            <div className="mobile__device__icon">
              <MdOutlineManageAccounts size={23} />
            </div>
            <div className="mobile__device__name">Account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
