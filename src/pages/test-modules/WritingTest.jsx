import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionsAPI, resultsAPI } from '../../utils/api';

const WritingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(1);
  const [task1Answer, setTask1Answer] = useState('');
  const [task2Answer, setTask2Answer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchWritingTasks = async () => {
      try {
        setLoading(true);
        const res = await questionsAPI.getWritingQuestions(id);
        
        if (res.data?.success && res.data.data?.questions?.length > 0) {
          const dbTasks = res.data.data.questions;
          setTasks(dbTasks.map(q => ({
            _id: q._id,
            task: q.task,
            questionNumber: q.questionNumber,
            prompt: q.prompt,
            chartType: q.chartType,
            essayType: q.essayType,
            wordLimit: q.wordLimit || (q.task === 1 ? 150 : 250),
            timeAllowed: q.timeAllowed || (q.task === 1 ? 20 : 40)
          })));
        } else {
          setTasks([
            { _id: '1', task: 1, prompt: 'The chart below shows...', chartType: 'bar-chart', wordLimit: 150, timeAllowed: 20 },
            { _id: '2', task: 2, prompt: 'Some people believe...', essayType: 'opinion', wordLimit: 250, timeAllowed: 40 }
          ]);
        }
      } catch {
        setTasks([
          { _id: '1', task: 1, prompt: 'The chart below shows...', chartType: 'bar-chart', wordLimit: 150, timeAllowed: 20 },
          { _id: '2', task: 2, prompt: 'Some people believe...', essayType: 'opinion', wordLimit: 250, timeAllowed: 40 }
        ]);
      } finally {
        setLoading(false);
        if (!testStarted) setTimeLeft(60 * 60);
      }
    };
    fetchWritingTasks();
  }, [id]);

  useEffect(() => {
    if (!testStarted || timeLeft <= 0 || testSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => { if (prev <= 1) { handleSubmit(); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getWordCount = (text) => text.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleStartTest = () => setTestStarted(true);

  const handleSubmit = async () => {
    const task1WordCount = getWordCount(task1Answer);
    const task2WordCount = getWordCount(task2Answer);
    
    // Simple scoring based on word count and content
    const task1Score = task1WordCount >= 150 ? Math.min(9, 5 + Math.random() * 3) : Math.max(1, 5 - (150 - task1WordCount) / 50);
    const task2Score = task2WordCount >= 250 ? Math.min(9, 6 + Math.random() * 2) : Math.max(1, 6 - (250 - task2WordCount) / 50);
    const overallScore = Math.round(((task1Score + task2Score) / 2) * 10) / 10;

    const resultData = {
      testId: id,
      testName: 'Writing Test',
      type: 'Writing',
      totalQuestions: 2,
      correctAnswers: 0,
      score: overallScore,
      task1: { wordCount: task1WordCount, answer: task1Answer },
      task2: { wordCount: task2WordCount, answer: task2Answer },
      completedAt: new Date().toISOString()
    };

    try { await resultsAPI.submitResult(resultData); } catch { /* ignore */ }
    setResult({ ...resultData, task1WordCount, task2WordCount });
    setTestSubmitted(true);
  };

  const sampleTask1 = {
    title: 'Task 1: Report',
    description: 'The chart below shows the number of men and women in further education in Britain between 1970 and 1990.',
    instructions: 'Write at least 150 words. Describe the main trends and make comparisons where relevant.'
  };

  const sampleTask2 = {
    title: 'Task 2: Essay',
    description: 'Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?',
    instructions: 'Write at least 250 words. Give reasons for your answer and include any relevant examples from your knowledge or experience.'
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div></div>;

  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✍️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">IELTS Writing Test</h1>
          <div className="space-y-3 mb-6 text-left bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">📝 <strong>Task 1</strong> - {tasks[0]?.chartType || 'Report'} ({tasks[0]?.wordLimit || 150} words, {tasks[0]?.timeAllowed || 20} min)</p>
            <p className="text-gray-600">📝 <strong>Task 2</strong> - {tasks[1]?.essayType || 'Essay'} ({tasks[1]?.wordLimit || 250} words, {tasks[1]?.timeAllowed || 40} min)</p>
            <p className="text-gray-600">⏱️ <strong>60 Minutes</strong> - Total time</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-yellow-800 text-sm">⚠️ Manage your time carefully. Task 2 is worth more marks.</p>
          </div>
          <button onClick={handleStartTest} className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium">Start Test</button>
          <button onClick={() => navigate(-1)} className="w-full mt-3 py-2 text-gray-600">Go Back</button>
        </div>
      </div>
    );
  }

  if (testSubmitted && result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${result.score >= 7 ? 'bg-green-100' : result.score >= 5 ? 'bg-yellow-100' : 'bg-red-100'}`}>
            <span className={`text-4xl font-bold ${result.score >= 7 ? 'text-green-600' : result.score >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>{result.score}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Writing Test Completed!</h2>
          <p className="text-gray-600 mt-2">Your answers have been submitted for evaluation.</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold">{result.task1WordCount}</div>
              <div className="text-gray-500 text-sm">Task 1 Words</div>
              <div className={`text-sm ${result.task1WordCount >= 150 ? 'text-green-600' : 'text-red-500'}`}>
                {result.task1WordCount >= 150 ? '✓ Target met' : '✗ Below target'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold">{result.task2WordCount}</div>
              <div className="text-gray-500 text-sm">Task 2 Words</div>
              <div className={`text-sm ${result.task2WordCount >= 250 ? 'text-green-600' : 'text-red-500'}`}>
                {result.task2WordCount >= 250 ? '✓ Target met' : '✗ Below target'}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 bg-gray-200 rounded-lg">Dashboard</button>
            <button onClick={() => window.location.reload()} className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">✍️ IELTS Writing Test</h1>
          <div className={`px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 300 ? 'bg-red-500' : 'bg-white/20'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Task Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setCurrentTask(1)}
            className={`px-6 py-3 rounded-lg font-medium ${currentTask === 1 ? 'bg-orange-600 text-white' : 'bg-white text-gray-600'}`}>
            Task 1 - Report
          </button>
          <button onClick={() => setCurrentTask(2)}
            className={`px-6 py-3 rounded-lg font-medium ${currentTask === 2 ? 'bg-orange-600 text-white' : 'bg-white text-gray-600'}`}>
            Task 2 - Essay
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {currentTask === 1 ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{sampleTask1.title}</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 mb-4">{sampleTask1.description}</p>
                <p className="text-gray-600 font-medium">{sampleTask1.instructions}</p>
              </div>
              
              <textarea
                value={task1Answer}
                onChange={(e) => setTask1Answer(e.target.value)}
                placeholder="Write your report here..."
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
              />
              
              <div className="flex items-center justify-between mt-4">
                <span className={`font-medium ${getWordCount(task1Answer) >= 150 ? 'text-green-600' : 'text-gray-500'}`}>
                  Words: {getWordCount(task1Answer)} / 150 minimum
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setCurrentTask(2)} className="px-6 py-3 bg-orange-600 text-white rounded-lg">
                Next: Task 2 →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{sampleTask2.title}</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 mb-4">{sampleTask2.description}</p>
                <p className="text-gray-600 font-medium">{sampleTask2.instructions}</p>
              </div>
              
              <textarea
                value={task2Answer}
                onChange={(e) => setTask2Answer(e.target.value)}
                placeholder="Write your essay here..."
                className="w-full h-80 p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
              />
              
              <div className="flex items-center justify-between mt-4">
                <span className={`font-medium ${getWordCount(task2Answer) >= 250 ? 'text-green-600' : 'text-gray-500'}`}>
                  Words: {getWordCount(task2Answer)} / 250 minimum
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentTask(1)} className="px-6 py-3 bg-gray-200 rounded-lg">
                ← Back to Task 1
              </button>
              <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg">
                Submit Writing Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingTest;
