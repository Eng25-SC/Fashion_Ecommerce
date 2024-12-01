import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const ProfilePage = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);
    const [userProfile, setUserProfile] = useState({ name: '', email: '' }); // State to store user profile data
    const [showAllOrders, setShowAllOrders] = useState(false); // State to toggle showing all orders

    // Function to load order data
    const loadOrderData = async () => {
        try {
            if (!token) return null;
            const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        allOrdersItem.push({
                            ...item,
                            status: order.status,
                            payment: order.payment,
                            paymentMethod: order.paymentMethod,
                            date: order.date,
                        });
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

    // Function to load user profile data
    const loadUserProfile = async () => {
        try {
            if (!token) return null;
            const response = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
            if (response.data.success) {
                setUserProfile({
                    name: response.data.user.name,
                    email: response.data.user.email,
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    useEffect(() => {
        loadOrderData();
        loadUserProfile(); // Fetch user profile when the component mounts
    }, [token]);

    // Function to toggle showing all orders
    const toggleShowAllOrders = () => setShowAllOrders(!showAllOrders);

    return (
        <Layout title={'your profile'}>
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="User Avatar"
                                className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-sm"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{userProfile.name}</h1> {/* Display user name */}
                                <p className="text-gray-600">{userProfile.email}</p> {/* Display user email */}
                            </div>
                        </div>
                        {/* <button className="mt-4 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Edit Profile
                        </button> */}
                    </div>

                    {/* Orders Section */}
                    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order History</h2>
                        <div>
                            {orderData.slice(0, showAllOrders ? orderData.length : 2).map((item, index) => (
                                <div
                                    className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                    key={index}
                                >
                                    <div className="flex items-start gap-6 text-sm">
                                        <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
                                        <div>
                                            <p className="sm:text-base font-medium">{item.name}</p>
                                            <div className="flex items-center gap-3 mt-1 text-base text-gray-800">
                                                <p>{currency}{item.price}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Size: {item.size}</p>
                                            </div>
                                            <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                                            <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                                        </div>
                                    </div>

                                    <div className="md:w-1/2 flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                            <p className="text-sm md:text-base">{item.status}</p>
                                        </div>
                                        <button
                                            onClick={() => console.log('Tracking order...')}
                                            className="border px-4 py-2 text-sm font-medium rounded-sm"
                                        >
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {orderData.length > 2 && (
                            <div className="text-center mt-4">
                                <button
                                    onClick={toggleShowAllOrders}
                                    className="text-blue-500 font-medium hover:underline"
                                >
                                    {showAllOrders ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
