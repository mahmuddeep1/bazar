import { Suspense } from 'react';
import Image from 'next/image';
import NavLinks from './NavLinks';
import UserInfo from './UserInfo';
import DateDisplay from './DateDisplay';

const Navbar = () => {
    return (
        <div>
            <div className='relative flex justify-between max-w-7xl p-5'>
                <div className='flex gap-2 px-20'>
                    <Image src={'/logo-icon.png'} alt='logo' height={50} width={50} className='w-12 h-12 object-contain bg-green-800 rounded-md' />
                    <div className='flex flex-col items-center sm:items-start'>
                        <h1 className='font-bold text-2xl'>বাজার দর</h1>
                        <p className='text-[10px] text-gray-500'>
                            <Suspense fallback={null}>
                                <DateDisplay />
                            </Suspense>
                        </p>
                    </div>
                </div>
                <Suspense fallback={<div className='h-8 w-24 px-20' />}>
                    <UserInfo />
                </Suspense>
            </div>
            <Suspense fallback={<div className='h-14 border border-gray-200' />}>
                <NavLinks />
            </Suspense>
        </div>
    );
};

export default Navbar;