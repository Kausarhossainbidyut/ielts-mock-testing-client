import { useState, useEffect } from 'react';
import { resourcesAPI } from '../../utils/api';
import Swal from 'sweetalert2';

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'book',
    category: 'general',
    skill: 'general',
    level: 'all',
    fileUrl: '',
    tags: [],
    isPremium: false,
    isActive: true
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await resourcesAPI.getAllResources();
      if (res.data?.success) {
        setResources(res.data.data?.resources || []);
      }
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      Swal.fire('Error', 'Please enter a title', 'error');
      return;
    }
    
    try {
      if (editingResource) {
        await resourcesAPI.updateResource(editingResource._id, formData);
        Swal.fire('Success', 'Resource updated successfully', 'success');
      } else {
        await resourcesAPI.createResource(formData);
        Swal.fire('Success', 'Resource created successfully', 'success');
      }
      setShowModal(false);
      setEditingResource(null);
      setFormData({
        title: '',
        description: '',
        type: 'book',
        category: 'general',
        skill: 'general',
        level: 'all',
        fileUrl: '',
        tags: [],
        isPremium: false,
        isActive: true
      });
      fetchResources();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to save resource', 'error');
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title || '',
      description: resource.description || '',
      type: resource.type || 'book',
      category: resource.category || 'general',
      skill: resource.skill || 'general',
      level: resource.level || 'all',
      fileUrl: resource.fileUrl || '',
      tags: resource.tags || [],
      isPremium: resource.isPremium || false,
      isActive: resource.isActive !== false
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
        await resourcesAPI.deleteResource(id);
        Swal.fire('Deleted!', 'Resource has been deleted.', 'success');
        fetchResources();
      } catch {
        Swal.fire('Error', 'Failed to delete resource', 'error');
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  const resourceTypes = ['all', 'book', 'audio', 'video', 'document', 'website', 'course'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resource Management</h1>
            <p className="text-teal-100">Manage learning resources and materials</p>
          </div>
          <button 
            onClick={() => { setShowModal(true); setEditingResource(null); setFormData({
              title: '', description: '', type: 'book', category: 'general', skill: 'general', 
              level: 'all', fileUrl: '', tags: [], isPremium: false, isActive: true
            });}}
            className="px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-gray-100"
          >
            ➕ Add Resource
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Resources</div>
          <div className="text-2xl font-bold text-gray-800">{resources.length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Books</div>
          <div className="text-2xl font-bold text-blue-600">{resources.filter(r => r.type === 'book').length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Audio</div>
          <div className="text-2xl font-bold text-purple-600">{resources.filter(r => r.type === 'audio').length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Premium</div>
          <div className="text-2xl font-bold text-yellow-600">{resources.filter(r => r.isPremium).length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" 
          />
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {resourceTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Resource</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Skill</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : filteredResources.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No resources found</td></tr>
              ) : (
                filteredResources.map((resource) => (
                  <tr key={resource._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{resource.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{resource.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium capitalize">
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{resource.category}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs capitalize">
                        {resource.skill}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{resource.level}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {resource.isPremium && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Premium</span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${resource.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {resource.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(resource)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(resource._id)}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingResource ? 'Edit Resource' : 'Add New Resource'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="book">Book</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="website">Website</option>
                    <option value="course">Course</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="general">General</option>
                    <option value="cambridge">Cambridge</option>
                    <option value="practice">Practice</option>
                    <option value="grammar">Grammar</option>
                    <option value="vocabulary">Vocabulary</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                  <select
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="general">General</option>
                    <option value="listening">Listening</option>
                    <option value="reading">Reading</option>
                    <option value="writing">Writing</option>
                    <option value="speaking">Speaking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
                <input
                  type="url"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Add tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPremium}
                    onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Premium</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  {editingResource ? 'Update Resource' : 'Add Resource'}
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

export default ResourceManagement;
