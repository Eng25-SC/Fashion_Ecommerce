import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Layout from '../layout/Layout';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    // Iterate through cartItems to extract product data
    Object.entries(cartItems).forEach(([productId, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (quantity > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity,
          });
        }
      });
    });

    setCartData(tempData);
  }, [cartItems]);

  return (
    <Layout title={'your-cart'}>
      <div className="border-t pt-14">
        <div className="text-2xl mb-3">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        <div className="divide-y divide-gray-200">
          {cartData.map((item, index) => {
            // Find the product data
            const productData =
              products.find((product) => product._id === item._id) || {
                name: 'Unknown Product',
                price: 0,
                image: [assets.default_product_image], // Add a default product image
              };

            return (
              <div
                className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-gray-800"
                key={index}
              >
                {/* Product Info and Image */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-24 sm:w-32 rounded-md shadow-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">{productData.name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-gray-500 text-sm sm:text-base">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 py-1 bg-slate-50 text-xs sm:text-sm border border-gray-300 rounded-md">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="w-16 sm:w-20 p-1 border border-gray-300 rounded-md text-center text-gray-700"
                />

                {/* Delete Icon */}
                <img
                  src={assets.bin_icon}
                  alt="Remove"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 h-5 cursor-pointer transition duration-200 hover:scale-110"
                />
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="flex justify-end my-20 px-4">
          <div className="w-full max-w-md">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-black text-white text-sm p-3 mt-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
