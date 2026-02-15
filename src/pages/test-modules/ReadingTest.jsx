import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsAPI, questionsAPI, resultsAPI } from '../../utils/api';

const ReadingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [passages, setPassages] = useState([]);
  const [currentPassage, setCurrentPassage] = useState(0);
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
        const res = await questionsAPI.getReadingQuestions(id);
        
        if (res.data?.success && res.data.data?.length > 0) {
          setPassages([{ title: 'Reading Passage', questions: res.data.data }]);
          setTimeLeft(60 * 60);
        } else {
          setPassages(generateSampleReadingPassages());
          setTimeLeft(60 * 60);
        }
      } catch {
        setPassages(generateSampleReadingPassages());
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
      setTimeLeft(prev => { if (prev <= 1) { handleSubmit(); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted]);

  const generateSampleReadingPassages = () => [
    {
      title: 'The History of Coffee',
      content: `Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. From the coffee bean, the drink has become a global phenomenon.

Coffee is darkly colored, bitter, slightly acidic and has a stimulating effect in humans, primarily due to its caffeine content. It is one of the most popular drinks in the world and can be prepared and presented in a variety of ways.

The story of coffee begins in Ethiopia, the传说 origin of the coffee plant, Coffea arabica. According to legend, a goat herder named Kaldi discovered coffee around 850 AD when he noticed that his goats became very energetic after eating the berries from a certain tree.

By the 15th century, coffee had spread to the Arabian Peninsula. By the 16th century, it had reached Persia, Turkey, and North Africa. Coffee came to Europe in the 17th century and quickly became popular across the continent.

Today, Brazil is the largest coffee producer in the world, followed by Vietnam, Colombia, and Indonesia. Coffee is grown in more than 50 countries around the world.`,
      questions: [
        { _id: 'r1', questionNumber: 1, question: 'Where did coffee originate according to the passage?', options: [{ id: 'a', text: 'Brazil' }, { id: 'b', text: 'Ethiopia' }, { id: 'c', text: 'Arabian Peninsula' }, { id: 'd', text: 'Turkey' }], correctAnswer: 'b' },
        { _id: 'r2', questionNumber: 2, question: 'Who discovered coffee according to legend?', options: [{ id: 'a', text: 'A merchant' }, { id: 'b', text: 'A goat herder named Kaldi' }, { id: 'c', text: 'A farmer' }, { id: 'd', text: 'A scientist' }], correctAnswer: 'b' },
        { _id: 'r3', questionNumber: 3, question: 'Which country is the largest coffee producer?', options: [{ id: 'a', text: 'Vietnam' }, { id: 'b', text: 'Colombia' }, { id: 'c', text: 'Brazil' }, { id: 'd', text: 'Indonesia' }], correctAnswer: 'c' },
        { _id: 'r4', questionNumber: 4, question: 'What gives coffee its stimulating effect?', options: [{ id: 'a', text: 'Sugar' }, { id: 'b', text: 'Caffeine' }, { id: 'c', text: 'Milk' }, { id: 'd', text: 'Chocolate' }], correctAnswer: 'b' },
      ]
    },
    {
      title: 'Renewable Energy Sources',
      content: `Renewable energy is energy derived from natural sources that are replenished at a higher rate than they are consumed. Solar and wind are two of the most popular renewable energy sources.

Solar energy is radiant light and heat from the Sun that is harnessed using a range of technologies such as solar photovoltaic panels to generate electricity. Solar panels convert sunlight into electricity without any moving parts.

Wind energy is the process of creating electricity using the wind, or air flows that occur naturally in the atmosphere. Modern wind turbines turn wind's kinetic energy into electricity.

Hydropower is another major source of renewable energy, accounting for about 16% of global electricity generation. It uses the force of flowing water to spin turbines and generate electricity.

The benefits of renewable energy include reduced carbon emissions, improved public health, and job creation in the renewable energy sector. Many countries are investing heavily in renewable energy to meet climate goals.`,
      questions: [
        { _id: 'r5', questionNumber: 5, question: 'What percentage of global electricity does hydropower generate?', options: [{ id: 'a', text: '10%' }, { id: 'b', text: '16%' }, { id: 'c', text: '25%' }, { id: 'd', text: '5%' }], correctAnswer: 'b' },
        { _id: 'r6', questionNumber: 6, question: 'What do modern wind turbines convert into electricity?', options: [{ id: 'a', text: 'Heat' }, { id: 'b', text: 'Kinetic energy' }, { id: 'c', text: 'Chemical energy' }, { id: 'd', text: 'Nuclear energy' }], correctAnswer: 'b' },
      ]
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => setTestStarted(true);

  const handleAnswerChange = (answer) => {
    const currentQ = passages[currentPassage]?.questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [currentQ?._id || currentQuestion]: answer }));
  };

  const handleNext = () => {
    const passage = passages[currentPassage];
    if (currentQuestion < passage.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentPassage < passages.length - 1) {
      setCurrentPassage(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentPassage > 0) {
      setCurrentPassage(prev => prev - 1);
      setCurrentQuestion(passages[currentPassage - 1]?.questions.length - 1 || 0);
    }
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    let totalQuestions = 0;
    
    passages.forEach(passage => {
      passage.questions.forEach((q, idx) => {
        totalQuestions++;
        const userAnswer = answers[q._id || idx];
        if (userAnswer === q.correctAnswer) correctAnswers++;
      });
    });

    const score = Math.round((correctAnswers / totalQuestions) * 9 * 10) / 10;
    
    const resultData = {
      testId: id,
      testName: 'Reading Test',
      type: 'Reading',
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">IELTS Reading Test</h1>
          <div className="space-y-3 mb-6 text-left bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">📄 <strong>3 Passages</strong> - Academic texts</p>
            <p className="text-gray-600">⏱️ <strong>60 Minutes</strong> - No extra time for transfer</p>
            <p className="text-gray-600">📝 <strong>40 Questions</strong> - Various types</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-yellow-800 text-sm">⚠️ Read the passages carefully. Answers should be based on the information given.</p>
          </div>
          <button onClick={handleStartTest} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium">Start Test</button>
          <button onClick={() => navigate(-1)} className="w-full mt-3 py-2 text-gray-600">Go Back</button>
        </div>
      </div>
    );
  }

  if (testSubmitted && result) {
    const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${result.score >= 7 ? 'bg-green-100' : result.score >= 5 ? 'bg-yellow-100' : 'bg-red-100'}`}>
            <span className={`text-4xl font-bold ${result.score >= 7 ? 'text-green-600' : result.score >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>{result.score}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Reading Test Completed!</h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4"><div className="text-2xl font-bold">{result.correctAnswers}/{result.totalQuestions}</div><div className="text-gray-500 text-sm">Correct</div></div>
            <div className="bg-gray-50 rounded-lg p-4"><div className="text-2xl font-bold">{percentage}%</div><div className="text-gray-500 text-sm">Accuracy</div></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 bg-gray-200 rounded-lg">Dashboard</button>
            <button onClick={() => window.location.reload()} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  const currentPassageData = passages[currentPassage];
  const currentQ = currentPassageData?.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">📖 IELTS Reading Test</h1>
          <div className={`px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 300 ? 'bg-red-500' : 'bg-white/20'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passage */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Passage {currentPassage + 1}: {currentPassageData?.title}</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {currentPassageData?.content}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                {passages.map((_, idx) => (
                  <button key={idx} onClick={() => { setCurrentPassage(idx); setCurrentQuestion(0); }}
                    className={`px-3 py-1 rounded text-sm ${currentPassage === idx ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                    P{idx + 1}
                  </button>
                ))}
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {currentQ?.questionNumber || currentQuestion + 1}
                </span>
                <div className="flex-1">
                  <p className="text-lg text-gray-800 mb-4">{currentQ?.question}</p>
                  <div className="space-y-2">
                    {currentQ?.options?.map((option) => (
                      <label key={option.id} className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer ${answers[currentQ._id || currentQuestion] === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name={`question-${currentQuestion}`} value={option.id} checked={answers[currentQ._id || currentQuestion] === option.id} onChange={() => handleAnswerChange(option.id)} className="mt-1 w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={handlePrev} disabled={currentPassage === 0 && currentQuestion === 0} className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50">← Previous</button>
              {currentPassage === passages.length - 1 && currentQuestion === currentPassageData?.questions?.length - 1 ? (
                <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">Submit</button>
              ) : (
                <button onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Next →</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTest;
