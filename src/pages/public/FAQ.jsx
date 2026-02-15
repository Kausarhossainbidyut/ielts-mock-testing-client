import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is IELTS?",
          answer: "IELTS (International English Language Testing System) is the world's most popular English language proficiency test for higher education and global migration. It assesses your ability to listen, read, write, and speak in English."
        },
        {
          question: "What is the difference between IELTS Academic and General Training?",
          answer: "IELTS Academic is for those who want to study at university or join a professional institution, while IELTS General Training is for those who are migrating to English-speaking countries or undergoing work training. Both tests have the same Listening and Speaking sections but different Reading and Writing sections."
        },
        {
          question: "How long is the IELTS test?",
          answer: "The complete IELTS test takes approximately 2 hours and 45 minutes. The Listening section is 30 minutes, Reading is 60 minutes, Writing is 60 minutes, and Speaking takes 11-14 minutes."
        }
      ]
    },
    {
      category: "Test Format",
      questions: [
        {
          question: "How many sections are there in IELTS?",
          answer: "IELTS has four sections: Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11-14 minutes). All sections are taken on the same day, except for the Speaking test which may be scheduled up to a week before or after the other sections."
        },
        {
          question: "What question types are in the Listening section?",
          answer: "The Listening section includes multiple-choice, matching, plan/map/diagram labeling, form completion, note completion, summary completion, and sentence completion questions. There are four recordings with 40 questions in total."
        },
        {
          question: "How is Writing Task 1 different from Writing Task 2?",
          answer: "Writing Task 1 requires you to describe visual information (graph, chart, table, diagram, or map) in at least 150 words. Writing Task 2 is an essay question where you need to present an argument or discuss an issue in at least 250 words. Task 2 carries more weight (two-thirds of the Writing score)."
        }
      ]
    },
    {
      category: "Scoring",
      questions: [
        {
          question: "How is IELTS scored?",
          answer: "IELTS uses a 9-band scoring system from 1 (non-user) to 9 (expert user). Each section (Listening, Reading, Writing, Speaking) is scored separately, and then the four scores are averaged to give an overall band score."
        },
        {
          question: "What is a good IELTS band score?",
          answer: "Most universities require an overall band score of 6.0-6.5 for undergraduate programs and 6.5-7.0 for postgraduate programs. For immigration purposes, requirements vary by country (e.g., Canada Express Entry typically requires CLB 9, which is equivalent to IELTS 7+ in each ability)."
        },
        {
          question: "Can I retake IELTS?",
          answer: "Yes, you can retake IELTS as many times as you want. There is no limit on the number of times you can take the test. However, you must wait at least 3 days between tests if taking computer-delivered IELTS."
        }
      ]
    },
    {
      category: "Preparation",
      questions: [
        {
          question: "How should I prepare for IELTS?",
          answer: "Start by familiarizing yourself with the test format and timing. Practice with official IELTS materials regularly. Focus on strengthening your English skills in all four areas. Take practice tests to identify your weaknesses and improve time management. Consider taking a preparation course if you need structured guidance."
        },
        {
          question: "How long does it take to prepare for IELTS?",
          answer: "Preparation time varies depending on your current English level and target band score. If you're aiming for Band 7+ and currently at Band 5-6, you may need 2-3 months of dedicated preparation. Those closer to their target score may need 4-6 weeks of practice."
        },
        {
          question: "What are the best resources for IELTS preparation?",
          answer: "Official IELTS practice materials from Cambridge and the British Council are the best resources. Our platform offers comprehensive practice tests, tips, and strategies. Additionally, BBC Learning English and TED talks can help improve your English skills."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "How do I book an IELTS test?",
          answer: "You can book your IELTS test through our platform by creating an account, selecting your preferred test date and location, and completing the payment. Make sure to check the test availability in your area before booking."
        },
        {
          question: "What identification do I need to bring on test day?",
          answer: "You must bring the same valid passport or national identity card that you used when booking the test. Photocopies are not accepted. Your ID must be original, valid (not expired), and have your photograph and signature."
        },
        {
          question: "Can I use a computer for IELTS?",
          answer: "Yes, IELTS offers both paper-based and computer-delivered tests. The content, timing, and scoring are identical for both formats. Computer-delivered testing is available at designated test centers and offers faster results (3-5 days vs 13 days for paper-based)."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about IELTS and our platform
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* FAQ Categories */}
        {faqs.map(category => (
          <div key={category.category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.questions.map((q, idx) => {
                const globalIdx = faqs.slice(0, faqs.indexOf(category)).reduce((acc, c) => acc + c.questions.length, 0) + idx;
                return (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === globalIdx ? -1 : globalIdx)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                    >
                      <span className="font-medium text-gray-800 pr-4">{q.question}</span>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === globalIdx ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                    {openIndex === globalIdx && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed border-t pt-4">{q.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
          <p className="text-teal-100 mb-6">
            Can't find the answer you're looking for? Contact our support team.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-teal-600 rounded-xl font-bold hover:bg-gray-100 transition">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
