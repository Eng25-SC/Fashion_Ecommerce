import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products?.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className='my-10'>
      {/* Title */}
      <div className="text-center text-3xl py-8 px-4 sm:px-6 md:px-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Our Best Sellers section features the top-rated and most-loved products by our customers. Whether you're looking for trending fashion, essential gadgets, or everyday must-haves, these items are tried and trusted! Find what everyone is raving about and grab them before they're gone!"

        </p>
      </div>  

      {/* Best seller products */}
      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 md:p-6">
          {bestSeller.map((item) => (
            <div key={item._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
              <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No best sellers available at the moment.</p>
      )}
    </div>
  );
};

BestSeller.propTypes = {
  products: PropTypes.array,
};

export default BestSeller;
