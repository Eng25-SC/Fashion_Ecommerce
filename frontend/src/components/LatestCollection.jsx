import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    return (
        <div className="my-10 ">
            <div className="text-center py-8 text-3xl">
                <Title text1="LATEST" text2="COLLECTION" />
                <p className="w-full sm:w-3/4 md:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-3">
                    Step into the season with our carefully curated Latest Collection. From stylish apparel to must-have accessories, explore an array of exclusive designs that blend comfort, fashion, and functionality. Stay ahead of the trends with vibrant hues, modern cuts, and high-quality materials. Available now for a limited time!
                </p>
            </div>

            {/* Latest products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                {latestProducts.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
                        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                    </div>
                ))}

 
            </div>

        </div>

    );
}

export default LatestCollection;
