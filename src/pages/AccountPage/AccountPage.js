import React, { useState } from "react";
import "./AccountPage.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice"

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdUpdate } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import Modal from "../../components/Modal/Modal"
import Layout from "../../layout/Layout";
import { isEmpty } from "../../utils/CommonUtilsFunction";
import { LuBookMarked } from "react-icons/lu";
import { MdExplore, MdOutlineHelpOutline, MdOutlineStarRate  } from "react-icons/md";
import { PiAddressBookTabsLight } from "react-icons/pi";
import { FaHouseCrack } from "react-icons/fa6";

const AccountPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutHandeler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <>
      <Layout>
        <div className="profile__whole__container">
          {logoutModal && (
            <Modal
              heading={
                <>
                  <span>Logout</span>
                </>
              }
              body={
                <>
                  <div>Are you Want to Sure Logout</div>
                </>
              }
              footer={
                <>
                  <div className="logout__footer__two__button">
                    <button onClick={() => setLogoutModal(false)}>
                      Cancel
                    </button>
                    <button onClick={logoutHandeler}>Logout</button>
                  </div>
                </>
              }
              setClose={() => setLogoutModal(false)}
            />
          )}

          {!isEmpty(user) &&
            <>
              <div className="profile__account__details__container">
                <div className="profile__account__details__container__upperPart">
                  <div className="upper__part__icon">
                    <IoPersonCircleOutline size={80} />
                  </div>
                  <div className="upper__part__user__details">
                    <div className="upper__part__user__name">{user.name}</div>
                    <span>{user.email}</span>
                    <span>+91 {user.phone}</span>
                  </div>
                </div>
              </div>

              <div className="profile__update__container" onClick={logoutHandeler}>
                <span>
                  <MdUpdate size={25} />
                </span>
                <div> Update Profile</div>
              </div>
             
                <div
                  className="profile__update__container"
                  onClick={() => {
                    navigate("/bookings");
                  }}
                >
                  <span>
                    <LuBookMarked size={25} />
                  </span>
                  <div>My bookings</div>
                </div>
         
              <div
                className="profile__update__container"
              >
                <span>
                  <MdExplore size={25} />
                </span>
                <div>My plans</div>
              </div>
              <div className="profile__update__container">
                <span>
                  <MdOutlineHelpOutline size={25} />
                </span>
                <div>Help center</div>
              </div>
              <div className="profile__update__container">
                <span>
                  <PiAddressBookTabsLight size={25} />
                </span>
                <div>Manage address</div>
              </div>
              <div className="profile__update__container">
                <span>
                  <MdOutlineStarRate  size={25} />
                </span>
                <div>My ratings</div>
              </div>
              <div className="profile__update__container">
                <span>
                  <FaHouseCrack size={25} />
                </span>
                <div>About the abani</div>
              </div>
              <div
                className="profile__logout__container"

              >

                <button onClick={() => setLogoutModal(true)}> Logout</button>
              </div>
            </>}
          {isEmpty(user) &&
            <div className="accout_page_login_container">
              <div className="without_login_heading">You need to login your account to access full fetures</div>
              <div className="without_login_container">
                <div className="without_login_label">If you have account then login in now</div>
                <button onClick={()=>navigate("/login")}>Login now</button>
              </div>
              <div className="without_login_container">
                <div className="without_login_label">If you don't have account then register in now</div>
                <button onClick={()=>navigate("/register")}>Register now</button>
              </div>

            </div>
          }
        </div>

      </Layout>
    </>
  );
};

export default AccountPage;
