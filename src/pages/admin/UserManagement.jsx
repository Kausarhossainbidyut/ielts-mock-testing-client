const UserManagement = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', tests: 24, joined: '2026-01-15', status: 'Active' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Student', tests: 18, joined: '2026-01-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', tests: 12, joined: '2026-02-01', status: 'Active' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Teacher', tests: 0, joined: '2025-12-10', status: 'Active' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Student', tests: 5, joined: '2026-02-08', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-green-100">Manage platform users and roles</p>
          </div>
          <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100">
            ➕ Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Users</div>
          <div className="text-2xl font-bold text-gray-800">2,547</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Active</div>
          <div className="text-2xl font-bold text-green-600">2,100</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Teachers</div>
          <div className="text-2xl font-bold text-blue-600">45</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">New This Week</div>
          <div className="text-2xl font-bold text-purple-600">128</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tests Completed</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Joined</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.tests}</td>
                <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Edit</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
