import { useState } from 'react';
import { Link } from 'react-router-dom';

const BandScoreGuide = () => {
  const [selectedBand, setSelectedBand] = useState(7);

  const bandScores = [
    {
      band: 9,
      description: "Expert User",
      color: "bg-green-500",
      details: {
        listening: "Has fully operational command of the language with only occasional unsystematic inaccuracies and inappropriateness. Misunderstandings may occur in unfamiliar situations. Handles complex detailed argumentation well.",
        reading: "Can understand with ease virtually everything heard or read. Can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation.",
        writing: "Can produce clear, smoothly flowing, well-structured text displaying controlled use of organizational patterns, connectors and cohesive devices.",
        speaking: "Can use language with full flexibility and precision in all contexts. Can sustain organized language and navigate complex situations effortlessly."
      }
    },
    {
      band: 8,
      description: "Very Good User",
      color: "bg-green-400",
      details: {
        listening: "Has fully operational command of the language with only occasional unsystematic inaccuracies and inappropriateness. Misunderstandings may occur in unfamiliar situations.",
        reading: "Can understand a wide range of demanding, longer texts, and recognize implicit meaning. Can use language flexibly and effectively for social, academic and professional purposes.",
        writing: "Can produce clear, well-structured text, showing controlled use of organizational patterns, connectors and cohesive devices. Minor inaccuracies may occur.",
        speaking: "Can speak with very little hesitation. Uses a wide range of connectors and cohesive devices. Occasional inaccuracies in pronunciation or intonation."
      }
    },
    {
      band: 7,
      description: "Good User",
      color: "bg-blue-500",
      details: {
        listening: "Has operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally handles complex language well.",
        reading: "Can understand the main ideas of complex texts on both concrete and abstract topics. Can read with a large degree of independence.",
        writing: "Can produce clear, detailed texts on a wide variety of subjects. Can explain a viewpoint on a topical issue, giving advantages and disadvantages.",
        speaking: "Can speak without much hesitation. Uses a range of connectives and discourse markers. Some pronunciation errors but overall clarity is good."
      }
    },
    {
      band: 6,
      description: "Competent User",
      color: "bg-blue-400",
      details: {
        listening: "Has generally effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings. Can use and understand fairly complex language in familiar situations.",
        reading: "Can read reasonably demanding texts. Can understand main ideas in texts on a variety of topics, including some specialized texts.",
        writing: "Can produce clear, detailed texts on a number of subjects. Can discuss various topics and express points of view.",
        speaking: "Can communicate with some hesitation on familiar topics. Can describe experiences, events, dreams and ambitions."
      }
    },
    {
      band: 5,
      description: "Modest User",
      color: "bg-yellow-500",
      details: {
        listening: "Has partial command of the language, coping with overall meaning in most situations. Is likely to make many mistakes but can still handle basic communication.",
        reading: "Can read straightforward texts on familiar topics. Can find specific information in everyday material.",
        writing: "Can write simple texts on familiar topics. Can describe experiences, events and express opinions.",
        speaking: "Can communicate on familiar topics with some hesitation. Can describe experiences, events and plans."
      }
    },
    {
      band: 4,
      description: "Limited User",
      color: "bg-yellow-400",
      details: {
        listening: "Basic competence is limited to familiar situations. Experiences frequent breakdowns in communication in many situations.",
        reading: "Can read short, simple texts on familiar topics. Can find specific predictable information.",
        writing: "Can write simple sentences and basic messages. Can describe basic aspects of everyday life.",
        speaking: "Can communicate basic information on familiar topics. Can describe background and immediate environment."
      }
    },
    {
      band: 3,
      description: "Extremely Limited User",
      color: "bg-orange-500",
      details: {
        listening: "Conveys and understands only general meaning in very familiar situations. Frequent breakdowns in communication occur.",
        reading: "Can understand short, simple texts on familiar topics. Can identify specific information in simple material.",
        writing: "Can write very simple sentences and basic phrases. Can write basic personal details.",
        speaking: "Can answer direct questions on very familiar topics. Can describe immediate environment."
      }
    },
    {
      band: 2,
      description: "Intermittent User",
      color: "bg-orange-400",
      details: {
        listening: "Has great difficulty understanding spoken and written language.",
        reading: "Can understand very simple sentences with help. Can recognize familiar words.",
        writing: "Can copy familiar words and short phrases. Can write basic personal details.",
        speaking: "Can ask and answer very simple questions on familiar topics."
      }
    },
    {
      band: 1,
      description: "Non User",
      color: "bg-red-500",
      details: {
        listening: "Cannot use the language beyond possibly a few isolated words.",
        reading: "Cannot understand any words or sentences.",
        writing: "Cannot write any words or sentences.",
        speaking: "Cannot communicate any meaning beyond possibly a few isolated words."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">IELTS Band Score Guide</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understand what each IELTS band score means and what level of English proficiency it represents
          </p>
        </div>

        {/* Band Score Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Band Score</h2>
          <div className="flex flex-wrap gap-3">
            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map(band => (
              <button
                key={band}
                onClick={() => setSelectedBand(band)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  selectedBand === band
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Band {band}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Band Details */}
        {bandScores.filter(b => b.band === selectedBand).map(band => (
          <div key={band.band} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`${band.color} p-6`}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-800">{band.band}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{band.description}</h2>
                  <p className="text-white/80">IELTS Band Score {band.band}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Score Description</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800">Listening</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{band.details.listening}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800">Reading</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{band.details.reading}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800">Writing</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{band.details.writing}</p>
                </div>

                <div className="bg-pink-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800">Speaking</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{band.details.speaking}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Band Score Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left">Band</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Skill Level</th>
                </tr>
              </thead>
              <tbody>
                {bandScores.map((band, index) => (
                  <tr key={band.band} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-bold">{band.band}</td>
                    <td className="px-4 py-3">{band.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${band.color} text-white`}>
                        {band.band >= 7 ? 'Advanced' : band.band >= 5 ? 'Intermediate' : 'Beginner'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Improve Your Score?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Practice with our comprehensive IELTS mock tests and track your progress towards your target band score.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tests" className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition">
              Start Practice
            </Link>
            <Link to="/tips" className="px-8 py-3 bg-blue-500 text-white border-2 border-white rounded-xl font-bold hover:bg-blue-400 transition">
              View Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandScoreGuide;
