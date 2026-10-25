
import Image from 'next/image';
import Link from 'next/link';
import DateDisplay from '../navbar/DateDisplay';


const Hero = () => {
    
    return (
        <div className='w-[90%] mx-auto flex flex-col md:justify-around gap-5 bg-white border border-gray-100 rounded-xl mt-6 md:flex-row'>
            <div className='w-full md:w-1/2 p-4 md:py-10 md:px-10 flex flex-col items-center text-center md:items-start md:text-left mx-auto'>
                <h6 className='bg-green-100 text-green-600 w-fit rounded-xl py-1 px-3 mb-2 font-bold'>
                    <DateDisplay />
                </h6>
                <h1 className='text-3xl font-bold'>আজকের বাজারের দাম এক নজরে</h1>
                <p className='text-gray-500 mt-2'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>

                <Link href="#cards">
                    <button className='bg-green-800 text-white py-2 px-4 font-semibold mt-6 rounded cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2'>সব পণ্য দেখুন</button>
                </Link>
            </div>
            <div className='w-full md:w-1/2 flex justify-center'>
                <Image src={'/bazar-hero.png'} alt='Banner' height={400} width={400} className='h-80 w-80 object-contain' />
            </div>
        </div>
    );
};

export default Hero;