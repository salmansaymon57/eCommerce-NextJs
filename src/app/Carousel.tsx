import React from "react";
import Carousel from "react-multi-carousel";

export default function Carousel() {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
    tablet: { breakpoint: { max: 1199, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };
}
