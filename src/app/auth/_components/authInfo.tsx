import authBackground from '@/assets/images/auth-background.jpg';
import { usePagesTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

export const AuthInfo = () => {
    const t = usePagesTranslation();

    return (
        <div className="relative hidden md:block">
            <Image
                src={authBackground}
                alt=""
                className="absolute inset-0 h-full w-full object-cover rounded-4xl"
            />
            <div className='absolute z-10 bottom-12 right-8'>
                <h3 className='text-white font-bold text-3xl mb-2.5'>
                    {t("auth.welcome")}
                </h3>
                <p className='text-white leading-6 font-light text-justify max-w-2/3'>
                    {t("auth.infoText")}
                </p>
            </div>
        </div>
    )
}