'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function Checkout() {
  const { 
    cart, 
    getSubtotal, 
    getTax, 
    getDiscount, 
    getFinalTotal,
    getCartItemCount,
    clearCart
  } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    deliveryMethod: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: ''
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    },
    orderNumber: ''
  });

  const deliveryFee = 5.99;
  const subtotal = getSubtotal();
  const discount = subtotal >= 50 ? subtotal * 0.1 : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const deliveryCharge = orderData.deliveryMethod === 'delivery' ? deliveryFee : 0;
  const tax = (subtotalAfterDiscount + deliveryCharge) * 0.13;
  const finalTotal = subtotalAfterDiscount + deliveryCharge + tax;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeliveryMethodChange = (method) => {
    setOrderData({
      ...orderData,
      deliveryMethod: method
    });
  };

  const handleContactInfoChange = (field, value) => {
    setOrderData({
      ...orderData,
      contactInfo: {
        ...orderData.contactInfo,
        [field]: value
      }
    });
  };

  const handlePaymentInfoChange = (field, value) => {
    setOrderData({
      ...orderData,
      paymentInfo: {
        ...orderData.paymentInfo,
        [field]: value
      }
    });
  };

  const processOrder = () => {
    // Generate order number and store order totals
    const orderNumber = 'QS' + Date.now().toString().slice(-6);
    setOrderData({
      ...orderData,
      orderNumber: orderNumber,
      orderTotals: {
        subtotal: subtotal,
        discount: discount,
        deliveryFee: deliveryCharge,
        tax: tax,
        finalTotal: finalTotal
      }
    });
    
    // Clear cart and move to confirmation
    clearCart();
    setCurrentStep(4);
  };

  // Calculate final total for display in step 4 (after order is placed)
  const getOrderTotal = () => {
    if (currentStep === 4 && orderData.orderTotals) {
      return orderData.orderTotals.finalTotal;
    }
    return finalTotal;
  };

  const isStep1Valid = orderData.deliveryMethod !== '';
  const isStep2Valid = orderData.contactInfo.name && orderData.contactInfo.email && orderData.contactInfo.phone &&
    (orderData.deliveryMethod === 'pickup' || (orderData.contactInfo.address && orderData.contactInfo.city && orderData.contactInfo.postalCode));
  const isStep3Valid = orderData.paymentInfo.cardNumber && orderData.paymentInfo.expiryDate && 
    orderData.paymentInfo.cvv && orderData.paymentInfo.cardholderName;

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep ? 'bg-pink-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-pink-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Delivery</span>
        <span>Contact</span>
        <span>Payment</span>
        <span>Confirm</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Choose Delivery Method</h2>
      
      <div className="space-y-4">
        <div 
          className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
            orderData.deliveryMethod === 'delivery' ? 'border-pink-600 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleDeliveryMethodChange('delivery')}
        >
          <div className="flex items-center space-x-4">
            <input 
              type="radio" 
              name="deliveryMethod" 
              value="delivery"
              checked={orderData.deliveryMethod === 'delivery'}
              onChange={() => handleDeliveryMethodChange('delivery')}
              className="text-pink-600"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Home Delivery</h3>
              <p className="text-gray-600">Delivered to your door within 1-2 hours</p>
              <p className="text-pink-600 font-semibold">Delivery fee: $5.99</p>
            </div>
          </div>
        </div>

        <div 
          className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
            orderData.deliveryMethod === 'pickup' ? 'border-pink-600 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleDeliveryMethodChange('pickup')}
        >
          <div className="flex items-center space-x-4">
            <input 
              type="radio" 
              name="deliveryMethod" 
              value="pickup"
              checked={orderData.deliveryMethod === 'pickup'}
              onChange={() => handleDeliveryMethodChange('pickup')}
              className="text-pink-600"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">In-Store Pickup</h3>
              <p className="text-gray-600">Pick up at our store location</p>
              <p className="text-gray-600">775 Southdale Road East, London ON</p>
              <p className="text-green-600 font-semibold">Free pickup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={orderData.contactInfo.name}
            onChange={(e) => handleContactInfoChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={orderData.contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={orderData.contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        {orderData.deliveryMethod === 'delivery' && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
              <input
                type="text"
                value={orderData.contactInfo.address}
                onChange={(e) => handleContactInfoChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                value={orderData.contactInfo.city}
                onChange={(e) => handleContactInfoChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
              <input
                type="text"
                value={orderData.contactInfo.postalCode}
                onChange={(e) => handleContactInfoChange('postalCode', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is a demo checkout. Use fake payment information for testing.
        </p>
      </div>
      
      <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={orderData.paymentInfo.cardNumber}
            onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={orderData.paymentInfo.expiryDate}
            onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
          <input
            type="text"
            placeholder="123"
            value={orderData.paymentInfo.cvv}
            onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
          <input
            type="text"
            value={orderData.paymentInfo.cardholderName}
            onChange={(e) => handlePaymentInfoChange('cardholderName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="text-black bg-gray-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({getCartItemCount()} items):</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10% off $50+):</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          {deliveryCharge > 0 && (
            <div className="flex justify-between">
              <span>Delivery fee:</span>
              <span>${deliveryCharge.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax (13%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <span className="material-icons text-green-600 text-3xl">check_circle</span>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800">Order Confirmed!</h2>
      
      <div className="text-black bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span>Order Number:</span>
            <span className="font-semibold">{orderData.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="font-semibold">${getOrderTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Method:</span>
            <span className="font-semibold capitalize">{orderData.deliveryMethod}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          Thank you for your order! We'll send you a confirmation email shortly.
        </p>
        {orderData.deliveryMethod === 'delivery' ? (
          <p className="text-gray-600">
            Your ice cream will be delivered within 1-2 hours to {orderData.contactInfo.address}.
          </p>
        ) : (
          <p className="text-gray-600">
            Your order will be ready for pickup at our store location within 30 minutes.
          </p>
        )}
      </div>

      {/* Survey Link */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-pink-800 mb-2">Get Free Delivery!</h3>
        <p className="text-pink-700 mb-4">
          Fill out this survey about your experience and get free delivery on your next order!
        </p>
        <a 
          href="/survey" 
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors inline-block"
        >
          Take Survey
        </a>
      </div>
      
      <div className="space-x-4">
        <a 
          href="/" 
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Continue Shopping
        </a>
        <a 
          href="/products" 
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          View Products
        </a>
      </div>
    </div>
  );

  if (cart.length === 0 && currentStep < 4) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <a href="/products" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-pink-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <a href="/cart" className="text-pink-600 hover:text-pink-700">
                ← Back to Cart
              </a>
            </div>
            <div className="w-1/3 text-center">
              <a className="text-2xl font-bold text-pink-600 hover:text-pink-700" href="/">360° Quick Scoops</a>
            </div>
            <div className="w-1/3"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {renderProgressBar()}
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    currentStep === 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  disabled={currentStep === 1}
                >
                  Back
                </button>
                
                <button
                  onClick={currentStep === 3 ? processOrder : handleNext}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    (currentStep === 1 && !isStep1Valid) ||
                    (currentStep === 2 && !isStep2Valid) ||
                    (currentStep === 3 && !isStep3Valid)
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                  disabled={
                    (currentStep === 1 && !isStep1Valid) ||
                    (currentStep === 2 && !isStep2Valid) ||
                    (currentStep === 3 && !isStep3Valid)
                  }
                >
                  {currentStep === 3 ? 'Place Order' : 'Next'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
