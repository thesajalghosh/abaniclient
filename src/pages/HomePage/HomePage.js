import React from "react";
import BookCrousel from "../../components/BookCrousel/BookCrousel";
import { IoSearch } from "react-icons/io5";
import "./HomePage.css"
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";

const HomePage = () => {
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
      <div className="home_page_footer_container">
        <div className="company_name">The Abani</div>
        <div className="footer_section">
          <div className="footer_section_element_container">

            <div className="footer_sub_heading">Company</div>
            <div className="footer_section_element">
              <span>About us</span>
              <span>Terms @ condition</span>
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

      </div>
    </div>
  );
};

export default HomePage;
