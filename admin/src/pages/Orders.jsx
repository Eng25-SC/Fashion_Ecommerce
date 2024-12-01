import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  // status handler
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)

    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Orders Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-10 h-10"
              />
              <div className="text-sm text-gray-600">
                <div className="space-y-1">
                  {order.items.map((item, itemIndex) => (
                    <p key={itemIndex}>
                      {item.name} x {item.quantity}
                      {item.size && (
                        <span className="text-gray-500"> (Size: {item.size})</span>
                      )}
                    </p>
                  ))}
                </div>
                <p className="mt-2 font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {order.address.street}, {order.address.city}, {order.address.state}
                  , {order.address.country}, {order.address.zipcode}
                </p>
                <p className="text-sm text-gray-500">Phone: {order.address.phone}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between text-sm text-gray-700">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg">
                {currency} {order.amount}
              </p>
              <select
                value={order.status}
                onChange={(event)=>statusHandler( event, order._id)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Orders;
