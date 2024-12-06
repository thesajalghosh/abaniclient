import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "./BookCrousel.css";
import ImageOne from "../../Assets/image1.jpg"
import ImageTwo from "../../Assets/image2.jpg"
import ImageThree from "../../Assets/image3.jpg"
import ImageFour from "../../Assets/image4.jpg"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BookCrousel = () => {
  return (
    <div className="book__carousel__container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // autoplay={{
        //   delay: 2000, // Delay between slides in milliseconds
        //   disableOnInteraction: false, // Continue autoplay after user interactions
        // }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        height={"300px"}
      >
        <SwiperSlide>
          <div className="swiper__slide__element"><img src={ImageOne} alt="one image"/></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide__element"><img src={ImageTwo} alt="one image"/></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide__element"><img src={ImageThree} alt="one image"/></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide__element"><img src={ImageFour} alt="one image"/></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BookCrousel;
