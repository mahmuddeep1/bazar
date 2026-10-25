import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-7xl font-bold text-green-700">404</h1>
            <h2 className="text-2xl font-bold mt-4">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
            <Link href="/"
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:bg-[#2d6a4f] cursor-pointer">
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default NotFound;