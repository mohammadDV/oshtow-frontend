'use client'

import { useCommonTranslation } from "@/hooks/useTranslation";
import { useRef } from "react";
import { TripCard } from "../cards/trip";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import type { Swiper as SwiperType } from 'swiper';

export interface TripsCarouselProps {
    title: string
}

export const TripsCarousel = ({ title }: TripsCarouselProps) => {
    const t = useCommonTranslation();
    const swiperRef = useRef<SwiperType>(null);

    const handlePrevSlide = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNextSlide = () => {
        swiperRef.current?.slideNext();
    };

    return (
        <section className="mt-8 lg:mt-16 container mx-auto pr-4 lg:px-4">
            <div className="flex items-center justify-between mb-4 lg:mb-6 pl-4 lg:pl-0">
                <div className="flex items-center gap-2.5 lg:gap-4">
                    <h2 className="text-lg lg:text-2xl font-bold text-title">
                        {title}
                    </h2>
                    <div className="h-0.5 rounded-full w-9 lg:w-12 bg-hint"></div>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <div className="hidden lg:flex items-center gap-2">
                        <button
                            onClick={handlePrevSlide}
                            className="flex items-center justify-center size-9 rounded-full bg-white cursor-pointer"
                        >
                            <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-5" className="text-primary" />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            className="flex items-center justify-center size-9 rounded-full bg-white cursor-pointer"
                        >
                            <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-5" className="text-primary" />
                        </button>
                    </div>
                    <Link
                        href={'/'}
                        className="h-8 lg:h-9 flex items-center gap-1.5 justify-center px-3 lg:px-4 text-primary text-xs lg:text-sm rounded-full bg-white">
                        {t('buttons.seeMore')}
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-3 lg:size-4" />
                    </Link>
                </div>
            </div>
            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1.5}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                className="consignments-swiper"
            >
                {Array.from({ length: 6 }, (_, index) => (
                    <SwiperSlide key={index}>
                        <TripCard />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}