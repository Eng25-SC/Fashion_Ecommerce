import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
    //for responsive mobile menu
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})

    }
    return (
        <div className='flex items-center justify-between py-5 font-medium border-b-2'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="" />
            </Link>

            <ul className="hidden sm:flex gap-5 text-sm text-gray-onClick={() => setVisible(true)}700">
                <NavLink
                    to='/'
                    className='flex flex-col items-center gap-1 '>
                    <p className="">HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink
                    to='/collection'
                    className='flex flex-col items-center gap-1'>
                    <p className="">COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink
                    to='/about'
                    className='flex flex-col items-center gap-1'>
                    <p className="">ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink
                    to='/contact'
                    className='flex flex-col items-center gap-1'>
                    <p className="">CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            {/* right side */}
            <div className="flex items-center gap-6">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" />

                <div className="group relative">

                    <img
                        onClick={() => token ? null : navigate('/login')}
                        src={assets.profile_icon} alt="" className="w-5 cursor-pointer" />

                    {/* Dropdown Menu */}
                    {token &&
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                <Link to='/myprofile'>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                </Link>
                                <p
                                    onClick={() => navigate('/orders')}
                                    className='cursor-pointer hover:text-black'>Orders
                                </p>
                                <p
                                    onClick={logout}
                                    className='cursor-pointer hover:text-black'>Logout
                                </p>
                            </div>
                        </div>}
                </div>
                <Link
                    to='/cart'
                    className='relative'>
                    <p className="absolute right-[-5px] bottom-3 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {getCartCount()}
                    </p>
                    <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className="w-5 cursor-pointer sm:hidden" />
            </div>

            {/* Sidebar menu for small screen */}
            <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300 ease-in-out ${visible ? 'w-full sm:w-64' : 'w-0'}`}>
                <div className="flex flex-col h-full text-gray-800 shadow-lg">
                    {/* Back button */}
                    <div onClick={() => setVisible(false)} className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                        <img src={assets.dropdown_icon} alt="" className="h-5 rotate-180" />
                        <p className="text-sm font-semibold">Back</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col mt-2 space-y-2">
                        <NavLink to='/' className='py-3 px-6 text-md font-medium border-t border-gray-200 hover:bg-gray-50 transition-colors'>HOME</NavLink>
                        <NavLink to='/collection' className='py-3 px-6 text-md font-medium border-t border-gray-200 hover:bg-gray-50 transition-colors'>COLLECTION</NavLink>
                        <NavLink to='/about' className='py-3 px-6 text-md font-medium border-t border-gray-200 hover:bg-gray-50 transition-colors'>ABOUT</NavLink>
                        <NavLink to='/contact' className='py-3 px-6 text-md font-medium border-t border-gray-200 hover:bg-gray-50 transition-colors'>CONTACT</NavLink>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
