import { useState, useEffect } from 'react';
import { tipsAPI } from '../../utils/api';
import Swal from 'sweetalert2';

const TipsManagement = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTip, setEditingTip] = useState(null);
  const [showTipModal, setShowTipModal] = useState(false); // For viewing full tip
  const [selectedTip, setSelectedTip] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'listening',
    difficulty: 'beginner',
    keywords: [],
    isActive: true
  });
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      setLoading(true);
      const res = await tipsAPI.getAllTips();
      if (res.data?.success) {
        setTips(res.data.data?.tips || []);
      }
    } catch (err) {
      console.error('Error fetching tips:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      Swal.fire('Error', 'Please fill in title and content', 'error');
      return;
    }
    
    try {
      if (editingTip) {
        await tipsAPI.updateTip(editingTip._id, formData);
        Swal.fire('Success', 'Tip updated successfully', 'success');
      } else {
        await tipsAPI.createTip(formData);
        Swal.fire('Success', 'Tip created successfully', 'success');
      }
      setShowModal(false);
      setEditingTip(null);
      setFormData({
        title: '',
        content: '',
        category: 'listening',
        difficulty: 'beginner',
        keywords: [],
        isActive: true
      });
      fetchTips();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to save tip', 'error');
    }
  };

  const handleEdit = (tip) => {
    setEditingTip(tip);
    setFormData({
      title: tip.title || '',
      content: tip.content || '',
      category: tip.category || 'listening',
      difficulty: tip.difficulty || 'beginner',
      keywords: tip.keywords || [],
      isActive: tip.isActive !== false
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
        await tipsAPI.deleteTip(id);
        Swal.fire('Deleted!', 'Tip has been deleted.', 'success');
        fetchTips();
      } catch {
        Swal.fire('Error', 'Failed to delete tip', 'error');
      }
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData({ ...formData, keywords: [...formData.keywords, keywordInput.trim()] });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData({ ...formData, keywords: formData.keywords.filter(k => k !== keyword) });
  };

  const handleReadMore = (tip) => {
    setSelectedTip(tip);
    setShowTipModal(true);
  };

  const isContentLong = (content) => content && content.length > 150;

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tip.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tip.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'listening', 'reading', 'writing', 'speaking', 'general'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tips Management</h1>
            <p className="text-amber-100">Manage IELTS tips and strategies</p>
          </div>
          <button 
            onClick={() => { setShowModal(true); setEditingTip(null); setFormData({
              title: '', content: '', category: 'listening', difficulty: 'beginner', keywords: [], isActive: true
            });}}
            className="px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-gray-100"
          >
            ➕ Add Tip
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Tips</div>
          <div className="text-2xl font-bold text-gray-800">{tips.length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Listening</div>
          <div className="text-2xl font-bold text-blue-600">{tips.filter(t => t.category === 'listening').length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Reading</div>
          <div className="text-2xl font-bold text-green-600">{tips.filter(t => t.category === 'reading').length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Writing</div>
          <div className="text-2xl font-bold text-purple-600">{tips.filter(t => t.category === 'writing').length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search tips..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" 
          />
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))
        ) : filteredTips.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No tips found
          </div>
        ) : (
          filteredTips.map((tip) => (
            <div key={tip._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tip.category === 'listening' ? 'bg-blue-100 text-blue-700' :
                    tip.category === 'reading' ? 'bg-green-100 text-green-700' :
                    tip.category === 'writing' ? 'bg-purple-100 text-purple-700' :
                    tip.category === 'speaking' ? 'bg-pink-100 text-pink-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {tip.category}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(tip)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(tip._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{tip.title}</h3>
                <div className="text-gray-600 text-sm flex-1">
                  {isContentLong(tip.content) ? (
                    <>
                      <span>{tip.content.substring(0, 150)}...</span>
                      <button 
                        onClick={() => handleReadMore(tip)}
                        className="text-amber-600 hover:text-amber-800 font-medium ml-1"
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    <span>{tip.content}</span>
                  )}
                </div>
                {tip.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {tip.keywords.slice(0, 3).map((keyword, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                    {tip.keywords.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        +{tip.keywords.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className={`px-2 py-1 rounded text-xs ${tip.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : tip.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {tip.difficulty}
                  </span>
                  <span className={`text-xs ${tip.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                    {tip.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingTip ? 'Edit Tip' : 'Add New Tip'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={5}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="listening">Listening</option>
                    <option value="reading">Reading</option>
                    <option value="writing">Writing</option>
                    <option value="speaking">Speaking</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Add keyword..."
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs flex items-center gap-1">
                      {keyword}
                      <button type="button" onClick={() => handleRemoveKeyword(keyword)} className="hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Active</span>
              </label>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {editingTip ? 'Update Tip' : 'Add Tip'}
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

      {/* View Tip Modal */}
      {showTipModal && selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedTip.category === 'listening' ? 'bg-blue-100 text-blue-700' :
                  selectedTip.category === 'reading' ? 'bg-green-100 text-green-700' :
                  selectedTip.category === 'writing' ? 'bg-purple-100 text-purple-700' :
                  selectedTip.category === 'speaking' ? 'bg-pink-100 text-pink-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedTip.category}
                </span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  selectedTip.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : 
                  selectedTip.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedTip.difficulty}
                </span>
              </div>
              <button 
                onClick={() => setShowTipModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTip.title}</h2>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedTip.content}</p>
            </div>
            
            {selectedTip.keywords?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTip.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  setShowTipModal(false);
                  handleEdit(selectedTip);
                }}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Tip
              </button>
              <button
                onClick={() => {
                  setShowTipModal(false);
                  handleDelete(selectedTip._id);
                }}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowTipModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsManagement;
