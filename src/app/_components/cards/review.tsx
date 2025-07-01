import { Review } from '@/types/review.type'
import { Icon } from '@/ui/icon'
import React from 'react'

interface ReviewCardProps {
    data: Review
}

export const ReviewCard = ({ data }: ReviewCardProps) => {
    return (
        <div className='bg-white lg:rounded-3xl rounded-2xl p-3.5 lg:p-5 flex gap-3.5 lg:gap-4'>
            <img src={data.user?.profile_photo_path}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full" />
            <div className='flex-1 flex flex-col gap-2 lg:gap-3 mt-2'>
                <div className='flex items-center gap-3'>
                    <p className='text-title font-semibold'>
                        {data.user.nickname}
                    </p>
                    {/* <p className='text-primary text-sm font-normal'>
                        سفر استانبول به تهران
                    </p> */}
                </div>
                <p className='text-caption text-justify text-sm font-normal leading-6'>
                    {data.comment}
                </p>
                <div className='flex items-center gap-3'>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, index) => (
                            <Icon key={index}
                                icon={index < data.rate ? "solar--star-bold" : "solar--star-outline"}
                                sizeClass="size-3.5"
                                className="text-amber-400" />
                        ))}
                    </div>
                    {/* <span className="text-caption font-normal text-xs">
                        {data?.created_at}
                    </span> */}
                </div>
            </div>
        </div>
    )
}