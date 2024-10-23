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
        autoplay={{
          delay: 2000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interactions
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className="swiper__slide__element">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide__element">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide__element">Slide 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide__element">Slide 4</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BookCrousel;
