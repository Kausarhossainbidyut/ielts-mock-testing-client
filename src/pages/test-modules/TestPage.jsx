import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsAPI, questionsAPI, resultsAPI } from '../../utils/api';

const TestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const [testRes, questionsRes] = await Promise.all([
          testsAPI.getTestById(id),
          questionsAPI.getReadingQuestions(id).catch(() => ({ data: { data: [] } }))
        ]);
        
        if (testRes.data?.success) {
          setTest(testRes.data.data);
          setTimeLeft((testRes.data.data.duration || 60) * 60);
        }
        
        if (questionsRes.data?.success && questionsRes.data.data?.length > 0) {
          setQuestions(questionsRes.data.data);
        } else {
          // Generate sample questions
          setQuestions(generateSampleQuestions());
        }
      } catch (err) {
        console.error('Error fetching test:', err);
        setTest({ title: 'IELTS Practice Test', type: 'Reading', duration: 60 });
        setQuestions(generateSampleQuestions());
        setTimeLeft(60 * 60);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  useEffect(() => {
    if (!testStarted || timeLeft <= 0 || testSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted]);

  const generateSampleQuestions = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      _id: `q${i + 1}`,
      questionNumber: i + 1,
      question: `This is sample question ${i + 1}. Choose the correct answer from the options below.`,
      options: [
        { id: 'a', text: 'Option A - Sample answer choice' },
        { id: 'b', text: 'Option B - Sample answer choice' },
        { id: 'c', text: 'Option C - Sample answer choice' },
        { id: 'd', text: 'Option D - Sample answer choice' }
      ],
      correctAnswer: ['a', 'b', 'c', 'd'][Math.floor(Math.random() * 4)],
      explanation: 'This is a sample explanation for the correct answer.'
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerChange = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion]?._id || currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      const userAnswer = answers[q._id || index];
      if (userAnswer === q.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 9 * 10) / 10;
    
    const resultData = {
      testId: id,
      testName: test?.title || 'Practice Test',
      type: test?.type || 'Reading',
      totalQuestions: questions.length,
      correctAnswers,
      score,
      answers,
      completedAt: new Date().toISOString()
    };

    try {
      await resultsAPI.submitResult(resultData);
    } catch {
      console.log('Could not save result to server');
    }

    setResult(resultData);
    setTestSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{test?.title}</h1>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Questions:</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Time Limit:</span>
              <span className="font-medium">{test?.duration || 60} minutes</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Type:</span>
              <span className="font-medium">{test?.type || 'Reading'}</span>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-yellow-800 text-sm">
              ⚠️ Once you start, the timer cannot be paused. Make sure you have a stable internet connection.
            </p>
          </div>
          <button
            onClick={handleStartTest}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Start Test
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-2 text-gray-600 hover:text-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (testSubmitted && result) {
    const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="mb-6">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
              result.score >= 7 ? 'bg-green-100' : result.score >= 5 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-4xl font-bold ${
                result.score >= 7 ? 'text-green-600' : result.score >= 5 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {result.score}
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Test Completed!</h2>
          <p className="text-gray-600 mb-6">Your band score for {result.type} module</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-gray-500 text-sm">Correct Answers</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
              <div className="text-gray-500 text-sm">Accuracy</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">{test?.title}</h1>
          <div className={`px-4 py-2 rounded-lg font-mono font-bold ${
            timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Object.keys(answers).length} answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {currentQ?.questionNumber || currentQuestion + 1}
            </span>
            <div className="flex-1">
              <p className="text-lg text-gray-800 mb-6">{currentQ?.question}</p>
              
              <div className="space-y-3">
                {currentQ?.options?.map((option, idx) => (
                  <label 
                    key={option.id || idx}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[currentQ._id || currentQuestion] === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option.id}
                      checked={answers[currentQ._id || currentQuestion] === option.id}
                      onChange={() => handleAnswerChange(option.id)}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  idx === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[questions[idx]._id || idx]
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
