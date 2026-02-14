import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/dashboard/my-tests', label: 'My Tests', icon: '📝' },
        { path: '/dashboard/my-results', label: 'My Results', icon: '📊' },
        { path: '/dashboard/progress', label: 'Progress Chart', icon: '📈' },
        { path: '/dashboard/weak-areas', label: 'Weak Areas', icon: '🎯' },
        { path: '/dashboard/saved-resources', label: 'Saved Resources', icon: '💾' },
        { path: '/dashboard/history', label: 'Practice History', icon: '📜' },
    ];

    return (
        <nav className="space-y-2">
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        location.pathname === item.path
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                    to="/"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                    <span className="text-xl">🏠</span>
                    <span className="font-medium">Back to Home</span>
                </Link>
            </div>
        </nav>
    );
};

export default DashboardSidebar;