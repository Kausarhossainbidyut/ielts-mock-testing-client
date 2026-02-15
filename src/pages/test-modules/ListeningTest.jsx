import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsAPI, questionsAPI, resultsAPI } from '../../utils/api';
import Swal from 'sweetalert2';

const ListeningTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const res = await questionsAPI.getListeningQuestions(id);
        
        if (res.data?.success && res.data.data?.length > 0) {
          setQuestions(res.data.data);
          setTimeLeft(30 * 60); // 30 minutes for listening
        } else {
          // Sample questions
          setQuestions(generateSampleListeningQuestions());
          setTimeLeft(30 * 60);
        }
      } catch {
        setQuestions(generateSampleListeningQuestions());
        setTimeLeft(30 * 60);
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
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted]);

  const generateSampleListeningQuestions = () => {
    return [
      {
        section: 1,
        audio: null,
        questions: [
          { _id: 'l1', questionNumber: 1, question: 'What is the speaker\'s name?', options: [{ id: 'a', text: 'John Smith' }, { id: 'b', text: 'James Brown' }, { id: 'c', text: 'Jeff Wilson' }, { id: 'd', text: 'Joe Anderson' }], correctAnswer: 'c' },
          { _id: 'l2', questionNumber: 2, question: 'What time is the tour?', options: [{ id: 'a', text: '9:00 AM' }, { id: 'b', text: '10:00 AM' }, { id: 'c', text: '11:00 AM' }, { id: 'd', text: '12:00 PM' }], correctAnswer: 'b' },
        ]
      },
      {
        section: 2,
        audio: null,
        questions: [
          { _id: 'l3', questionNumber: 3, question: 'What is the main topic of the lecture?', options: [{ id: 'a', text: 'Climate Change' }, { id: 'b', text: 'Ocean Biology' }, { id: 'c', text: 'Space Exploration' }, { id: 'd', text: 'Ancient History' }], correctAnswer: 'b' },
          { _id: 'l4', questionNumber: 4, question: 'How long do sea turtles live?', options: [{ id: 'a', text: '20-30 years' }, { id: 'b', text: '50-80 years' }, { id: 'c', text: '100-150 years' }, { id: 'd', text: '10-20 years' }], correctAnswer: 'b' },
        ]
      }
    ];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => setTestStarted(true);

  const handleAnswerChange = (answer) => {
    const currentQ = questions[currentSection]?.questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [currentQ?._id || currentQuestion]: answer }));
  };

  const handleNext = () => {
    const section = questions[currentSection];
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < questions.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setCurrentQuestion(questions[currentSection - 1]?.questions.length - 1 || 0);
    }
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    let totalQuestions = 0;
    
    questions.forEach(section => {
      section.questions.forEach((q, idx) => {
        totalQuestions++;
        const userAnswer = answers[q._id || idx];
        if (userAnswer === q.correctAnswer) correctAnswers++;
      });
    });

    const score = Math.round((correctAnswers / totalQuestions) * 9 * 10) / 10;
    
    const resultData = {
      testId: id,
      testName: 'Listening Test',
      type: 'Listening',
      totalQuestions,
      correctAnswers,
      score,
      answers,
      completedAt: new Date().toISOString()
    };

    try { await resultsAPI.submitResult(resultData); } catch { /* ignore */ }
    setResult(resultData);
    setTestSubmitted(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div></div>;

  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎧</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">IELTS Listening Test</h1>
          <div className="space-y-3 mb-6 text-left bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">📝 <strong>4 Sections</strong> - Various question types</p>
            <p className="text-gray-600">⏱️ <strong>30 Minutes</strong> - Listen and answer</p>
            <p className="text-gray-600">📖 <strong>40 Questions</strong> - Multiple choice & more</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-yellow-800 text-sm">⚠️ You will hear each audio only once. Make sure you have speakers/headphones connected.</p>
          </div>
          <button onClick={handleStartTest} className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700">
            Start Test
          </button>
          <button onClick={() => navigate(-1)} className="w-full mt-3 py-2 text-gray-600">Go Back</button>
        </div>
      </div>
    );
  }

  if (testSubmitted && result) {
    const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${result.score >= 7 ? 'bg-green-100' : result.score >= 5 ? 'bg-yellow-100' : 'bg-red-100'}`}>
            <span className={`text-4xl font-bold ${result.score >= 7 ? 'text-green-600' : result.score >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>{result.score}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Listening Test Completed!</h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4"><div className="text-2xl font-bold">{result.correctAnswers}/{result.totalQuestions}</div><div className="text-gray-500 text-sm">Correct</div></div>
            <div className="bg-gray-50 rounded-lg p-4"><div className="text-2xl font-bold">{percentage}%</div><div className="text-gray-500 text-sm">Accuracy</div></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 bg-gray-200 rounded-lg">Dashboard</button>
            <button onClick={() => window.location.reload()} className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = questions[currentSection];
  const currentQ = currentSectionData?.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">🎧 IELTS Listening Test</h1>
          <div className={`px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 300 ? 'bg-red-500' : 'bg-white/20'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Section Indicator */}
        <div className="flex gap-2 mb-6">
          {questions.map((_, idx) => (
            <button key={idx} onClick={() => { setCurrentSection(idx); setCurrentQuestion(0); }}
              className={`px-4 py-2 rounded-lg font-medium ${currentSection === idx ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}>
              Section {idx + 1}
            </button>
          ))}
        </div>

        {/* Audio Player Placeholder */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <button className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl hover:bg-green-700">
              ▶
            </button>
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full"><div className="h-2 bg-green-500 rounded-full w-1/3"></div></div>
              <p className="text-gray-500 mt-2">Click play to listen to Section {currentSection + 1}</p>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
              {currentQ?.questionNumber || currentQuestion + 1}
            </span>
            <div className="flex-1">
              <p className="text-lg text-gray-800 mb-6">{currentQ?.question}</p>
              <div className="space-y-3">
                {currentQ?.options?.map((option) => (
                  <label key={option.id} className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer ${answers[currentQ._id || currentQuestion] === option.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name={`question-${currentQuestion}`} value={option.id} checked={answers[currentQ._id || currentQuestion] === option.id} onChange={() => handleAnswerChange(option.id)} className="mt-1 w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={handlePrev} disabled={currentSection === 0 && currentQuestion === 0} className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50">← Previous</button>
          <div className="text-gray-500">Question {currentQuestion + 1} of {currentSectionData?.questions?.length}</div>
          {currentSection === questions.length - 1 && currentQuestion === currentSectionData?.questions?.length - 1 ? (
            <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg">Submit</button>
          ) : (
            <button onClick={handleNext} className="px-6 py-3 bg-green-600 text-white rounded-lg">Next →</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeningTest;
