import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const RegistrationPage = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const targetBand = form.targetBand?.value || 7;
    const currentLevel = form.currentLevel?.value || 'beginner';
    const examDate = form.examDate?.value || null;
    
    // Basic password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const userData = {
        name,
        email,
        password,
        targetBand: parseInt(targetBand),
        currentLevel,
        examDate
      };
      
      await createUser(userData);
      
      form.reset();
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us today to start your IELTS journey</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Band Score</label>
                <select 
                  name="targetBand" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="5">5.0</option>
                  <option value="5.5">5.5</option>
                  <option value="6">6.0</option>
                  <option value="6.5">6.5</option>
                  <option value="7" defaultValue>7.0</option>
                  <option value="7.5">7.5</option>
                  <option value="8">8.0</option>
                  <option value="8.5">8.5</option>
                  <option value="9">9.0</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current English Level</label>
                <select 
                  name="currentLevel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="beginner">Beginner</option>
                  <option value="elementary">Elementary</option>
                  <option value="pre-intermediate">Pre-Intermediate</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="upper-intermediate">Upper Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Exam Date (Optional)</label>
                <input 
                  type="date" 
                  name="examDate" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
              </div>
              
              {error && (
                <div className="alert alert-error shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-800 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? 
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 ml-1 transition">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="divider my-6 text-gray-400">OR</div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Google sign-up coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;