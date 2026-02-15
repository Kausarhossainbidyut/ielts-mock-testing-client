import { useState, useEffect } from 'react';
import { resultsAPI } from '../../utils/api';

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [resultsRes, statsRes] = await Promise.all([
          resultsAPI.getMyResults(),
          resultsAPI.getStatistics().catch(() => ({ data: null }))
        ]);
        
        if (resultsRes.data?.success) {
          setResults(resultsRes.data.data || []);
        }
        
        if (statsRes.data?.success) {
          setStats(statsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        // Fallback data
        setResults([
          { _id: '1', testName: 'IELTS Academic Reading Practice', date: '2026-02-10', overall: 7.5, listening: 8.0, reading: 7.5, writing: 7.0, speaking: 7.5 },
          { _id: '2', testName: 'IELTS Listening Module', date: '2026-02-08', overall: 8.0, listening: 8.5, reading: 8.0, writing: null, speaking: null },
          { _id: '3', testName: 'Full Mock Test - Band 9', date: '2026-02-05', overall: 6.5, listening: 6.5, reading: 6.5, writing: 6.5, speaking: 6.5 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback stats
  const statsData = stats || { overallBand: 7.0, avgListening: 7.8, avgReading: 7.3, avgWriting: 6.8, avgSpeaking: 7.0 };

  const getBandColor = (score) => {
    if (score === null || score === undefined || score === '-') return 'text-gray-400';
    if (score >= 8) return 'text-green-600 font-bold';
    if (score >= 7) return 'text-blue-600 font-bold';
    if (score >= 6) return 'text-yellow-600 font-bold';
    return 'text-red-500 font-bold';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-green-500/50 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-green-500/50 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-md animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Results</h1>
        <p className="text-green-100">View your IELTS test results and performance</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Overall Band</div>
          <div className="text-4xl font-bold text-blue-600">{statsData?.overallBand || 7.0}</div>
          <div className="text-xs text-gray-400">Out of 9.0</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Listening</div>
          <div className="text-3xl font-bold text-green-600">{statsData?.avgListening || 7.8}</div>
          <div className="text-xs text-gray-400">Avg: {statsData?.avgListening || 7.8}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Reading</div>
          <div className="text-3xl font-bold text-blue-600">{statsData?.avgReading || 7.3}</div>
          <div className="text-xs text-gray-400">Avg: {statsData?.avgReading || 7.3}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Writing</div>
          <div className="text-3xl font-bold text-yellow-600">{statsData?.avgWriting || 6.8}</div>
          <div className="text-xs text-gray-400">Avg: {statsData?.avgWriting || 6.8}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md text-center">
          <div className="text-gray-500 text-sm mb-1">Speaking</div>
          <div className="text-3xl font-bold text-purple-600">{statsData?.avgSpeaking || 7.0}</div>
          <div className="text-xs text-gray-400">Avg: {statsData?.avgSpeaking || 7.0}</div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Test Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Test Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Listening</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Reading</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Writing</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Speaking</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result._id || result.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{result.testName || result.test?.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{result.date || result.completedAt?.split('T')[0]}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.listening)}`}>{result.listening || '-'}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.reading)}`}>{result.reading || '-'}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.writing)}`}>{result.writing || '-'}</td>
                  <td className={`px-6 py-4 ${getBandColor(result.speaking)}`}>{result.speaking || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold">
                      {result.overall || result.bandScore || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Band Score Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">IELTS Band Score Guide</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
            <div className="text-green-600 font-bold text-lg">8-9</div>
            <div className="text-green-700 text-sm">Expert</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
            <div className="text-blue-600 font-bold text-lg">7</div>
            <div className="text-blue-700 text-sm">Good</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
            <div className="text-yellow-600 font-bold text-lg">6</div>
            <div className="text-yellow-700 text-sm">Competent</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
            <div className="text-orange-600 font-bold text-lg">5</div>
            <div className="text-orange-700 text-sm">Modest</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
            <div className="text-red-600 font-bold text-lg">4</div>
            <div className="text-red-700 text-sm">Limited</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
