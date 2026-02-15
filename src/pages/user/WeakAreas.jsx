import { useState, useEffect } from 'react';
import { userAPI } from '../../utils/api';

const WeakAreas = () => {
  const [weakAreas, setWeakAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const analyticsRes = await userAPI.getAnalytics().catch(() => ({ data: null }));
        
        if (analyticsRes.data?.success) {
          setWeakAreas(analyticsRes.data.data?.weakAreas || []);
        }
      } catch (err) {
        console.error('Error fetching weak areas:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback data
  const fallbackData = [
    { 
      _id: '1', 
      skill: 'Writing Task 2', 
      issue: 'Essay Structure', 
      accuracy: 45, 
      attempts: 12, 
      correct: 5,
      tips: 'Focus on clear thesis statement and better paragraph organization.',
      resources: 3
    },
    { 
      _id: '2', 
      skill: 'Reading', 
      issue: 'True/False/Not Given', 
      accuracy: 58, 
      attempts: 24, 
      correct: 14,
      tips: 'Practice distinguishing between false and not given statements.',
      resources: 5
    },
    { 
      _id: '3', 
      skill: 'Speaking', 
      issue: 'Part 2 - Cue Card', 
      accuracy: 62, 
      attempts: 8, 
      correct: 5,
      tips: 'Practice organizing your talk with proper introduction, body, and conclusion.',
      resources: 4
    },
    { 
      _id: '4', 
      skill: 'Listening', 
      issue: 'Multiple Choice', 
      accuracy: 70, 
      attempts: 15, 
      correct: 10,
      tips: 'Read questions more carefully before listening.',
      resources: 2
    },
  ];

  const areasData = weakAreas.length ? weakAreas : fallbackData;

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return 'bg-green-500';
    if (accuracy >= 60) return 'bg-yellow-500';
    if (accuracy >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-red-500/50 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-red-500/50 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
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
      <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Weak Areas Analysis</h1>
        <p className="text-red-100">Identify and improve your weaker skills</p>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-red-500">
          <div className="text-gray-500 text-sm">Areas to Improve</div>
          <div className="text-2xl font-bold text-red-600">4</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-yellow-500">
          <div className="text-gray-500 text-sm">Need More Practice</div>
          <div className="text-2xl font-bold text-yellow-600">2</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-green-500">
          <div className="text-gray-500 text-sm">Strong Areas</div>
          <div className="text-2xl font-bold text-green-600">2</div>
        </div>
      </div>

      {/* Weak Areas Cards */}
      <div className="space-y-4">
        {areasData.map((area) => (
          <div key={area._id || area.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {area.skill}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-700 font-medium">{area.issue}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Accuracy: {area.accuracy}%</span>
                    <span className="text-gray-500">{area.correct}/{area.attempts} correct</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getAccuracyColor(area.accuracy)} rounded-full transition-all duration-500`}
                      style={{ width: `${area.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-800 mb-1">💡 Tip:</div>
                  <p className="text-sm text-blue-700">{area.tips}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all">
                  Practice Now
                </button>
                <span className="text-center text-sm text-gray-500">{area.resources} resources available</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Practice */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold">Essay Writing</div>
            <p className="text-sm text-blue-100 mt-1">Practice 2 essays daily</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">📖</div>
            <div className="font-semibold">Reading Skills</div>
            <p className="text-sm text-blue-100 mt-1">Focus on TFNG questions</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">🎤</div>
            <div className="font-semibold">Speaking</div>
            <p className="text-sm text-blue-100 mt-1">Record and review answers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeakAreas;
