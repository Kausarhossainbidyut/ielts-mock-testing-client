import { useState, useEffect } from 'react';
import { resourcesAPI } from '../../utils/api';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        console.log('📡 Fetching resources from API...');
        const res = await resourcesAPI.getAllResources();
        console.log('✅ API Response:', res.data);
        if (res.data?.success) {
          const resourcesData = res.data.data?.resources || res.data.data || [];
          console.log('📊 Resources received from database:', resourcesData.length, 'resources');
          console.log('Sample resource:', resourcesData[0]);
          setResources(resourcesData);
        } else {
          console.warn('⚠️ API returned success: false');
          setResources([]);
        }
      } catch (err) {
        console.error('❌ Error fetching resources:', err.message);
        console.error('Full error:', err.response?.data || err);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(r => r.category?.toLowerCase() === filter.toLowerCase());

  const categories = ['all', 'E-Book', 'Audio', 'Document', 'Video'];

  const getIcon = (type) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'MP3': 
      case 'Audio': return '🎧';
      case 'Video': return '🎬';
      default: return '📁';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download study materials, practice files, and helpful documents
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Resources' : cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{getIcon(resource.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {resource.type}
                        </span>
                        <span className="text-xs text-gray-500">{resource.size}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">👥 {resource.downloads || 0} downloads</span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
