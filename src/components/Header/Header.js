import React from "react";
import "./Header.css";
import { IoReorderThree } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosSearch } from "react-icons/io";
import {isEmpty}  from "../../utils/CommonUtilsFunction.js"
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import Logo_image from "../../Assets/abani_logo.jpg"

const Header = ({backButton, backButtonFunction, headerEle}) => {
  const navigate = useNavigate()


  const backFunction = ()=> {
    if(isEmpty(backButtonFunction)){
        navigate(-1)
    }
    else{
      backButtonFunction()
    }
  }
  return (
    <div>
      <div className="mobile__device__header">
        <div className="mobile__device__header__container">
          <div className="header__left__part">
          {backButton &&
           <IoIosArrowRoundBack size={30} onClick={()=> backFunction()}/>}
           {isEmpty(headerEle) ?
           <div className="header__logo__container">
            <img src={Logo_image} alt="logo" className="header__logo" />
<span>

            The Abani
</span>
           </div>
            :
             headerEle}</div>
          <div className="header__right__part">
            <IoIosSearch size={30} />
            <IoReorderThree size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
