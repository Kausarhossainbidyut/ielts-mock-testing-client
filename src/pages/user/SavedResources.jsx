import { useState, useEffect } from 'react';
import { userDashboardAPI } from '../../utils/api';

const SavedResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const savedRes = await userDashboardAPI.getSavedResources().catch(() => ({ data: null }));
        
        if (savedRes.data?.success) {
          setResources(savedRes.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching saved resources:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback data
  const fallbackData = [
    { _id: '1', title: 'IELTS Writing Task 2 - Sample Essays', type: 'PDF', category: 'Writing', savedDate: '2026-02-10', size: '2.5 MB', downloads: 156 },
    { _id: '2', title: 'Speaking Cue Cards - Part 2 Topics', type: 'PDF', category: 'Speaking', savedDate: '2026-02-08', size: '1.8 MB', downloads: 89 },
    { _id: '3', title: 'Listening Practice Audio - Section 1-4', type: 'Audio', category: 'Listening', savedDate: '2026-02-05', size: '45 MB', downloads: 234 },
  ];

  const resourcesData = resources.length ? resources : fallbackData;

  const getTypeColor = (type) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'Audio': return 'bg-blue-100 text-blue-700';
      case 'Video': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Writing': return '✍️';
      case 'Speaking': return '🎤';
      case 'Listening': return '🎧';
      case 'Reading': return '📖';
      case 'Vocabulary': return '📝';
      case 'Grammar': return '📚';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-cyan-500/50 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-cyan-500/50 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-lg animate-pulse flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Saved Resources</h1>
        <p className="text-cyan-100">Access your saved study materials and resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Total Saved</div>
          <div className="text-2xl font-bold text-gray-800">{resourcesData.length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">PDFs</div>
          <div className="text-2xl font-bold text-red-600">{resourcesData.filter(r => r.type === 'PDF').length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Audio</div>
          <div className="text-2xl font-bold text-blue-600">{resourcesData.filter(r => r.type === 'Audio').length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-gray-500 text-sm">Video</div>
          <div className="text-2xl font-bold text-purple-600">4</div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourcesData.map((resource) => (
          <div key={resource._id || resource.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{getCategoryIcon(resource.category)}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  {resource.size}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {resource.downloads}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{resource.category}</span>
                <span>Saved: {resource.savedDate}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all text-sm">
                  Open
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedResources;
