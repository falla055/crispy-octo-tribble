'use client';

import { useState } from 'react';

export default function Survey() {
  const [surveyData, setSurveyData] = useState({
    satisfaction: 0,
    recommendation: 0,
    newFlavor: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (question, rating) => {
    setSurveyData({
      ...surveyData,
      [question]: rating
    });
  };

  const handleFlavorChange = (e) => {
    setSurveyData({
      ...surveyData,
      newFlavor: e.target.value
    });
  };

  const isFormComplete = () => {
    return surveyData.satisfaction > 0 && 
           surveyData.recommendation > 0 && 
           surveyData.newFlavor.trim() !== '';
  };

  const handleSubmit = () => {
    if (isFormComplete()) {
      setIsSubmitted(true);
    }
  };

  const renderSmileyRating = (currentRating, onRatingChange) => {
    const smileys = [
      { rating: 1, emoji: '😢', label: 'Very Displeased' },
      { rating: 2, emoji: '😞', label: 'Displeased' },
      { rating: 3, emoji: '😐', label: 'Neutral' },
      { rating: 4, emoji: '😊', label: 'Happy' },
      { rating: 5, emoji: '😁', label: 'Very Happy' }
    ];

    return (
      <div className="flex justify-center space-x-4">
        {smileys.map((smiley) => (
          <button
            key={smiley.rating}
            onClick={() => onRatingChange(smiley.rating)}
            className={`p-3 rounded-lg transition-all ${
              currentRating === smiley.rating
                ? 'bg-pink-100 border-2 border-pink-500 transform scale-110'
                : 'bg-gray-100 border-2 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-1">{smiley.emoji}</div>
              <div className="text-xs text-black">{smiley.label}</div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-pink-50">
        <header className="bg-pink-100">
          <div className="container mx-auto px-6 py-4">
            <div className="text-center">
              <a className="text-2xl font-bold text-pink-600 hover:text-pink-700" href="/">360 Quick Scoops</a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-icons text-green-600 text-3xl">check_circle</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
              <p className="text-gray-600 mb-8">
                Your feedback is valuable to us and helps us improve our service!
              </p>

              {/* Free Shipping Code */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 text-white mb-8">
                <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
                <p className="mb-4">You've earned free delivery on your next order!</p>
                <div className="bg-white text-pink-600 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Use this code at checkout:</p>
                  <div className="text-2xl font-bold tracking-wider border-2 border-dashed border-pink-300 rounded-lg py-3">
                    FREESHIP
                  </div>
                </div>
                <p className="text-sm mt-4 opacity-90">
                  * Valid for 30 days from today. One-time use only.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="/" 
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors inline-block"
                >
                  Back to Home Page
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-pink-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <a href="/" className="text-pink-600 hover:text-pink-700">
                ← Back to Home
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
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Customer Experience Survey</h1>
              <p className="text-gray-600">
                Help us improve by sharing your experience! Complete this short survey to earn 
                <span className="font-semibold text-pink-600"> free delivery</span> on your next order.
              </p>
            </div>

            <div className="space-y-8">
              {/* Question 1 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  1. How did you feel about the shopping process? Were you able to explore and find the flavours you were looking for?
                </h3>
                {renderSmileyRating(surveyData.satisfaction, (rating) => handleRatingChange('satisfaction', rating))}
              </div>

              {/* Question 2 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  2. How did you feel about the checkout process? Was it simple and efficient or was it frustrating?
                </h3>
                {renderSmileyRating(surveyData.recommendation, (rating) => handleRatingChange('recommendation', rating))}
              </div>

              {/* Question 3 */}
              <div className="pb-6 text-black">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">
                  3. What new ice cream flavor would you like to see added to our menu?
                </h3>
                <div className="max-w-md mx-auto">
                  <textarea
                    value={surveyData.newFlavor}
                    onChange={handleFlavorChange}
                    placeholder="Tell us about your dream ice cream flavor..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    rows="3"
                  />
                </div>
              </div>
              
              {/* Question 4 */}
              <div className="pb-6 text-black">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">
                  4. (Optional) Would you like to give us any specific feedback about your shopping experience for future improvements?
                </h3>
                <div className="max-w-md mx-auto">
                  <textarea
                    value={surveyData.feedback}
                    onChange={handleFlavorChange}
                    placeholder="Tell us about your dream ice cream flavor..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isFormComplete()
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isFormComplete()}
              >
                Submit Survey
              </button>
              
              {!isFormComplete() && (
                <p className="text-sm text-gray-500 mt-2">
                  Please answer all questions to submit the survey
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
