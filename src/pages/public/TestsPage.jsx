import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { testsAPI } from '../../utils/api';

const TestsPage = ({ filter: filterProp }) => {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get('type');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(filterProp || urlFilter || 'all');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await testsAPI.getAllTests();
        if (res.data?.success) {
          setTests(res.data.data?.tests || res.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching tests:', err);
        setTests([
          { _id: '1', title: 'IELTS Academic Reading Practice Test', type: 'Reading', questionCount: 40, duration: 60, difficulty: 'Medium', description: 'Practice your reading skills with authentic IELTS Academic texts.' },
          { _id: '2', title: 'IELTS Listening Practice Test', type: 'Listening', questionCount: 40, duration: 30, difficulty: 'Medium', description: 'Improve your listening skills with various accents and audio materials.' },
          { _id: '3', title: 'IELTS Writing Task 1 & 2', type: 'Writing', questionCount: 2, duration: 60, difficulty: 'Hard', description: 'Master both Task 1 (Report) and Task 2 (Essay) writing.' },
          { _id: '4', title: 'IELTS Speaking Practice', type: 'Speaking', questionCount: 3, duration: 15, difficulty: 'Medium', description: 'Practice all three parts of the IELTS Speaking test.' },
          { _id: '5', title: 'Full IELTS Mock Test', type: 'Full Test', questionCount: 80, duration: 175, difficulty: 'Hard', description: 'Complete mock test covering all four modules.' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const filteredTests = filter === 'all' 
    ? tests 
    : tests.filter(t => {
      // Filter by type
      if (t.type?.toLowerCase() === filter.toLowerCase()) return true;
      // Filter by skills array
      if (t.skills?.some(s => s.toLowerCase() === filter.toLowerCase())) return true;
      return false;
    });

  const testTypes = ['all', 'listening', 'reading', 'writing', 'speaking', 'full-mock'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">IELTS Practice Tests</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of authentic IELTS practice tests to improve your skills
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {testTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                filter === type
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {type === 'all' ? 'All Tests' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Tests Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <div key={test._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-2 ${
                  test.type === 'Listening' ? 'bg-green-500' :
                  test.type === 'Reading' ? 'bg-blue-500' :
                  test.type === 'Writing' ? 'bg-orange-500' :
                  test.type === 'Speaking' ? 'bg-pink-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      test.type === 'Listening' ? 'bg-green-100 text-green-700' :
                      test.type === 'Reading' ? 'bg-blue-100 text-blue-700' :
                      test.type === 'Writing' ? 'bg-orange-100 text-orange-700' :
                      test.type === 'Speaking' ? 'bg-pink-100 text-pink-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {test.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      test.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{test.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>📝 {test.questionCount || test.questions} Questions</span>
                    <span>⏱️ {test.duration || test.time} min</span>
                  </div>
                  <Link
                    to={(() => {
                      const skill = test.skills?.[0]?.toLowerCase();
                      if (skill && ['listening', 'reading', 'writing', 'speaking'].includes(skill)) {
                        return `/test/${skill}/${test._id}`;
                      }
                      if (test.type && ['listening', 'reading', 'writing', 'speaking'].includes(test.type.toLowerCase())) {
                        return `/test/${test.type.toLowerCase()}/${test._id}`;
                      }
                      return `/test/${test._id}`;
                    })()}
                    className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Start Test
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tests found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPage;
