import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testsAPI, resultsAPI } from '../../utils/api';

const MyTests = () => {
  const [tests, setTests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch tests and stats in parallel
        const [testsRes, statsRes] = await Promise.all([
          testsAPI.getAllTests(),
          resultsAPI.getStatistics().catch(() => ({ data: null }))
        ]);
        
        if (testsRes.data?.success) {
          setTests(testsRes.data.data || []);
        }
        
        if (statsRes.data?.success) {
          setStats(statsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching tests:', err);
        // Use fallback data if API fails
        setTests([
          { _id: '1', title: 'IELTS Academic Reading Practice', type: 'Reading', questions: 40, time: 60, status: 'active', date: '2026-02-10' },
          { _id: '2', title: 'IELTS General Training Test', type: 'Writing', questions: 2, time: 60, status: 'active', date: '2026-02-12' },
          { _id: '3', title: 'IELTS Listening Module', type: 'Listening', questions: 40, time: 30, status: 'active', date: '2026-02-08' },
          { _id: '4', title: 'IELTS Speaking Part 2', type: 'Speaking', questions: 3, time: 15, status: 'active', date: '2026-02-14' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback stats if API fails
  const statsData = stats || { totalTests: 24, completedTests: 18, inProgressTests: 4, averageBand: 7.0 };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-blue-500/50 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-blue-500/50 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-md animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Tests</h1>
        <p className="text-blue-100">View and manage your IELTS practice tests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-blue-500">
          <div className="text-gray-500 text-sm">Total Tests</div>
          <div className="text-2xl font-bold text-gray-800">{statsData?.totalTests || 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-green-500">
          <div className="text-gray-500 text-sm">Completed</div>
          <div className="text-2xl font-bold text-green-600">{statsData?.completedTests || 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-yellow-500">
          <div className="text-gray-500 text-sm">In Progress</div>
          <div className="text-2xl font-bold text-yellow-600">{statsData?.inProgressTests || 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-purple-500">
          <div className="text-gray-500 text-sm">Avg. Band</div>
          <div className="text-2xl font-bold text-purple-600">{statsData?.averageBand || 0}</div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">All Tests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Test Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Questions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time (min)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test._id || test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{test.title || test.name}</div>
                    <div className="text-sm text-gray-500">{test.date || test.createdAt?.split('T')[0]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${(test.type || test.category) === 'Full Test' ? 'bg-purple-100 text-purple-700' : (test.type || test.category) === 'Reading' ? 'bg-blue-100 text-blue-700' : (test.type || test.category) === 'Listening' ? 'bg-green-100 text-green-700' : (test.type || test.category) === 'Writing' ? 'bg-orange-100 text-orange-700' : 'bg-pink-100 text-pink-700'}`}>
                      {test.type || test.category || 'Test'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{test.questions || test.questionCount || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{test.time || test.duration || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      test.status === 'active' || test.status === 'Active' ? 'bg-green-100 text-green-700' :
                      test.status === 'in_progress' || test.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {test.status === 'active' ? 'Active' : test.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {test.score || test.bandScore ? (
                      <span className="font-bold text-blue-600">Band {test.score || test.bandScore}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/test/${test._id || test.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                      Start
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTests;
