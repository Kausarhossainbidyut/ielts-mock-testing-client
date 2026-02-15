import { useState, useEffect } from 'react';
import { userAPI, resultsAPI } from '../../utils/api';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [analyticsRes, resultsRes] = await Promise.all([
          userAPI.getAnalytics().catch(() => ({ data: null })),
          resultsAPI.getMyResults().catch(() => ({ data: null }))
        ]);
        
        if (analyticsRes.data?.success) {
          setProgressData(analyticsRes.data.data?.skills || []);
        }
        
        if (resultsRes.data?.success) {
          const results = resultsRes.data.data?.results || resultsRes.data.data || [];
          // Transform results into weekly progress
          const last7Days = results.slice(0, 7).map((r, i) => ({
            day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
            score: r.overall || r.bandScore || 0
          }));
          setWeeklyProgress(last7Days.length ? last7Days : [
            { day: 'Mon', score: 6.5 },
            { day: 'Tue', score: 7.0 },
            { day: 'Wed', score: 6.8 },
            { day: 'Thu', score: 7.2 },
            { day: 'Fri', score: 7.5 },
            { day: 'Sat', score: 7.0 },
            { day: 'Sun', score: 7.8 },
          ]);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback data
  const fallbackSkills = [
    { skill: 'Listening', current: 78, previous: 72, trend: 'up' },
    { skill: 'Reading', current: 73, previous: 68, trend: 'up' },
    { skill: 'Writing', current: 68, previous: 65, trend: 'up' },
    { skill: 'Speaking', current: 70, previous: 70, trend: 'stable' },
  ];

  const fallbackWeekly = [
    { day: 'Mon', score: 6.5 },
    { day: 'Tue', score: 7.0 },
    { day: 'Wed', score: 6.8 },
    { day: 'Thu', score: 7.2 },
    { day: 'Fri', score: 7.5 },
    { day: 'Sat', score: 7.0 },
    { day: 'Sun', score: 7.8 },
  ];

  const skillsData = progressData.length ? progressData : fallbackSkills;
  const weeklyData = weeklyProgress.length ? weeklyProgress : fallbackWeekly;
  const maxScore = 9;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-purple-500/50 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-purple-500/50 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Progress Chart</h1>
        <p className="text-purple-100">Track your IELTS preparation progress over time</p>
      </div>

      {/* Skill Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsData.map((skill, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{skill.skill}</h3>
              <span className={`text-2xl ${skill.trend === 'up' ? 'text-green-500' : skill.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                {skill.trend === 'up' ? '↑' : skill.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Current: {skill.current}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    Previous: {skill.previous}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: `${skill.current}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-gray-800">Band {Math.round(skill.current / 10 * 9) / 9 + 4}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Performance</h2>
        <div className="flex items-end justify-between h-64 gap-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-indigo-600"
                  style={{ height: `${(day.score / maxScore) * 100}%` }}
                ></div>
                <span className="absolute -top-8 text-sm font-medium text-gray-600">{day.score}</span>
              </div>
              <span className="mt-3 text-sm font-medium text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border border-yellow-200">
            <div className="text-4xl mb-2">🏆</div>
            <div className="font-semibold text-gray-800">First Test</div>
            <div className="text-sm text-gray-500">Completed first test</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 text-center border border-green-200">
            <div className="text-4xl mb-2">🔥</div>
            <div className="font-semibold text-gray-800">7 Day Streak</div>
            <div className="text-sm text-gray-500">7 days practice</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-200">
            <div className="text-4xl mb-2">⭐</div>
            <div className="font-semibold text-gray-800">Band 7+</div>
            <div className="text-sm text-gray-500">Achieved Band 7</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-200">
            <div className="text-4xl mb-2">📚</div>
            <div className="font-semibold text-gray-800">Bookworm</div>
            <div className="text-sm text-gray-500">20 tests completed</div>
          </div>
        </div>
      </div>

      {/* Target Goal */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Target: Band 8.0</h3>
            <p className="text-blue-100">You're 1.0 band away from your target!</p>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <div className="text-5xl font-bold">87%</div>
            <div className="text-blue-100">Progress to Goal</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
