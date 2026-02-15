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
        const [dashboardRes] = await Promise.all([
          adminAPI.getDashboard().catch(() => ({ data: null })),
        ]);
        
        if (dashboardRes.data?.success) {
          setStats(dashboardRes.data.data?.stats || []);
          setRecentActivity(dashboardRes.data.data?.recentActivity || []);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback data
  const fallbackStats = [
    { label: 'Total Users', value: '2,547', change: '+12%', icon: '👥', color: 'bg-blue-500' },
    { label: 'Active Tests', value: '156', change: '+5%', icon: '📝', color: 'bg-green-500' },
    { label: 'Total Questions', value: '4,832', change: '+8%', icon: '❓', color: 'bg-purple-500' },
    { label: 'Test Submissions', value: '12,450', change: '+15%', icon: '📊', color: 'bg-orange-500' },
  ];

  const fallbackActivity = [
    { user: 'John Doe', action: 'Completed Test', test: 'IELTS Reading Practice', time: '2 mins ago' },
    { user: 'Sarah Smith', action: 'Registered', test: 'New Account', time: '15 mins ago' },
    { user: 'Mike Johnson', action: 'Submitted Writing', test: 'Task 2 Essay', time: '30 mins ago' },
    { user: 'Emily Brown', action: 'Completed Test', test: 'Listening Module', time: '1 hour ago' },
  ];

  const statsData = stats.length ? stats : fallbackStats;
  const activityData = recentActivity.length ? recentActivity : fallbackActivity;

  // Fallback top tests
  const topTests = [
    { name: 'IELTS Academic Reading', attempts: 1250, avgScore: 6.8 },
    { name: 'IELTS Listening Practice', attempts: 1100, avgScore: 7.2 },
    { name: 'Writing Task 2', attempts: 980, avgScore: 6.5 },
    { name: 'Speaking Part 1', attempts: 850, avgScore: 7.0 },
  ];

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
        {statsData.map((stat, index) => (
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
            {activityData.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{activity.user}</div>
                    <div className="text-sm text-gray-500">{activity.action} • {activity.test}</div>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tests */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Most Popular Tests</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topTests.map((test, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{test.name}</div>
                    <div className="text-sm text-gray-500">{test.attempts.toLocaleString()} attempts</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Avg: {test.avgScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
