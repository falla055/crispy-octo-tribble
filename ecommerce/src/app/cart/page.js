'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getSubtotal, 
    getTax, 
    getDiscount, 
    getFinalTotal,
    getCartItemCount
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === '10OVER50' && getSubtotal() > 50) {
      setPromoApplied(true);
      alert('Promo code applied! 10% discount on orders over $50.');
    } else if (promoCode.toUpperCase() === '10OVER50' && getSubtotal() <= 50) {
      alert('This promo code requires a minimum order of $50.');
    } else {
      alert('Invalid promo code.');
    }
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Redirect to checkout page
    window.location.href = '/checkout';
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
                <span className="material-icons text-gray-700 cursor-pointer hover:text-pink-600">shopping_bag</span>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white-800 mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="pb-12 text-gray-600 text-lg mb-4">Your cart is empty</p>
            <a href="/products" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-pink-600 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-800">
                    <span>Subtotal:</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10OVER50):</span>
                      <span>-${getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-800">
                    <span>Tax (13%):</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>Total:</span>
                      <span>${getFinalTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-800">
                  <input 
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button 
                    onClick={applyPromoCode}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Apply Code
                  </button>
                  <button 
                    onClick={proceedToCheckout}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
