import React from "react";
import "./Footer.css";
import { IoHomeOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <div className="mobile__device__footer">
        <div className="mobile__device__footer__container">
          <div className="mobile__device__footer__item">
            <div className="mobile__device__icon">
              <IoHomeOutline size={23} />
            </div>
            <div className="mobile__device__name">Home</div>
          </div>
          <div className="mobile__device__footer__item">
            <div className="mobile__device__icon">
              <SlNotebook size={22} />
            </div>
            <div className="mobile__device__name">Booking</div>
          </div>
          <div className="mobile__device__footer__item">
            <div className="mobile__device__icon">
              <IoHelpCircleOutline size={25} />
            </div>
            <div className="mobile__device__name">Help</div>
          </div>
          <div className="mobile__device__footer__item">
            <div className="mobile__device__icon">
              <MdOutlineManageAccounts size={25} />
            </div>
            <div className="mobile__device__name">Account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
