import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-white shadow-sm border-b border-gray-200">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
        </svg>
      </div>
      <ul
        tabIndex="0"
        className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-gray-200">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tests">All Tests</Link></li>
        <li><Link to="/tips">Tips & Strategies</Link></li>
        <li><Link to="/resources">Resources</Link></li>
      </ul>
    </div>
    <Link to="/" className="btn btn-ghost text-xl font-bold text-blue-600">
      IELTS Smart Practice
    </Link>
  </div>
  
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/tests">All Tests</Link></li>
      <li>
        <details>
          <summary>Practice</summary>
          <ul className="p-2 bg-white w-48 shadow-lg rounded-box border border-gray-200">
            <li><Link to="/listening">Listening</Link></li>
            <li><Link to="/reading">Reading</Link></li>
            <li><Link to="/writing">Writing</Link></li>
            <li><Link to="/speaking">Speaking</Link></li>
          </ul>
        </details>
      </li>
      <li><Link to="/tips">Tips & Strategies</Link></li>
      <li><Link to="/resources">Resources</Link></li>
    </ul>
  </div>
  
  <div className="navbar-end">
    <Link to="/login" className="btn btn-ghost mr-2">Login</Link>
    <Link to="/registration" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none">
      Get Started
    </Link>
  </div>
</div>
    );
};

export default Navbar;