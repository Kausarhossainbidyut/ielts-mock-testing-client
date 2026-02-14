const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Master IELTS with <span className="text-blue-600">Smart Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Prepare for your IELTS exam with our comprehensive mock tests, personalized feedback, 
            and expert strategies designed to help you achieve your target band score.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Practicing Now
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 font-medium shadow-sm">
              View Sample Tests
            </button>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Realistic Mock Tests</h3>
              <p className="text-gray-600">Practice with authentic IELTS-style questions that mirror the actual exam format and difficulty level.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Detailed Analytics</h3>
              <p className="text-gray-600">Get comprehensive performance reports and identify your strengths and areas for improvement.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Strategies</h3>
              <p className="text-gray-600">Learn proven techniques and tips from IELTS experts to maximize your band score.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
