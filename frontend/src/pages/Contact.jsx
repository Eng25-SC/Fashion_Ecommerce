import React from 'react'
import Layout from '../layout/Layout'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <Layout title={'Fashion - Contact'}>
      <div className="">
        <div className=" text-center text-2xl pt-10 border-t">
          <Title text1={'CONTACT'} text2={'US'} />
        </div>

        <div className=" my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 h-[70vh]">
          <img src={assets.contact_img} alt="" className=" w-full md:max-w-[400px] " />
          <div className=" flex flex-col justify-center  gap-6">
            <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
            <p className=" text-gray-500 ">5476 Willims Station <br /> Suite 350, Washington , USA</p>
            <p className="">Tel: (415) 555-282 <br /> Email: admin@forever.com</p>
            <p className="font-semibold text-xl text-gray-600">Careers at Fashion </p>
            <p className=" text-gray-500 ">Learn more about our team and job opening.</p>
          <button className=" border border-black  py-4 text-sm hover:bg-black hover:text-white transition-all duration-500   ">Eplore Jobs</button>
          </div>
        </div>

        <NewsLetterBox/>
      </div>
    </Layout>
  )
}

export default Contact
