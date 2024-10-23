import React, { useEffect, useMemo, useState } from "react";
import "./CategoryProductPage.css";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import ProductCart from "../../components/ProductCard";
// import { setStoreCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { SiExpressvpn } from "react-icons/si";
import { TbMinusVertical } from "react-icons/tb";
import { FcLike } from "react-icons/fc";
// import Loader from "../../components/Loader";
import { IoIosHeartEmpty } from "react-icons/io";
import Loader from "../../components/Loader/Loader"
import { setStoreCart } from "../../Store/cartSlice";
import { IoIosStar } from "react-icons/io";
import { CiShoppingTag } from "react-icons/ci";
import { LuDot } from "react-icons/lu";

const CategoryProductPage = () => {
  const [catProduct, setCatProduct] = useState([]);
  const [likeProduct, setLikeProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const { cid } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cartData = useSelector((state) => state.cart.storeCart)

  const cart_data = useMemo(() => {
    return (cartData?.map(ele => ele._id) || []);
  }, [cartData]);

  const getCategoryProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/category-product/${cid}`
    );
    setCatProduct(data?.products);
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryProduct();
  }, []);

  const unLikeHandeler = async (e) => {
    const newArray = likeProduct.filter((ele) => ele._id !== e._id);
    setLikeProduct(newArray);
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/unlike-product`,
      { lp: e._id },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const likeProductHandeler = async (e) => {
  
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/add-like-product`,
      { lp: e._id },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
  const addToCartHandler = (ele) => {
    let updatedCart;
  
    if (cartData.some(item => item._id === ele._id)) {
      // If the item exists, remove it
      updatedCart = cartData.filter(item => item._id !== ele._id);
    } else {
      // If the item doesn't exist, add it
      const update_buy_quantity = {...ele, buyqun : 1}
      updatedCart = [...cartData, update_buy_quantity];
    }
  
    dispatch(setStoreCart(updatedCart));
  };
  
  return (

    <Layout headerEle={"Services"} backButton={true}>
      {loading && <Loader/>}
      <div className="category_product_page_whole_container">
        <div className="category_product_page_header">
          <div className="category_product_header_image">
            <img src={catProduct[0]?.category?.url} />
          </div>
          <div className="category_header_details">
            <div className="category_header_title">
              {catProduct[0]?.category?.name}
            </div>
            <div className="category_header_rating">
              <IoIosStar />
              <span>4.90 (871K bookings)</span>
            </div>

          </div>
        </div>
        <div className="category__product__page__elements">
          {catProduct.map((ele) => (
            <div
              className="category_product__card"
              // onClick={() => navigate(`/product/${ele._id}`)}
              key={ele._id}
            >
              <div className="category_service_tag">
                <CiShoppingTag />  Service
              </div>

              <div className="search__lower__part__product__card">
                <div className="category_product_name_add">
                  <div className="category_product_name_left">
                    <span> {ele.name}</span>{" "}
                    <div className="category_product_rating">
                      <IoIosStar />
                      <div>4.90 (871K bookings)</div>
                    </div>
                  </div>

                  <div className={`add_to_cart_section ${cart_data.includes(ele?._id) ? "add_button_active": ""}`}>
                    <button onClick={() => addToCartHandler(ele)}>{cart_data.includes(ele?._id) ? "Remove": "Add"}</button>
                  </div>
                </div>
                <div className="category_product_price_time">
                  <div className="category_product_price">
                    <FaRupeeSign size={14}/>
                   {" "} {ele.price}
                  </div>
                  <span><LuDot/></span>
                  <div className="category_product_time">
                    1hr 25min
                  </div>
                </div>
                <div className="category_product__des">
                  {/* {textTranked(e.description)} */}
                  {ele.description}
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>

    </Layout>

  );
};

export default CategoryProductPage;