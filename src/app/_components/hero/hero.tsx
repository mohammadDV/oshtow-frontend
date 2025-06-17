import heroBg from '@/assets/images/hero-background.jpg';
import { usePagesTranslation } from '@/hooks/useTranslation';
import { Button } from '@/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { AdvancedSearch } from './advancedSearch';

export const Hero = () => {
    const t = usePagesTranslation();

    return (
        <>
            <section className="relative w-full -mt-24 lg:mt-0 z-20 h-[40vh] lg:h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={heroBg}
                        alt=""
                        priority
                        quality={100}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-neutral-800/80 to-neutral-800/50 lg:bg-gradient-to-r lg:from-neutral-800 lg:to-neutral-800/20"></div>
                </div>

                <div className="relative container px-4 mt-6 lg:mt-0 mx-auto z-10 h-full lg:pb-24 flex justify-end">
                    <div className='flex flex-col justify-center items-start max-w-lg h-full text-white'>
                        <h1 className="text-xl lg:text-4xl leading-8 lg:leading-14 font-semibold lg:font-bold mb-6">
                            {t('home.heroTitle')}
                        </h1>
                        <p className="font-light text-lg mb-8 hidden lg:block">
                            {t('home.heroDescription')}
                        </p>
                        <div className="lg:flex items-center justify-end gap-4 hidden">
                            <Link href={"/"}>
                                <Button
                                    variant="default"
                                    size="default"
                                    className='py-3'>
                                    {t('home.heroSendButton')}
                                </Button>
                            </Link>
                            <Link href={"/"}>
                                <Button
                                    variant="outline"
                                    size="default"
                                    className='text-white'>
                                    {t('home.heroSubmitTrip')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className='mx-4 -mt-16 lg:-mt-24 z-20 relative'>
                <AdvancedSearch />
            </div>
        </>
    )
}