import React from 'react'
import Layout from '../layout/Layout'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox';
const About = () => {
  return (
    <Layout title={'Fashion - About'}>
      <div className="">
        <div className=" text-2xl  pt-8 border-t">
          <Title text1={'ABOUT'} text2={"US"} />
        </div>

        <div className=" my-10 flex flex-col md:flex-row gap-16">
          <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]" />
          <div className=" flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p className="">Welcome to Fashion, where passion meets purpose. Our mission is to bring you the best of  fashion, through an exceptional shopping experience. With a deep commitment to quality, innovation, and customer satisfaction, we strive to deliver products that not only meet but exceed your expectations.</p>
            <p className="">We believe in making life easier for you by offering carefully curated collections, seamless shopping, and unmatched service. At Fashion, it's not just about products—it's about building lasting relationships and creating value for every customer.
            </p>
            <b className=" text-gray-800">Our Mission</b>
            <p className="">To create a seamless and enjoyable shopping experience while providing exceptional value and quality to our customers.

            </p>
          </div>


        </div>

        <div className=" text-xl py-4">
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className=" flex flex-col md:flex-row text-sm mb-20">
          <div className=" border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b className="">Quality Assurance:</b>
            <p className=" text-gray-600">"Only the Best for You." <br />
              At Fashion, quality is our top priority. From sourcing premium materials to rigorous testing, every product undergoes a meticulous process to ensure it meets the highest standards. We believe that when you invest in us, you're investing in excellence.

            </p>
          </div>

          <div className=" border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b className="">Convenience:</b>
            <p className=" text-gray-600">"Seamless Shopping, Anytime, Anywhere." <br />
              We understand the value of your time. That's why we've designed our platform to be user-friendly, with intuitive navigation, easy payment options, and fast delivery services. Whether you're at home or on the go, shopping with us is always a hassle-free experience.</p>
          </div>

          <div className=" border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b className="">Exceptiona Customer Service:</b>
            <p className=" text-gray-600">"Because You Deserve the Best." <br />
              Our dedicated customer service team is here to assist you every step of the way. From product inquiries to post-purchase support, we go above and beyond to ensure your satisfaction. Your happiness is our success, and we're just a call or click away.</p>
          </div>
        </div>

        <NewsLetterBox />
      </div>
    </Layout>
  )
}

export default About
