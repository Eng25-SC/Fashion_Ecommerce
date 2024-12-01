import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortValue, setSortValue] = useState('relevant'); // Added sorting state

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    // For search bar
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    // For category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    //for subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };


  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch,products]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortValue(value);

    let sortedProducts = [...filterProducts];
    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sortedProducts);
  };

  return (
    <Layout title={'Fashion - Collection'}>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        {/* Filter Options */}
        <div className="min-w-60">
          <p
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
            <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
          </p>

          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" value={"Men"} onChange={toggleCategory} /> Men
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" value={"Women"} onChange={toggleCategory} /> Women
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" value={"Kids"} onChange={toggleCategory} /> Kids
              </label>
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" value={'Winterwear'} onChange={toggleSubCategory} /> WinterWear
              </label>
            </div>
          </div>
        </div>

        {/* Right side Product Collection Section */}
        <div className="flex-grow">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTION'} />
            <select className='border-2 border-gray-300 text-sm px-2 md:px-0' value={sortValue} onChange={handleSortChange}>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low-High</option>
              <option value="high-low">Sort by: High-Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item) => (
              <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Collection;
