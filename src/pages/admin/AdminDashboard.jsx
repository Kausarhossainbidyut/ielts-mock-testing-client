import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('📡 Fetching admin dashboard data...');
        const dashboardRes = await adminAPI.getDashboard().catch(() => ({ data: null }));
        
        console.log('✅ Dashboard response:', dashboardRes.data);
        
        if (dashboardRes?.data?.success) {
          const data = dashboardRes.data.data;
          const systemHealth = data.systemHealth || {};
          
          console.log('📊 System Health:', systemHealth);
          
          setStats([
            { label: 'Total Users', value: systemHealth.totalUsers || 0, change: '+12%', icon: '👥', color: 'bg-blue-500' },
            { label: 'Active Tests', value: systemHealth.activeTests || systemHealth.totalTests || 0, change: '+5%', icon: '📝', color: 'bg-green-500' },
            { label: 'Total Questions', value: systemHealth.totalQuestions || 0, change: '+8%', icon: '❓', color: 'bg-purple-500' },
            { label: 'Resources', value: systemHealth.totalResources || 0, change: '+15%', icon: '📚', color: 'bg-orange-500' },
          ]);
          
          // Handle recent activity - may be empty if no analytics data
          setRecentActivity(data.recentActivity || []);
          console.log('💡 Recent activity:', data.recentActivity?.length || 0, 'items');
        }
      } catch (err) {
        console.error('❌ Error fetching admin dashboard:', err.message);
        console.error('Full error:', err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-gray-700/50 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-14 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-300">Welcome back! Here's an overview of your platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-medium">↑ {stat.change}</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/admin/tests" className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
          <div className="text-3xl mb-2">➕</div>
          <div className="font-semibold text-gray-800">Add Test</div>
        </Link>
        <Link to="/admin/questions" className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
          <div className="text-3xl mb-2">❓</div>
          <div className="font-semibold text-gray-800">Add Question</div>
        </Link>
        <Link to="/admin/users" className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="font-semibold text-gray-800">Manage Users</div>
        </Link>
        <Link to="/admin/analytics" className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-semibold text-gray-800">View Analytics</div>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{activity.user?.name || 'User'}</div>
                      <div className="text-sm text-gray-500">{activity.action} • {activity.test || activity.details}</div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>No recent activity data available</p>
                <p className="text-sm mt-1">Activity will appear here as users interact with the platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Tests - Removed because data not available */}
      </div>
    </div>
  );
};

export default AdminDashboard;
