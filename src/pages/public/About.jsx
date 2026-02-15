import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: "📝",
      title: "Comprehensive Tests",
      description: "Full-length IELTS mock tests covering all four modules: Listening, Reading, Writing, and Speaking."
    },
    {
      icon: "📊",
      title: "Detailed Analytics",
      description: "Track your progress with detailed performance analytics and personalized recommendations."
    },
    {
      icon: "💡",
      title: "Expert Strategies",
      description: "Learn proven tips and strategies from experienced IELTS instructors."
    },
    {
      icon: "🎯",
      title: "Targeted Practice",
      description: "Focus on your weak areas with adaptive practice sessions."
    },
    {
      icon: "⏱️",
      title: "Timed",
      description: "Simulate real test Practice conditions with timed practice tests."
    },
    {
      icon: "🏆",
      title: "Proven Results",
      description: "Join thousands of successful IELTS candidates who achieved their target scores."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Academic Director",
      image: "👩‍🏫",
      bio: "Former IELTS examiner with 15+ years of experience in English language education."
    },
    {
      name: "Michael Chen",
      role: "Content Lead",
      image: "👨‍💻",
      bio: "EdTech specialist focused on creating engaging online learning experiences."
    },
    {
      name: "Emma Williams",
      role: "Speaking Coach",
      image: "👩‍🎤",
      bio: "Certified speaking instructor with expertise in accent training and pronunciation."
    },
    {
      name: "James Anderson",
      role: "Writing Expert",
      image: "👨‍🏫",
      bio: "Published author and IELTS writing specialist with proven teaching methodology."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">IELTS Smart Practice</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to helping you achieve your target IELTS band score through comprehensive practice and expert guidance.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At IELTS Smart Practice, we believe that everyone deserves access to quality IELTS preparation. 
                Our mission is to make expert-level IELTS training accessible, affordable, and effective for 
                candidates around the world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We combine cutting-edge technology with proven pedagogical methods to create an immersive 
                learning experience that helps you reach your full potential.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">4.9</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Assess</h3>
              <p className="text-blue-100">Take our diagnostic test to understand your current level and identify areas for improvement.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Practice</h3>
              <p className="text-blue-100">Work through comprehensive practice materials and receive instant feedback on your performance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Achieve</h3>
              <p className="text-blue-100">Track your progress and achieve your target band score with our proven preparation method.</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden text-center p-6">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your IELTS Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who achieved their target band scores with our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tests" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
              Start Practice
            </Link>
            <Link to="/tips" className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold hover:bg-blue-50 transition">
              View Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
