import travel3d from '@/assets/images/3d-traveling.png';
import { usePagesTranslation } from '@/hooks/useTranslation';
import { Button } from '@/ui/button';
import Image from 'next/image';

export const CtaBanner = () => {
    const t = usePagesTranslation();

    return (
        <div className='container mx-auto px-4 mt-10 lg:mt-48'>
            <div className='bg-[url(/images/cta-background.png)] lg:pb-2 bg-cover bg-center bg-no-repeat rounded-3xl lg:rounded-4xl py-7 lg:py-6 px-9 lg:px-14 flex flex-col lg:flex-row items-center justify-between'>
                <div className='flex-1 mt-2'>
                    <h2 className='text-white text-center lg:text-right font-semibold lg:font-bold text-2xl lg:text-3xl'>
                        {t('home.ctaTitle')}
                    </h2>
                    <p className='text-border font-medium text-center lg:text-right lg:text-lg mt-5 mb-7'>
                        {t('home.ctaDescription')}
                    </p>
                    <Button variant='default' size='lg' className='lg:mr-0 mx-auto flex'>
                        {t('home.ctaButton')}
                    </Button>
                </div>
                <Image src={travel3d} alt='' width={448} height={394} className='lg:-mt-36 mt-10' />
            </div>
        </div>
    )
}