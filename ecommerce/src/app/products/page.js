'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 1,
    name: "Cosmic Brownie",
    price: 12.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQkkgiI_JMi1jRFCvoTVd2VoFnMETD4E7yXmOZsSI_ZMI6agV7I8980xI-xKY1HuvDACE_APo_5M9Brj5JnkiaC8dst4i1kpNbumWYxM6gLiV98uSQCp8QvvvfQlvj-IQnI5XdOQMzwNQis6i7UF0O9waTQUxeQp21mogcCIjnZLG5fvMZJ__Ng0W12HOhAWGPoNYiAOIXNdMBG6Z4KaXTo6RG1vh8Qls07255QPuzw0D2fXRCN_iMPOwoTNbouHowD8Js-nM49oxl",
    description: "Rich chocolate ice cream with brownie chunks",
    category: "Chocolate"
  },
  {
    id: 2,
    name: "Mini Egg",
    price: 11.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGMV0j3BrsoINF88bOeqWEFkESN8G4xG4K24B1-rSW2OHiJ6qE7dHq8ixNR0_TSh4BUtOtKfbHrbv9mH0-QafZu-BQMwcQJPWOFlCyB72FfTnqWJQpZ_AMPQ-gdYyAu38OHQzYOPSk7t-LUTKfo6v9hBM99CT6BmvG7zihgnMzJ7VB3RkfayKbCCLliCp3HdZmiKeXa80ur-XesPRf3o7D3GdfbRd7_P7_UN5n75LIZla46e0O7ss1mD8nRX37aM9J8QMGMQCO9Blg",
    description: "Creamy vanilla with mini egg pieces",
    category: "Vanilla"
  },
  {
    id: 3,
    name: "Kinderlicious",
    price: 13.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0TI3Kp-oyXrz5eHUeSD9FBZR0-pvEZCTxCTTurvg9HTKEd4vtzo43oas9EakMqepJBov9ClXTvEnGaaEsVmluCtl_EVkeHyr25RNbGIXxJx1Jy9RyqkkSa9ddBwgcurgSqfPEXKI5oQRLvw5ClT0QsVa7-PzIslhPFWS35kiDbQMOZK4PYKJusUAzjzjXwfXSWtmlGc1gZUiLLukub5fYpTLkN2g3VynIQ-vKZv8FF0Dryw_qwd-Z2YQW_Fwf6oqWmZv-z2RplHCr",
    description: "Hazelnut ice cream with chocolate chunks",
    category: "Specialty"
  },
  {
    id: 4,
    name: "Strawberry Dream",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=300&h=200&fit=crop",
    description: "Fresh strawberry ice cream with real fruit pieces",
    category: "Fruit"
  },
  {
    id: 5,
    name: "Cookies & Cream",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=200&fit=crop",
    description: "Classic vanilla ice cream with chocolate cookie pieces",
    category: "Classic"
  },
  {
    id: 6,
    name: "Mint Chocolate Chip",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop",
    description: "Refreshing mint ice cream with chocolate chips",
    category: "Mint"
  }
];

export default function Products() {
  const { addToCart, getCartItemCount } = useCart();
  const [notification, setNotification] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`Added ${product.name} to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

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
        </div>
      </header>

      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Our Ice Cream Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <span className="text-lg font-bold text-pink-600">${product.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-pink-600 font-medium bg-pink-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-pink-100 mt-20 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 mb-4">© 2025 360 Quick Scoops. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-pink-600 hover:text-pink-700">Privacy Policy</a>
            <a href="#" className="text-pink-600 hover:text-pink-700">Terms of Service</a>
            <a href="#" className="text-pink-600 hover:text-pink-700">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
}
