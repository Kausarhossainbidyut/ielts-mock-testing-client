const MyResults = () => {
  const results = [
    { id: 1, testName: 'IELTS Academic Reading Practice', date: '2026-02-10', overall: 7.5, listening: 8.0, reading: 7.5, writing: 7.0, speaking: 7.5 },
    { id: 2, testName: 'IELTS Listening Module', date: '2026-02-08', overall: 8.0, listening: 8.5, reading: 8.0, writing: '-', speaking: '-' },
    { id: 3, testName: 'Full Mock Test - Band 9', date: '2026-02-05', overall: 6.5, listening: 6.5, reading: 6.5, writing: 6.5, speaking: 6.5 },
    { id: 4, testName: 'Reading: True/False/Not Given', date: '2026-02-03', overall: 7.0, listening: '-', reading: 7.0, writing: '-', speaking: '-' },
    { id: 5, testName: 'Writing Task 2 Essay', date: '2026-02-01', overall: 6.5, listening: '-', reading: '-', writing: 6.5, speaking: '-' },
  ];

  const getBandColor = (score) => {
    if (score === '-') return 'text-gray-400';
    if (score >= 8) return 'text-green-600 font-bold';
    if (score >= 7) return 'text-blue-600 font-bold';
    if (score >= 6) return 'text-yellow-600 font-bold';
    return 'text-red-500 font-bold';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Results</h1>
        <p className="text-green-100">View your IELTS test results and performance</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Overall Band</div>
          <div className="text-4xl font-bold text-blue-600">7.0</div>
          <div className="text-xs text-gray-400">Out of 9.0</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Listening</div>
          <div className="text-3xl font-bold text-green-600">7.8</div>
          <div className="text-xs text-gray-400">Avg: 7.8</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Reading</div>
          <div className="text-3xl font-bold text-blue-600">7.3</div>
          <div className="text-xs text-gray-400">Avg: 7.3</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Writing</div>
          <div className="text-3xl font-bold text-yellow-600">6.8</div>
          <div className="text-xs text-gray-400">Avg: 6.8</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Speaking</div>
          <div className="text-3xl font-bold text-purple-600">7.0</div>
          <div className="text-xs text-gray-400">Avg: 7.0</div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Test Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Test Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Listening</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Reading</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Writing</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Speaking</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{result.testName}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{result.date}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.listening)}`}>{result.listening}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.reading)}`}>{result.reading}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.writing)}`}>{result.writing}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.speaking)}`}>{result.speaking}</td>
                  <td className="px-6 py-4">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold">
                      {result.overall}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Band Score Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">IELTS Band Score Guide</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
            <div className="text-green-600 font-bold text-lg">8-9</div>
            <div className="text-green-700 text-sm">Expert</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
            <div className="text-blue-600 font-bold text-lg">7</div>
            <div className="text-blue-700 text-sm">Good</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
            <div className="text-yellow-600 font-bold text-lg">6</div>
            <div className="text-yellow-700 text-sm">Competent</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
            <div className="text-orange-600 font-bold text-lg">5</div>
            <div className="text-orange-700 text-sm">Modest</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
            <div className="text-red-600 font-bold text-lg">4</div>
            <div className="text-red-700 text-sm">Limited</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
