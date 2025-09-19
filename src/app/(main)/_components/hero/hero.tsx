"use client";

import heroBg from "@/assets/images/hero-background.jpg";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import desktopBanner1 from "@/assets/images/oshotow-banner-1-desktop.webp"
import desktopBanner2 from "@/assets/images/oshotow-banner-2-desktop.webp"
import mobileBanner1 from "@/assets/images/oshotow-banner-1-mobile.webp"
import mobileBanner2 from "@/assets/images/oshotow-banner-2-mobile.webp"

interface HeroProps {
  isMobile: boolean;
}

export const Hero = ({ isMobile }: HeroProps) => {
  const t = usePagesTranslation();

  const slideData = [
    {
      id: 1,
      desktop: desktopBanner1,
      mobile: mobileBanner1
    },
    {
      id: 2,
      desktop: desktopBanner2,
      mobile: mobileBanner2
    },
  ];

  return (
    <section className="relative w-full -mt-24 lg:mt-0 z-20 h-80 lg:h-[60vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          bulletClass: "hero-pagination-bullet",
          bulletActiveClass: "hero-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={700}
        loop={true}
        className="h-full"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={isMobile ? slide.mobile : slide.desktop}
                alt=""
                priority={index === 0}
                quality={100}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-pagination absolute !left-4 lg:right-8 !bottom-24 lg:!bottom-1/2 transform z-30 flex flex-col items-end lg:items-start gap-2.5"></div>
    </section>
  );
};
