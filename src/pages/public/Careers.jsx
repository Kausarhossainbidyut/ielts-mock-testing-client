import { useState } from 'react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [activeTab, setActiveTab] = useState('openings');

  const jobs = [
    {
      id: 1,
      title: "Senior IELTS Instructor",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for an experienced IELTS instructor to create high-quality content and teach our students.",
      requirements: [
        "Minimum 5 years of IELTS teaching experience",
        "Band 8+ in all modules",
        "Excellent communication skills",
        "Experience with online teaching platforms"
      ]
    },
    {
      id: 2,
      title: "Content Developer",
      location: "Remote",
      type: "Full-time",
      description: "Join our content team to develop engaging IELTS practice materials and course content.",
      requirements: [
        "Strong English writing skills",
        "Understanding of IELTS test format",
        "Experience in educational content creation",
        "Attention to detail"
      ]
    },
    {
      id: 3,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      description: "Help us build the best IELTS practice platform with your frontend development skills.",
      requirements: [
        "Proficiency in React.js",
        "Experience with modern CSS frameworks",
        "Understanding of responsive design",
        "Portfolio of completed projects"
      ]
    },
    {
      id: 4,
      title: "Customer Success Manager",
      location: "Remote",
      type: "Part-time",
      description: "Support our students and help them achieve their IELTS goals.",
      requirements: [
        "Excellent interpersonal skills",
        "Experience in customer service",
        "Strong problem-solving abilities",
        "Available for flexible hours"
      ]
    }
  ];

  const benefits = [
    { icon: "🏠", title: "Remote Work", description: "Work from anywhere in the world" },
    { icon: "💰", title: "Competitive Salary", description: "Industry-leading compensation" },
    { icon: "🏥", title: "Health Insurance", description: "Comprehensive health coverage" },
    { icon: "📚", title: "Learning Budget", description: "Professional development funds" },
    { icon: "🏖️", title: "Flexible Time Off", description: "Unlimited vacation policy" },
    { icon: "🎉", title: "Team Events", description: "Regular virtual and in-person events" }
  ];

  const values = [
    {
      title: "Student First",
      description: "Everything we do is focused on helping our students succeed in their IELTS journey."
    },
    {
      title: "Continuous Learning",
      description: "We believe in constantly improving our skills and staying updated with the latest in EdTech."
    },
    {
      title: "Transparency",
      description: "We maintain open and honest communication with our team and customers."
    },
    {
      title: "Innovation",
      description: "We're always looking for new and better ways to help people learn."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us revolutionize IELTS preparation and make quality education accessible to everyone
          </p>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
            We're a team of passionate educators, developers, and innovators working together to help students achieve their IELTS goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-indigo-100">Team Members</div>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">150+</div>
              <div className="text-indigo-100">Countries</div>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-indigo-100">Support</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-1 flex">
            <button
              onClick={() => setActiveTab('openings')}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'openings' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Open Positions
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'benefits' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Benefits
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'values' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Our Values
            </button>
          </div>
        </div>

        {/* Open Positions */}
        {activeTab === 'openings' && (
          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{job.location}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{job.type}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="text-gray-600 flex items-center gap-2">
                        <span className="text-indigo-500">✓</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits */}
        {activeTab === 'benefits' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Values */}
        {activeTab === 'values' && (
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mt-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Don't see the right role?</h3>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll reach out when we have a suitable position.
          </p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;
