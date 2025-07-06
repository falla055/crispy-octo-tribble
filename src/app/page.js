'use client';

import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { getCartItemCount } = useCart();

  return (
    <>
      <header className="bg-pink-100">
        <div className="text-center py-2 bg-pink-200 text-sm font-semibold text-pink-800">
          10% Off All Orders Over $50! Enter Code: "10OVER50"
        </div>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="w-1/3">
            </div>
            <div className="w-1/3 text-center">
              <a className="text-2xl font-bold text-pink-600 hover:text-pink-700" href="/">360 Quick Scoops</a>
            </div>
            <div className="w-1/3 flex justify-end space-x-4">
              <div className="relative">
                <a href="/cart">
                  <span className="material-icons text-gray-700 cursor-pointer hover:text-pink-600">shopping_bag</span>
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
          <nav className="mt-6">
            <ul className="flex justify-center space-x-8 text-gray-700 font-medium">
              <li><a className="hover:text-pink-600 border-b-2 border-pink-600 pb-1 font-semibold text-pink-600" href="/">Home</a></li>
              <li><a className="hover:text-pink-600 border-b-2 border-transparent hover:border-pink-600 pb-1 transition-colors" href="/products">Shop Products</a></li>
              <li><a className="hover:text-pink-600 border-b-2 border-transparent hover:border-pink-600 pb-1 transition-colors" href="#fotm">Flavours of the Month</a></li>
              <li><a className="hover:text-pink-600 border-b-2 border-transparent hover:border-pink-600 pb-1 transition-colors" href="#our-mission">Our Mission</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="relative h-[600px] bg-cover bg-center" style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFYew_V9l-CTBD216weCiPaBjd253Vu779oU1fzpLKbaMGMiM_QTNuKvQsah3WN0r9bHrhpOMNO9lqtblmWrrzxhZ5kygnmNN313NgTy2c4Xs_6FKCzvquHcuMk2CqvAH-ywk_r5NJvT9hoPR365AxHqf3wfTc8ljfW0iA5wHDg_D3bK1gFVsOKzCqFeUob-bNwG0vIEFiUrVcU9oxvrnGD9CXRq_Wop2t5Zxq2QBQkNj6yVpKAec_wzhqALoF77DY1cPZsX1FpNeV')`
        }}>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
            <h1 className="text-6xl font-bold mb-4 text-center leading-tight">
              CHOOSE AS MANY FLAVOURS<br/>AS YOU DESIRE!
            </h1>
            <p className="text-lg text-center mb-8">
              We deliver our ice cream right to your door every weekday!<br/>
              For same-day delivery, order before 2:00 PM EST.
            </p>
            <a className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full hover:bg-pink-100 transition duration-300 cursor-pointer" href="/products">
              Shop Now
            </a>
          </div>
        </div>

        <section className="bg-pink-100 py-6 text-center">
          <p className="font-bold text-pink-800">DELIVERING ACROSS CANADA OR VISIT OUR LOCAL STOREFRONT</p>
          <p className="text-gray-600">775 Southdale Road East, Ottawa ON</p>
        </section>

        <section className="pt-12 pb-12 container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12" id='fotm'>FLAVORS OF THE MONTH</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  alt="Cosmic Brownie Ice Cream" 
                  className="w-full h-auto rounded-md" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQkkgiI_JMi1jRFCvoTVd2VoFnMETD4E7yXmOZsSI_ZMI6agV7I8980xI-xKY1HuvDACE_APo_5M9Brj5JnkiaC8dst4i1kpNbumWYxM6gLiV98uSQCp8QvvvfQlvj-IQnI5XdOQMzwNQis6i7UF0O9waTQUxeQp21mogcCIjnZLG5fvMZJ__Ng0W12HOhAWGPoNYiAOIXNdMBG6Z4KaXTo6RG1vh8Qls07255QPuzw0D2fXRCN_iMPOwoTNbouHowD8Js-nM49oxl"
                />
                <h4 className="mt-4 font-semibold text-gray-800">Cosmic Brownie</h4>
                <p className="text-gray-600 text-sm mt-2">Rich chocolate ice cream with brownie chunks</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  alt="Mini Egg Ice Cream" 
                  className="w-full h-auto rounded-md" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGMV0j3BrsoINF88bOeqWEFkESN8G4xG4K24B1-rSW2OHiJ6qE7dHq8ixNR0_TSh4BUtOtKfbHrbv9mH0-QafZu-BQMwcQJPWOFlCyB72FfTnqWJQpZ_AMPQ-gdYyAu38OHQzYOPSk7t-LUTKfo6v9hBM99CT6BmvG7zihgnMzJ7VB3RkfayKbCCLliCp3HdZmiKeXa80ur-XesPRf3o7D3GdfbRd7_P7_UN5n75LIZla46e0O7ss1mD8nRX37aM9J8QMGMQCO9Blg"
                />
                <h4 className="mt-4 font-semibold text-gray-800">Mini Egg</h4>
                <p className="text-gray-600 text-sm mt-2">Creamy vanilla with mini egg pieces</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-red-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  alt="Kinderlicious Ice Cream" 
                  className="w-full h-auto rounded-md" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0TI3Kp-oyXrz5eHUeSD9FBZR0-pvEZCTxCTTurvg9HTKEd4vtzo43oas9EakMqepJBov9ClXTvEnGaaEsVmluCtl_EVkeHyr25RNbGIXxJx1Jy9RyqkkSa9ddBwgcurgSqfPEXKI5oQRLvw5ClT0QsVa7-PzIslhPFWS35kiDbQMOZK4PYKJusUAzjzjXwfXSWtmlGc1gZUiLLukub5fYpTLkN2g3VynIQ-vKZv8FF0Dryw_qwd-Z2YQW_Fwf6oqWmZv-z2RplHCr"
                />
                <h4 className="mt-4 font-semibold text-gray-800">Kinderlicious</h4>
                <p className="text-gray-600 text-sm mt-2">Hazelnut ice cream with chocolate chunks</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/products" 
              className="bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition duration-300 inline-block"
            >
              See All Flavours
            </a>
          </div>
        </section>

        <section className="py-20 container mx-auto px-6 text-center" id="our-mission">
          <h2 className="text-sm font-semibold text-pink-600">360 QUICK SCOOPS</h2>
          <h3 className="text-4xl font-bold text-white mt-2 mb-4">OUR MISSION</h3>
          <p className="text-lg-600 max-w-3xl mx-auto">
            At 360 Quick Scoops, our mission is to bring premium ice cream directly to your doorstep, making it easier than ever to indulge in your favorite treats. Whether you’re craving one of our timeless classics or looking to try something new from specialty options, we’re here to deliver a delightful dessert experience right to you. No lines, no hassle, just pure ice cream joy.
          </p>
        </section>
      </main>
    </>
  );
}
