import { Link } from 'react-router-dom';

const MyTests = () => {
  const tests = [
    { id: 1, title: 'IELTS Academic Reading Practice', type: 'Reading', questions: 40, time: 60, status: 'Completed', score: 7.5, date: '2026-02-10' },
    { id: 2, title: 'IELTS General Training Test', type: 'Writing', questions: 2, time: 60, status: 'In Progress', score: null, date: '2026-02-12' },
    { id: 3, title: 'IELTS Listening Module', type: 'Listening', questions: 40, time: 30, status: 'Completed', score: 8.0, date: '2026-02-08' },
    { id: 4, title: 'IELTS Speaking Part 2', type: 'Speaking', questions: 3, time: 15, status: 'Not Started', score: null, date: '2026-02-14' },
    { id: 5, title: 'Full Mock Test - Band 9', type: 'Full Test', questions: 80, time: 175, status: 'Completed', score: 6.5, date: '2026-02-05' },
    { id: 6, title: 'Reading: True/False/Not Given', type: 'Reading', questions: 14, time: 20, status: 'Completed', score: 7.0, date: '2026-02-03' },
  ];

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
          <div className="text-2xl font-bold text-gray-800">24</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-green-500">
          <div className="text-gray-500 text-sm">Completed</div>
          <div className="text-2xl font-bold text-green-600">18</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-yellow-500">
          <div className="text-gray-500 text-sm">In Progress</div>
          <div className="text-2xl font-bold text-yellow-600">4</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-purple-500">
          <div className="text-gray-500 text-sm">Avg. Band</div>
          <div className="text-2xl font-bold text-purple-600">7.0</div>
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
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{test.title}</div>
                    <div className="text-sm text-gray-500">{test.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      test.type === 'Full Test' ? 'bg-purple-100 text-purple-700' :
                      test.type === 'Reading' ? 'bg-blue-100 text-blue-700' :
                      test.type === 'Listening' ? 'bg-green-100 text-green-700' :
                      test.type === 'Writing' ? 'bg-orange-100 text-orange-700' :
                      'bg-pink-100 text-pink-700'
                    }`}>
                      {test.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{test.questions}</td>
                  <td className="px-6 py-4 text-gray-600">{test.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      test.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      test.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {test.score ? (
                      <span className="font-bold text-blue-600">Band {test.score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/test/${test.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                      {test.status === 'Not Started' ? 'Start' : test.status === 'In Progress' ? 'Continue' : 'Review'}
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
