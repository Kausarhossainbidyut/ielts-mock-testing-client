const PracticeHistory = () => {
  const history = [
    { id: 1, date: '2026-02-14', time: '10:30 AM', type: 'Reading', test: 'Academic Reading Practice', duration: '45 min', score: 7.5, status: 'Completed' },
    { id: 2, date: '2026-02-13', time: '2:15 PM', type: 'Listening', test: 'Listening Section 1-4', duration: '30 min', score: 8.0, status: 'Completed' },
    { id: 3, date: '2026-02-12', time: '11:00 AM', type: 'Writing', test: 'Task 2 Essay', duration: '40 min', score: 6.5, status: 'Completed' },
    { id: 4, date: '2026-02-12', time: '3:30 PM', type: 'Speaking', test: 'Part 2 Cue Card', duration: '15 min', score: 7.0, status: 'Completed' },
    { id: 5, date: '2026-02-11', time: '9:00 AM', type: 'Full Test', test: 'Mock Test Band 7', duration: '120 min', score: 6.5, status: 'Completed' },
    { id: 6, date: '2026-02-10', time: '4:00 PM', type: 'Reading', test: 'TFNG Questions', duration: '20 min', score: 7.0, status: 'Completed' },
    { id: 7, date: '2026-02-09', time: '1:00 PM', type: 'Listening', test: 'Multiple Choice', duration: '15 min', score: 7.5, status: 'Completed' },
    { id: 8, date: '2026-02-08', time: '10:00 AM', type: 'Writing', test: 'Task 1 Letter', duration: '20 min', score: 6.0, status: 'Completed' },
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'Reading': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Listening': return 'bg-green-100 text-green-700 border-green-200';
      case 'Writing': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Speaking': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Full Test': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Practice History</h1>
        <p className="text-indigo-100">Review your complete practice session history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Sessions</div>
          <div className="text-2xl font-bold text-gray-800">48</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">This Week</div>
          <div className="text-2xl font-bold text-blue-600">8</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Hours</div>
          <div className="text-2xl font-bold text-purple-600">24h</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Avg. Score</div>
          <div className="text-2xl font-bold text-green-600">7.0</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Recent Practice Sessions</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {history.map((item) => (
            <div key={item.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Date & Time */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-medium">FEB</span>
                    <span className="text-lg font-bold">{item.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{item.test}</div>
                    <div className="text-sm text-gray-500">{item.time} • {item.duration}</div>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>

                {/* Score & Status */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                      {item.score}
                    </div>
                    <div className="text-xs text-gray-500">Band</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {item.status}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all">
          Load More History
        </button>
      </div>
    </div>
  );
};

export default PracticeHistory;
