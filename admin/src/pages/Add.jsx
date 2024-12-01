import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Simulating category and subcategory data (you can replace this with actual API data)
  const categoryOptions = [
    { name: 'Men', subCategories: ['Topwear', 'Bottomwear', 'Winterwear'] },
    { name: 'Women', subCategories: ['Tops', 'Bottoms', 'Dresses'] },
    { name: 'Kids', subCategories: ['Topwear', 'Bottomwear', 'Winterwear'] },
    { name: 'Accessories', subCategories: ['Bags', 'Shoes', 'Jewelry'] },
    // Add more categories as needed
  ];

  // Effect to load category options and subcategory options
  useEffect(() => {
    setCategories(categoryOptions); // Set category options
    setSubCategories(categoryOptions[0].subCategories); // Default subcategories for the first category
  }, []);

  // Update subcategories based on selected category
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    const categoryData = categoryOptions.find(cat => cat.name === selectedCategory);
    setSubCategories(categoryData ? categoryData.subCategories : []);
    setSubCategory(categoryData ? categoryData.subCategories[0] : ''); // Set default subcategory
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to add the product. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col max-w-md items-start gap-3'>
      <div className="">
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="w-20" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="w-20" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="w-20" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      {/* Product name, description, and price */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Type here' required className="w-full max-w[500px] px-3 py-2" />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write content here' required className="w-full max-w[500px] px-3 py-2" />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select value={category} onChange={handleCategoryChange} className='w-full px-3 py-2'>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">SubCategory</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            {subCategories.map(subCat => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder='25' className='w-full px-3 py-2 sm:w-[120px]' />
        </div>
      </div>

      {/* Product sizes */}
      <div className="">
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== "S") : [...prev, 'S'])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== "M") : [...prev, 'M'])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== "L") : [...prev, 'L'])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== "XL") : [...prev, 'XL'])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== "XXL") : [...prev, 'XXL'])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label htmlFor="bestseller" className='cursor-pointer'>Add to bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
}

export default Add;