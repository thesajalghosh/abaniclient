import React, { useState } from "react";
import "./AccountPage.css";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../Store/authSlice"

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdUpdate } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import Modal from "../../components/Modal/Modal"
import Layout from "../../layout/Layout";
import { isEmpty } from "../../utils/CommonUtilsFunction";
const AccountPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);

  console.log(user);

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
          }
          <div className="profile__update__container" onClick={logoutHandeler}>
            <span>
              <MdUpdate size={25} />
            </span>
            <div> Update Profile</div>
          </div>
          {user.role === 0 && (
            <div
              className="profile__update__container"
              onClick={() => {
                navigate("/user-dashboard/user-order");
              }}
            >
              <span>
                <MdOutlineBookmarkBorder size={25} />
              </span>
              <div> User Order</div>
            </div>
          )}
          <div
            className="profile__logout__container"
            onClick={() => setLogoutModal(true)}
          >
            <span>
              <FiLogOut size={25} />
            </span>
            <div> Logout</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AccountPage;
