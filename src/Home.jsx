import { Link } from 'react-router-dom';

const Home = () => {
  // Static data for home page sections
  const platformInfo = {
    title: "IELTS Smart Practice",
    tagline: "Master IELTS with Intelligent Mock Tests",
    description: "Your comprehensive platform for IELTS preparation with realistic mock tests, personalized feedback, and expert strategies to help you achieve your target band score."
  };

  const statistics = {
    totalTests: 150,
    totalTips: 200,
    totalResources: 75,
    activeUsers: "15K+"
  };

  const features = [
    {
      id: 1,
      icon: "🎯",
      title: "Realistic Mock Tests",
      description: "Practice with authentic IELTS-style questions that mirror the actual exam format and difficulty level. Get timed tests with automatic scoring."
    },
    {
      id: 2,
      icon: "📊",
      title: "Detailed Analytics",
      description: "Get comprehensive performance reports and identify your strengths and areas for improvement with detailed section-wise analysis."
    },
    {
      id: 3,
      icon: "💡",
      title: "Expert Strategies",
      description: "Learn proven techniques and tips from IELTS experts to maximize your band score with targeted improvement strategies."
    },
    {
      id: 4,
      icon: "🎧",
      title: "Listening Practice",
      description: "Improve your listening skills with authentic audio materials, various accents, and interactive question types similar to real IELTS."
    },
    {
      id: 5,
      icon: "📖",
      title: "Reading Enhancement",
      description: "Develop reading comprehension skills with academic texts, time management strategies, and question-solving techniques."
    },
    {
      id: 6,
      icon: "✍️",
      title: "Writing Feedback",
      description: "Get detailed feedback on your writing tasks with band score predictions and improvement suggestions from experts."
    }
  ];

  const whyChooseUs = [
    {
      title: "Authentic Exam Simulation",
      description: "Our tests are designed by IELTS experts to closely replicate the actual exam experience and difficulty level."
    },
    {
      title: "Personalized Learning Path",
      description: "AI-powered adaptive learning that adjusts to your skill level and focuses on areas needing improvement."
    },
    {
      title: "Comprehensive Performance Tracking",
      description: "Detailed analytics help you monitor progress and identify weak areas across all IELTS modules."
    },
    {
      title: "Expert-Curated Content",
      description: "All materials are developed and reviewed by certified IELTS trainers with years of teaching experience."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Platform Intro */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Trusted by 15,000+ Students
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              {platformInfo.title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">
              {platformInfo.tagline}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {platformInfo.description}
            </p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">{statistics.totalTests}+</div>
              <div className="text-gray-600">Mock Tests</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-green-600">{statistics.totalTips}+</div>
              <div className="text-gray-600">Expert Tips</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600">{statistics.totalResources}+</div>
              <div className="text-gray-600">Resources</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600">{statistics.activeUsers}</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/tests" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              🎯 Start Practice Now
            </Link>
            <Link 
              to="/tests" 
              className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 font-medium shadow-sm text-lg"
            >
              📋 Take Mock Test
            </Link>
          </div>
        </div>
      </div>

      {/* Why This Platform Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose IELTS Smart Practice?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing IELTS preparation with cutting-edge technology and expert-driven content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-blue-600 text-2xl font-bold mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Overview Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features for Your Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to master IELTS and achieve your dream band score
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Achieve Your Target Band Score?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their IELTS preparation with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/registration" 
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition duration-300 font-bold shadow-lg hover:shadow-xl text-lg"
            >
              🚀 Get Started Free
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 font-medium text-lg"
            >
              🔓 Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
