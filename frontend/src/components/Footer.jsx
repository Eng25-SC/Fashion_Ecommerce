import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 px-5 sm:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Logo and About Section */}
                <div className="flex flex-col space-y-4">
                    <img src={assets.logo} alt="Forever Company Logo" className="w-32" />
                    <p className="text-gray-400 text-sm">
                        "Discover the latest trends and exclusive deals at your fingertips. Explore our site with ease using the quick links, stay updated by subscribing to our newsletter, and follow us on social media for daily inspiration and updates. Have questions? Contact our friendly customer service team—we're here to help! Plus, shop with confidence knowing we accept all major payment methods. Your satisfaction is our priority."                    </p>
                </div>
                
                {/* Company Links Section */}
                <div>
                    <p className="text-xl font-semibold mb-4">COMPANY</p>
                    <ul className="flex flex-col space-y-2 text-gray-400">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/delivery" className="hover:text-white">Delivery</Link></li>
                        <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <p className="text-xl font-semibold mb-4">GET IN TOUCH</p>
                    <ul className="text-gray-400 space-y-2">
                        <li className="hover:text-white">+1-212-456-6546</li>
                        <li className="hover:text-white">contact@forever.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700 pt-6 mt-10 text-center">
                <p className="text-gray-500 text-xs">© 2024 forever.com - All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
