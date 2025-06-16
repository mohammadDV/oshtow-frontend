
import localFont from 'next/font/local';

export const peydaFont = localFont({
    src: [
        {
            path: '../assets/fonts/PeydaWebFaNum-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../assets/fonts/PeydaWebFaNum-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
    ],
    variable: '--font-peyda',
    style: 'normal',
    display: 'swap',
})