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
    <div className = "home_page_search_box">
      <div className="seach_box_container">
        <IoSearch size={21}/>
        <input placeholder="Search any hair service"/>
      </div>
    </div>
    <div className="home_page_category_componant">
      <CategoryComponent/>
    </div>
      <BookCrousel />
    </div>
  );
};

export default HomePage;
