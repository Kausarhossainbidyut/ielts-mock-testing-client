import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    targetBand: 7.0,
    currentLevel: 'intermediate'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getUsers();
      if (res.data?.success) {
        setUsers(res.data.data?.users || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await adminAPI.updateUser(editingUser._id, formData);
        Swal.fire('Success', 'User updated successfully', 'success');
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'user', targetBand: 7.0, currentLevel: 'intermediate' });
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to save user', 'error');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
      targetBand: user.targetBand || 7.0,
      currentLevel: user.currentLevel || 'intermediate'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        await adminAPI.deleteUser(id);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        fetchUsers();
      } catch {
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    }
  };
  
  const handleRoleChange = async (id, newRole) => {
    try {
      await adminAPI.updateUser(id, { role: newRole });
      Swal.fire('Success', `User role changed to ${newRole}`, 'success');
      fetchUsers();
    } catch {
      Swal.fire('Error', 'Failed to update role', 'error');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.verified).length,
    admins: users.filter(u => u.role === 'admin' || u.role === 'content_admin').length,
    newThisWeek: users.filter(u => {
      const created = new Date(u.createdAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return created > weekAgo;
    }).length
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-green-100">Manage platform users and roles</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Users</div>
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Verified</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Admins</div>
          <div className="text-2xl font-bold text-blue-600">{stats.admins}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">New This Week</div>
          <div className="text-2xl font-bold text-purple-600">{stats.newThisWeek}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
          />
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="content_admin">Content Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Target Band</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Level</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Joined</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="7" className="px-6 py-8 text-center">Loading...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No users found</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' : 
                        user.role === 'content_admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="content_admin">Content Admin</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.targetBand || '-'}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{user.currentLevel || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="user">User</option>
                  <option value="content_admin">Content Admin</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Band</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.targetBand}
                    onChange={(e) => setFormData({ ...formData, targetBand: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="1"
                    max="9"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={formData.currentLevel}
                    onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
