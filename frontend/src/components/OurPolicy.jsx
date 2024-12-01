import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
    return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <img src={assets.exchange_icon} alt="Exchange Icon" className="w-16 h-16 mb-3" />
                    <p className="text-lg font-semibold text-gray-800">Easy Exchange Policy</p>
                    <p className="text-sm text-gray-500">We offer a hassle-free exchange policy</p>
                </div>

                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <img src={assets.quality_icon} alt="Quality Icon" className="w-16 h-16 mb-3" />
                    <p className="text-lg font-semibold text-gray-800">7 Days Return Policy</p>
                    <p className="text-sm text-gray-500">We provide a 7-day free return policy</p>
                </div>

                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <img src={assets.support_img} alt="Support Icon" className="w-16 h-16 mb-3" />
                    <p className="text-lg font-semibold text-gray-800">Best Customer Support</p>
                    <p className="text-sm text-gray-500">We provide 24/7 customer support</p>
                </div>
            </div>
        
    );
}

export default OurPolicy;
