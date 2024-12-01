import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
            {/* Title */}
            <div className="text-2xl mb-4 text-center">
                <Title text1="CART" text2="TOTALS" />
            </div>

            {/* Totals Section */}
            <div className="space-y-4 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">Subtotal</p>
                    <p className="font-semibold text-gray-900">
                        {currency}{getCartAmount().toFixed(2)}
                    </p>
                </div>
                <hr className="border-gray-300" />

                {/* Shipping Fee */}
                <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">Shipping Fee</p>
                    <p className="font-semibold text-gray-900">
                        {currency}{delivery_fee.toFixed(2)}
                    </p>
                </div>
                <hr className="border-gray-300" />

                {/* Total */}
                <div className="flex justify-between items-center pt-4">
                    <p className="font-bold text-lg text-gray-800">Total</p>
                    <p className="font-bold text-lg text-green-600">
                        {currency}{getCartAmount() === 0 ? '0.00' : (getCartAmount() + delivery_fee).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
