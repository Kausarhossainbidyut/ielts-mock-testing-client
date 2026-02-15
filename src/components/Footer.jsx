import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Top Gradient Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        {/* Professional Logo with Glow Effect */}
                        <div className="flex items-center space-x-3 mb-6 group">
                            {/* Logo Icon */}
                            <div className="relative w-14 h-14 flex-shrink-0">
                                {/* Outer glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                {/* Main icon */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-white font-bold text-xs leading-none">IELTS</span>
                                    </div>
                                </div>
                                {/* Shine effect */}
                                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white opacity-20 rounded-tl-xl rounded-tr-sm"></div>
                            </div>
                            {/* Logo Text */}
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold text-white leading-tight tracking-tight">
                                    IELTS Smart
                                </span>
                                <span className="text-xs font-bold text-blue-400 tracking-[0.25em] uppercase">
                                    Practice
                                </span>
                            </div>
                        </div>
                        
                        <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                            Your comprehensive platform for IELTS preparation with realistic mock tests, 
                            detailed analytics, and expert strategies. Achieve your target band score with our proven learning system.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-400">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span>support@ieltssmartpractice.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span>Online - Available 24/7</span>
                            </div>
                        </div>
                        
                        {/* Social Media Icons */}
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-600 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    {/* Practice Modules */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
                            Practice Modules
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/listening" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Listening Tests
                                </Link>
                            </li>
                            <li>
                                <Link to="/reading" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Reading Tests
                                </Link>
                            </li>
                            <li>
                                <Link to="/writing" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Writing Practice
                                </Link>
                            </li>
                            <li>
                                <Link to="/speaking" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Speaking Practice
                                </Link>
                            </li>
                            <li>
                                <Link to="/tests" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Mock Tests
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <span className="w-1 h-6 bg-indigo-500 mr-3 rounded-full"></span>
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/tips" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Tips & Strategies
                                </Link>
                            </li>
                            <li>
                                <Link to="/resources" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Study Materials
                                </Link>
                            </li>
                            <li>
                                <Link to="/band-score-guide" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Band Score Guide
                                </Link>
                            </li>
                            <li>
                                <Link to="/sample-answers" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Sample Answers
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            © 2026 <span className="text-blue-400 font-semibold">IELTS Smart Practice</span>. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</Link>
                            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</Link>
                            <span className="text-gray-500 text-sm">Cookies</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;