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

export const Hero = () => {
  const t = usePagesTranslation();

  const slideData = [
    {
      title: t("home.heroTitle"),
      description: t("home.heroDescription"),
      sendButton: t("home.heroSendButton"),
      submitPassenger: t("home.heroSubmitPassenger"),
    },
    {
      title: t("home.heroTitle"),
      description: t("home.heroDescription"),
      sendButton: t("home.heroSendButton"),
      submitPassenger: t("home.heroSubmitPassenger"),
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
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0">
                <Image
                  src={heroBg}
                  alt=""
                  priority={index === 0}
                  quality={100}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-gray-700/80 to-gray-700/60 lg:bg-gradient-to-r lg:from-gray-700 lg:to-gray-700/20"></div>
              </div>

              <div className="relative container px-4 pt-6 lg:pt-0 mx-auto z-10 h-full lg:pb-24 flex justify-end">
                <div className="flex flex-col justify-center items-start max-w-lg h-full text-white">
                  <h1 className="text-xl lg:text-4xl leading-8 lg:leading-14 font-semibold lg:font-bold mb-6">
                    {slide.title}
                  </h1>
                  <p className="font-light text-lg mb-8 hidden lg:block">
                    {slide.description}
                  </p>
                  <div className="lg:flex items-center justify-end gap-4 hidden">
                    <Link href={"/"}>
                      <Button variant="default" size="default" className="py-3">
                        {slide.sendButton}
                      </Button>
                    </Link>
                    <Link href={"/"}>
                      <Button
                        variant="outline"
                        size="default"
                        className="text-white"
                      >
                        {slide.submitPassenger}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-pagination absolute !left-4 lg:right-8 !bottom-24 lg:!bottom-1/2 transform z-30 flex flex-col items-end lg:items-start gap-2.5"></div>
    </section>
  );
};
