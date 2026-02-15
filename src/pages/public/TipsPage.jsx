import { useState, useEffect } from 'react';
import { tipsAPI } from '../../utils/api';

const TipsPage = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const res = await tipsAPI.getAllTips();
        if (res.data?.success) {
          setTips(res.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching tips:', err);
        setTips([
          { _id: '1', title: 'Reading: Skimming and Scanning', category: 'Reading', content: 'Learn to skim for main ideas and scan for specific information. Practice timing yourself to complete reading sections within the allocated time.', level: 'All Levels' },
          { _id: '2', title: 'Listening: Preview Before You Listen', category: 'Listening', content: 'Use the time before each section to preview the questions. This helps you know what information to listen for.', level: 'All Levels' },
          { _id: '3', title: 'Writing Task 1: Data Description', category: 'Writing', content: 'Focus on key trends, comparisons, and significant changes. Don\'t describe every piece of data - select the most important features.', level: 'Intermediate' },
          { _id: '4', title: 'Speaking: Part 2 Long Turn', category: 'Speaking', content: 'Use the 1-minute preparation time to structure your talk. Include introduction, main points with examples, and a conclusion.', level: 'All Levels' },
          { _id: '5', title: 'Time Management Tips', category: 'General', content: 'Practice with timed tests regularly. Allocate time per question and don\'t spend too long on any single question.', level: 'All Levels' },
          { _id: '6', title: 'Vocabulary for Academic Writing', category: 'Writing', content: 'Build your academic vocabulary. Use synonyms and paraphrasing to demonstrate range, but avoid overly complex words used incorrectly.', level: 'Advanced' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const filteredTips = filter === 'all' 
    ? tips 
    : tips.filter(t => t.category?.toLowerCase() === filter.toLowerCase());

  const categories = ['all', 'Reading', 'Listening', 'Writing', 'Speaking', 'General'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">IELTS Tips & Strategies</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tips and proven strategies to help you achieve your target band score
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
              {cat === 'all' ? 'All Tips' : cat}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
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
            {filteredTips.map(tip => (
              <div key={tip._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-2 ${
                  tip.category === 'Reading' ? 'bg-blue-500' :
                  tip.category === 'Listening' ? 'bg-green-500' :
                  tip.category === 'Writing' ? 'bg-orange-500' :
                  tip.category === 'Speaking' ? 'bg-pink-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tip.category === 'Reading' ? 'bg-blue-100 text-blue-700' :
                      tip.category === 'Listening' ? 'bg-green-100 text-green-700' :
                      tip.category === 'Writing' ? 'bg-orange-100 text-orange-700' :
                      tip.category === 'Speaking' ? 'bg-pink-100 text-pink-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {tip.category}
                    </span>
                    <span className="text-xs text-gray-500">{tip.level}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tips found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipsPage;
