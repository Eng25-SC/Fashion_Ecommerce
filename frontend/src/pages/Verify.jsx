import React from 'react'
import Layout from '../layout/Layout'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const verifyPayment = async () => {
        try {
            if (!token) {
                return toast.error("User is not authenticated");
            }

            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { success, orderId, userId: localStorage.getItem('userId') }, // Include userId if needed
                { headers: { token } } // Corrected headers
            );

            if (response.data.success) {
                setCartItems({});
                toast.success("Payment Successful! Redirecting to orders...");
                navigate('/orders'); // Navigate to orders page
            } else {
                toast.error("Payment Failed. Redirecting to home...");
                navigate('/'); // Navigate to home page
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred during payment verification.");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [success, orderId, token]); // Added dependencies




    return (
        <Layout title={'verify payment'}>

        </Layout>
    )
}

export default Verify
