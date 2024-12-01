import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
    return (
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow-lg">
            {/* Logo */}
            <img
                src={assets.logo}
                alt="Logo"
                className="h-10 sm:h-12 lg:h-14 object-contain"
            />

            {/* Logout Button */}
            <button
                onClick={() => setToken('')}
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-medium px-6 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
