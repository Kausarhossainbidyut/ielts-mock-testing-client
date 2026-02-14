const TestManagement = () => {
  const tests = [
    { id: 1, title: 'IELTS Academic Reading Practice', category: 'Reading', questions: 40, duration: 60, status: 'Active', createdBy: 'Admin', date: '2026-02-10' },
    { id: 2, title: 'IELTS Listening Module', category: 'Listening', questions: 40, duration: 30, status: 'Active', createdBy: 'Admin', date: '2026-02-08' },
    { id: 3, title: 'Writing Task 1 - Letters', category: 'Writing', questions: 1, duration: 20, status: 'Active', createdBy: 'Teacher', date: '2026-02-05' },
    { id: 4, title: 'Speaking Part 2 Topics', category: 'Speaking', questions: 10, duration: 15, status: 'Draft', createdBy: 'Admin', date: '2026-02-03' },
    { id: 5, title: 'Full Mock Test - Band 7', category: 'Full Test', questions: 80, duration: 175, status: 'Active', createdBy: 'Admin', date: '2026-02-01' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Test Management</h1>
            <p className="text-blue-100">Create, edit, and manage IELTS tests</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            ➕ Create New Test
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-4">
          <input type="text" placeholder="Search tests..." className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Categories</option>
            <option>Reading</option>
            <option>Listening</option>
            <option>Writing</option>
            <option>Speaking</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Test Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Questions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{test.title}</div>
                    <div className="text-sm text-gray-500">By {test.createdBy}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {test.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{test.questions}</td>
                  <td className="px-6 py-4 text-gray-600">{test.duration} min</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      test.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      test.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{test.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">Edit</button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">Delete</button>
                    </div>
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

export default TestManagement;
