import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Thank you for contacting us. We will get back to you within 24 hours.',
      confirmButtonColor: '#10b981'
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: "Email Us",
      details: "support@ieltssmartpractice.com",
      description: "We reply within 24 hours",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: "Visit Us",
      details: "123 Learning Street",
      description: "Education City, ED 12345",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: "Working Hours",
      details: "24/7 Online Support",
      description: "We're always here to help",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const subjects = [
    { value: "", label: "Select a subject" },
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing Question" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "other", label: "Other" }
  ];

  const quickHelp = [
    { title: "FAQs", description: "Find answers to common questions", icon: "❓", link: "/faq" },
    { title: "Tips", description: "Get expert IELTS strategies", icon: "💡", link: "/tips" },
    { title: "Resources", description: "Browse study materials", icon: "📚", link: "/resources" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 py-12 px-4">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="fixed top-40 right-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-8 left-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about IELTS? Our team is here to help you succeed in your IELTS journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="peer w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1 rounded bg-transparent">
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="peer w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1 rounded bg-transparent">
                    Email Address
                  </label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="peer w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1 rounded bg-transparent">
                    Phone Number (Optional)
                  </label>
                </div>
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none appearance-none"
                    required
                  >
                    {subjects.map(sub => (
                      <option key={sub.value} value={sub.value}>{sub.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="peer w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none resize-none"
                  placeholder=" "
                  required
                />
                <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1 rounded bg-transparent">
                  Your Message
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{info.title}</h3>
                    <p className="text-emerald-600 font-semibold">{info.details}</p>
                    <p className="text-gray-500 text-sm">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Help */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Need Quick Help?</h3>
              <div className="space-y-3">
                {quickHelp.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.link}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition group"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold group-hover:text-green-400 transition">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <svg className="w-5 h-5 ml-auto text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Visit Our Office</h2>
              </div>
              <p className="text-gray-600 mb-6">
                While our team works remotely around the globe, our headquarters is located in the heart of Education City. Feel free to visit during business hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">123 Learning Street, Suite 100</p>
                    <p className="text-sm">Education City, ED 12345, USA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-3">Follow us on social media</p>
                <div className="flex gap-3">
                  {[
                    { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                    { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                    { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z' }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all transform hover:scale-110"
                      title={social.name}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon}/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Map Visual */}
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-200 min-h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
              <div className="relative text-center">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center mb-4 mx-auto animate-bounce">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold">Interactive Map</p>
                <p className="text-gray-500 text-sm">Click to view on Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
