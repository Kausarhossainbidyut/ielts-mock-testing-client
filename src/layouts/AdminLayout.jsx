import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const AdminLayout = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonColor: '#3085d6'
        });
      }
    });
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/tests', label: 'Test Management', icon: '📝' },
    { path: '/admin/questions', label: 'Question Management', icon: '❓' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/audio', label: 'Audio Upload', icon: '🎵' },
    { path: '/admin/resources', label: 'Resource Upload', icon: '📁' },
    { path: '/admin/analytics', label: 'Result Analytics', icon: '📈' },
    { path: '/admin/reports', label: 'Performance Reports', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">IELTS</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">Admin Panel</span>
            </Link>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-xl min-h-screen hidden md:block">
          <div className="p-6">
            <div className="text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <span className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></span>
              <span>Admin Menu</span>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-600"
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
