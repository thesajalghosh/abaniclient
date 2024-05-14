import React from "react";
import "./Header.css";
import { IoReorderThree } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <div>
      <div className="mobile__device__header">
        <div className="mobile__device__header__container">
          <div className="header__left__part">The Abani</div>
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
