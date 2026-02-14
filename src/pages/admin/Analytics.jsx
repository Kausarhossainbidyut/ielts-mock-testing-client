const Analytics = () => {
  const stats = [
    { label: 'Total Submissions', value: '12,450', change: '+15%', icon: '📝' },
    { label: 'Avg. Band Score', value: '6.8', change: '+0.3', icon: '⭐' },
    { label: 'Pass Rate', value: '78%', change: '+5%', icon: '✅' },
    { label: 'Active Users', value: '2,100', change: '+12%', icon: '👥' },
  ];

  const bandDistribution = [
    { band: '9.0', count: 120, percentage: 4 },
    { band: '8.0', count: 340, percentage: 11 },
    { band: '7.0', count: 680, percentage: 22 },
    { band: '6.0', count: 890, percentage: 29 },
    { band: '5.0', count: 650, percentage: 21 },
    { band: 'Below 5', count: 430, percentage: 13 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Result Analytics</h1>
        <p className="text-purple-100">Platform performance and user statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-green-500 text-sm font-medium">↑ {stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Band Score Distribution</h2>
          <div className="space-y-3">
            {bandDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Band {item.band}</span>
                  <span className="text-gray-500">{item.count} users ({item.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.percentage * 3}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance by Module</h2>
          <div className="space-y-4">
            {[
              { module: 'Listening', avg: 7.2, improvement: '+5%' },
              { module: 'Reading', avg: 6.9, improvement: '+3%' },
              { module: 'Writing', avg: 6.4, improvement: '+2%' },
              { module: 'Speaking', avg: 6.7, improvement: '+4%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">{item.module}</div>
                  <div className="text-sm text-gray-500">Average: {item.avg}</div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ↑ {item.improvement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
