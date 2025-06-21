// components/CarouselWrapper.tsx
"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactNode } from "react";

interface CarouselWrapperProps {
  children: ReactNode;
  responsive: {
    [key: string]: { breakpoint: { max: number; min: number }; items: number };
  };
  autoPlay?: boolean;
}

export const CarouselWrapper = ({
  children,
  responsive,
  autoPlay = false,
}: CarouselWrapperProps) => {
  return (
    <Carousel
      responsive={responsive}
      autoPlay={autoPlay}
      autoPlaySpeed={3000}
      infinite
      showDots
      arrows
      className="w-full"
    >
      {children}
    </Carousel>
  );
};
