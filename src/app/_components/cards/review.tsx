import { Icon } from '@/ui/icon'
import React from 'react'

export const ReviewCard = () => {
    return (
        <div className='bg-white rounded-3xl p-5 flex gap-4'>
            <div className="size-12 rounded-full bg-light flex items-center justify-center">
                <Icon
                    icon="solar--user-rounded-bold-duotone"
                    sizeClass="size-8"
                    className="text-primary" />
            </div>
            <div className='flex-1 flex flex-col gap-3 mt-2'>
                <div className='flex items-center gap-3'>
                    <p className='text-title font-semibold'>
                        محمد رضایی
                    </p>
                    <p className='text-primary text-sm font-normal'>
                        سفر استانبول به تهران
                    </p>
                </div>
                <p className='text-caption text-justify text-sm font-normal leading-6'>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                </p>
                <div className='flex items-center gap-3'>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, index) => (
                            <Icon key={index}
                                icon="solar--star-bold"
                                sizeClass="size-3.5"
                                className="text-amber-400" />
                        ))}
                    </div>
                    <span className="text-caption font-normal text-xs">
                        ۲۹ اردیبهشت
                    </span>
                </div>
            </div>
        </div>
    )
}