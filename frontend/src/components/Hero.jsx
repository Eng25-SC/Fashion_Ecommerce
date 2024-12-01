import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-400 rounded-lg overflow-hidden shadow-lg">
            {/* Hero left side */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center items-start p-6 sm:p-10 bg-gray-50">
                <div className="text-[#414141] space-y-4">
                    {/* Bestseller indicator */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 md:w-12 h-[2px] bg-[#414141]"></div>
                        <p className="font-semibold text-xs md:text-sm tracking-widest">OUR BESTSELLER</p>
                    </div>

                    {/* Heading */}
                    <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight sm:leading-snug">
                        Latest Arrivals
                    </h1>

                    {/* Call-to-Action */}
                    <div className="flex items-center gap-3 mt-4 group cursor-pointer">
                        <p className="font-semibold text-sm md:text-base tracking-wide hover:text-red-500 transition-all duration-200">SHOP NOW</p>
                        <div className="w-8 md:w-12 h-[2px] bg-[#414141] group-hover:w-16 transition-all duration-300"></div>
                    </div>
                </div>
            </div>

            {/* Hero right side - Image */}
            <div className="w-full sm:w-1/2 h-auto min-h-[300px] max-h-[500px]">
                <img src={assets.hero_img} alt="Hero" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default Hero;
