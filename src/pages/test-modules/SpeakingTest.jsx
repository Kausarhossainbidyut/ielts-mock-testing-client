import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionsAPI, resultsAPI } from '../../utils/api';

const SpeakingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchSpeakingQuestions = async () => {
      try {
        setLoading(true);
        const res = await questionsAPI.getSpeakingQuestions(id);
        
        if (res.data?.success && res.data.data?.questions?.length > 0) {
          const dbQuestions = res.data.data.questions;
          // Group by part
          const parts = {};
          dbQuestions.forEach(q => {
            const part = q.part || 1;
            if (!parts[part]) parts[part] = [];
            parts[part].push({
              _id: q._id,
              questionNumber: q.questionNumber,
              question: q.question,
              topic: q.topic,
              cueCard: q.cueCard,
              timeAllowed: q.timeAllowed
            });
          });
          
          setQuestions(Object.entries(parts).map(([part, qs]) => ({
            part: parseInt(part),
            questions: qs
          })));
        } else {
          setQuestions([
            { part: 1, questions: [{ question: 'Do you work or are you a student?', topic: 'Work' }] },
            { part: 2, questions: [{ question: 'Describe a memorable journey...', topic: 'Travel' }] },
            { part: 3, questions: [{ question: 'Discuss the importance of travel...', topic: 'Discussion' }] }
          ]);
        }
      } catch {
        setQuestions([
          { part: 1, questions: [{ question: 'Do you work or are you a student?', topic: 'Work' }] },
          { part: 2, questions: [{ question: 'Describe a memorable journey...', topic: 'Travel' }] },
          { part: 3, questions: [{ question: 'Discuss the importance of travel...', topic: 'Discussion' }] }
        ]);
      } finally {
        setLoading(false);
        if (!testStarted) setTimeLeft(15 * 60);
      }
    };
    fetchSpeakingQuestions();
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

  const handleStartTest = () => setTestStarted(true);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop audio recording
  };

  const handleNoteChange = (part, note) => {
    setAnswers(prev => ({ ...prev, [part]: note }));
  };

  const handleSubmit = async () => {
    // Simple scoring based on preparation
    const partsCompleted = Object.keys(answers).length;
    const score = Math.min(9, 5 + partsCompleted * 1.2);
    
    const resultData = {
      testId: id,
      testName: 'Speaking Test',
      type: 'Speaking',
      totalQuestions: 3,
      correctAnswers: partsCompleted,
      score: Math.round(score * 10) / 10,
      answers,
      completedAt: new Date().toISOString()
    };

    try { await resultsAPI.submitResult(resultData); } catch { /* ignore */ }
    setResult({ ...resultData, partsCompleted });
    setTestSubmitted(true);
  };

  const speakingParts = [
    {
      title: 'Part 1: Introduction & Interview',
      duration: '4-5 minutes',
      description: 'Answer general questions about yourself, your home, work, or studies.',
      questions: [
        'What is your full name?',
        'Where are you from?',
        'Do you work or are you a student?',
        'What do you enjoy most about your studies/work?',
        'Do you like your hometown? Why or why not?'
      ]
    },
    {
      title: 'Part 2: Long Turn',
      duration: '3-4 minutes',
      description: 'Talk about a topic for 1-2 minutes. You have 1 minute to prepare.',
      cueCard: {
        topic: 'Describe a skill you learned when you were a child.',
        points: [
          'What the skill was',
          'Who taught you',
          'How you learned it',
          'And explain why it was useful.'
        ]
      }
    },
    {
      title: 'Part 3: Discussion',
      duration: '4-5 minutes',
      description: 'Discuss more abstract topics related to Part 2.',
      questions: [
        'What skills are important for children to learn?',
        'How do you think technology has changed the way children learn?',
        'Do you think traditional skills are still relevant today?',
        'What are the benefits of learning new skills at any age?'
      ]
    }
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div></div>;

  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎤</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">IELTS Speaking Test</h1>
          <div className="space-y-3 mb-6 text-left bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">🎤 <strong>Part 1</strong> - Introduction (4-5 min){questions[0]?.questions?.[0]?.topic && ` - ${questions[0].questions[0].topic}`}</p>
            <p className="text-gray-600">📝 <strong>Part 2</strong> - Long Turn (3-4 min){questions[1]?.questions?.[0]?.topic && ` - ${questions[1].questions[0].topic}`}</p>
            <p className="text-gray-600">💬 <strong>Part 3</strong> - Discussion (4-5 min){questions[2]?.questions?.[0]?.topic && ` - ${questions[2].questions[0].topic}`}</p>
            <p className="text-gray-600">⏱️ <strong>15 Minutes</strong> - Total time</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-yellow-800 text-sm">⚠️ This is a practice test. In the real test, a examiner will conduct the interview.</p>
          </div>
          <button onClick={handleStartTest} className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium">Start Test</button>
          <button onClick={() => navigate(-1)} className="w-full mt-3 py-2 text-gray-600">Go Back</button>
        </div>
      </div>
    );
  }

  if (testSubmitted && result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${result.score >= 7 ? 'bg-green-100' : result.score >= 5 ? 'bg-yellow-100' : 'bg-red-100'}`}>
            <span className={`text-4xl font-bold ${result.score >= 7 ? 'text-green-600' : result.score >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>{result.score}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Speaking Test Completed!</h2>
          <p className="text-gray-600 mt-2">Great job completing all parts!</p>
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="text-2xl font-bold">{result.partsCompleted}/3</div>
            <div className="text-gray-500 text-sm">Parts Completed</div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 bg-gray-200 rounded-lg">Dashboard</button>
            <button onClick={() => window.location.reload()} className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  const currentPartData = speakingParts[currentPart];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">🎤 IELTS Speaking Test</h1>
          <div className={`px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 60 ? 'bg-red-500' : 'bg-white/20'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Part Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex gap-2 mb-6">
          {speakingParts.map((part, idx) => (
            <button key={idx} onClick={() => setCurrentPart(idx)}
              className={`px-4 py-2 rounded-lg font-medium ${currentPart === idx ? 'bg-pink-600 text-white' : 'bg-white text-gray-600'}`}>
              {part.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{currentPartData.title}</h2>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
              {currentPartData.duration}
            </span>
          </div>
          
          <p className="text-gray-600 mb-6">{currentPartData.description}</p>

          {/* Questions */}
          {currentPartData.questions && (
            <div className="space-y-4 mb-6">
              {currentPartData.questions.map((q, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-medium">{q}</p>
                </div>
              ))}
            </div>
          )}

          {/* Cue Card for Part 2 */}
          {currentPartData.cueCard && (
            <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-gray-800 mb-3">{currentPartData.cueCard.topic}</h3>
              <ul className="space-y-2">
                {currentPartData.cueCard.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-yellow-700 text-sm mt-4">⏱️ You have 1 minute to prepare</p>
            </div>
          )}

          {/* Practice Response Area */}
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-700">Practice your response here:</span>
              <button 
                onClick={toggleRecording}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {isRecording ? '⏹ Stop' : '🎤 Record'}
              </button>
            </div>
            <textarea
              value={answers[currentPart] || ''}
              onChange={(e) => handleNoteChange(currentPart, e.target.value)}
              placeholder={currentPart === 1 ? "Notes for your 1-2 minute talk..." : "Write your answer notes here..."}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentPart(prev => Math.max(0, prev - 1))} 
            disabled={currentPart === 0}
            className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            ← Previous Part
          </button>
          
          {currentPart === speakingParts.length - 1 ? (
            <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg">
              Submit Test
            </button>
          ) : (
            <button onClick={() => setCurrentPart(prev => Math.min(speakingParts.length - 1, prev + 1))} className="px-6 py-3 bg-pink-600 text-white rounded-lg">
              Next Part →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakingTest;
