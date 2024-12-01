import React, { useContext, useState } from 'react'
import Layout from '../layout/Layout'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''

  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))

  }


  // for razorpay initpay
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } });
          if (data.success) {
            toast.success('Order placed successfully');
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)

        }

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        // API calls for COD
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } })
          console.log(response.data);

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;


        case 'stripe':
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          }
          else {
            toast.error(responseStripe.data.message)
          }

          break;


        case 'razorpay':
          const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);

          }

          break;

        default:

          break;
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }
  return (
    <Layout totle={'your orders'}>
      <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-center gap-8 pt-8 pb-8 min-h-[80vh] border-t border-gray-200">

        {/* Left Side: Delivery Information */}
        <div className="flex flex-col gap-5 w-full sm:w-1/2 lg:w-2/5 px-4">
          <div className="text-xl sm:text-2xl mb-4">
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          {/* Input Fields */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              onChange={onChangeHandler}
              name='firstName'
              value={formData.firstName}
              required
              className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last name"
              onChange={onChangeHandler}
              name='lastName'
              value={formData.lastName}
              required
              className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            onChange={onChangeHandler}
            name='email'
            value={formData.email}
            required
            className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Street"
            onChange={onChangeHandler}
            name='street'
            value={formData.street}
            required
            className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
          />

          {/* City and State */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              onChange={onChangeHandler}
              name='city'
              value={formData.city}
              required
              className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="State"
              onChange={onChangeHandler}
              name='state'
              value={formData.state}
              required
              className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Zip Code and Country */}
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              name='zipcode'
              value={formData.zipcode}
              required
              className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Country"
              onChange={onChangeHandler}
              name='country'
              value={formData.country}
              required
              className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <input
            type="number"
            placeholder="Phone"
            onChange={onChangeHandler}
            name='phone'
            value={formData.phone}
            required
            className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Right Side: Cart Total */}
        <div className="w-full sm:w-1/2 lg:w-2/5 px-4 md:mt-20 sm:mt-0 lg:mt-20">
          <div className="">

            <CartTotal />
          </div>
          <div className="mt-12">
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            {/* --------------Payment method selection */}
            <div className="flex gap-4 flex-col lg:flex-row">
              {/* Stripe */}
              <div
                onClick={() => setMethod('stripe')}
                className={`flex items-center border-2 p-3 px-4 cursor-pointer rounded-lg shadow-sm transition-all duration-300 ${method === 'stripe' ? 'border-green-500 bg-green-100' : 'border-gray-300 hover:border-gray-500'}`}
              >
                <p
                  className={`w-4 h-4 border-2 rounded-full mr-4 transition-colors duration-300 ${method === 'stripe' ? 'bg-green-400 border-green-500' : 'border-gray-400'}`}
                ></p>
                <img src={assets.stripe_logo} alt="Stripe" className="h-6" />
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setMethod('razorpay')}
                className={`flex items-center border-2 p-3 px-4 cursor-pointer rounded-lg shadow-sm transition-all duration-300 ${method === 'razorpay' ? 'border-green-500 bg-green-100' : 'border-gray-300 hover:border-gray-500'}`}
              >
                <p
                  className={`w-4 h-4 border-2 rounded-full mr-4 transition-colors duration-300 ${method === 'razorpay' ? 'bg-green-400 border-green-500' : 'border-gray-400'}`}
                ></p>
                <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setMethod('cod')}
                className={`flex items-center border-2 p-3 px-4 cursor-pointer rounded-lg shadow-sm transition-all duration-300 ${method === 'cod' ? 'border-green-500 bg-green-100' : 'border-gray-300 hover:border-gray-500'}`}
              >
                <p
                  className={`w-4 h-4 border-2 rounded-full mr-4 transition-colors duration-300 ${method === 'cod' ? 'bg-green-400 border-green-500' : 'border-gray-400'}`}
                ></p>
                <p className="text-gray-600 text-base font-medium">Cash on Delivery</p>
              </div>
            </div>

            {/* button */}
            <div className="w-full text-end mt-8">
              <button
                type='submit'
                className=" bg-black text-white px-16 py-3 text-sm">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

      </form>

    </Layout>
  );
}

export default PlaceOrder;
