import React from "react";
import BookCrousel from "../../components/BookCrousel/BookCrousel";
import { IoSearch } from "react-icons/io5";
import "./HomePage.css"
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import MostBookService from "../../components/MostBookedService/MostBookedService"
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn,FaInstagram  } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";


const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="home_page_whole_container">
      {/* <div className="current_location_section">
      <div>Dum Dum Road</div>
      <div>Kolkata</div>
    </div> */}
      <div className="home_page_search_box">
        <div className="seach_box_container">
          <IoSearch size={21} />
          <input placeholder="Search any hair service" />
        </div>
      </div>
      <div className="home_page_category_componant">
        <CategoryComponent />
      </div>
      <BookCrousel />
      <div className="most_booked_serviced">
        <MostBookService/>
      </div>
      <div className="home_page_footer_container">
        <div className="company_name">The Abani</div>
        <div className="footer_section">
          <div className="footer_section_element_container">

            <div className="footer_sub_heading">Company</div>
            <div className="footer_section_element">
              <span>About us</span>
              <span onClick={()=> navigate("/terms-condition")}>Terms @ condition</span>
              <span>Privacy policy</span>
              <span>Anti-discrimination policy</span>
              <span>The Abani impact</span>
            </div>
          </div>
          <div className="footer_section_element_container">

            <div className="footer_sub_heading">For Customers</div>
            <div className="footer_section_element">
              <span>TA reviews</span>
              <span>Categories near you</span>
              <span>Blog</span>
              <span>Contact</span>

            </div>
          </div>

        </div>

      <div className="home_page_social_media_container">
      <div className="footer_social_media mt-5 flex gap-4 justify-center items-center">

        <div className="w-[40px] h-[40px] bg-gray-500 rounded-lg flex justify-center items-center" onClick={()=> navigate("https://www.facebook.com/share/QqzPBPnw2hD5RJaa/")}><FaFacebook size={25}/></div>
        <div className="w-[40px] h-[40px] bg-gray-500 rounded-lg flex justify-center items-center"><FaLinkedinIn size={25}/></div>
        <div className="w-[40px] h-[40px] bg-gray-500 rounded-lg flex justify-center items-center" onClick={()=> navigate("https://www.instagram.com/theabani58/profilecard/?igsh=MXJ5eTVxbTRwejYzcg==")}><FaInstagram size={25}/></div>
        <div className="w-[40px] h-[40px] bg-gray-500 rounded-lg flex justify-center items-center" onClick={()=> navigate("https://youtube.com/@theabani9891?si=O_CqYk-M69imQLif")}><IoLogoYoutube size={25}/></div>
      </div>
     
      </div>
      </div>
    </div>
  );
};

export default HomePage;
