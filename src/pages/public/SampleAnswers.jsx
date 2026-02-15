import { useState } from 'react';
import { Link } from 'react-router-dom';

const SampleAnswers = () => {
  const [selectedCategory, setSelectedCategory] = useState('writing');

  const categories = [
    { id: 'writing', label: 'Writing Task 1', icon: '📊' },
    { id: 'writing2', label: 'Writing Task 2', icon: '✍️' },
    { id: 'speaking', label: 'Speaking', icon: '🎤' },
  ];

  const sampleAnswers = {
    writing: [
      {
        id: 1,
        band: 9,
        title: "Academic Writing Task 1 - Bar Chart",
        question: "The bar chart shows the percentage of different age groups who visited libraries in the UK in 2019. Summarize the information by selecting and reporting the main features.",
        answer: `The bar chart illustrates the proportion of five different age categories who used libraries in the United Kingdom in 2019.

Overall, it is clear that the youngest age group (15-24) had the highest library visitation rate, while the oldest group (65+) had the lowest.

Looking at the details, 68% of young people aged 15-24 visited libraries, making this the most active demographic. The 25-34 age group followed with 58%, and the 35-44 group with 51%. Library usage continued to decline with age, as 45-54 year olds represented 42%, while 55-64 year olds accounted for 31%. The smallest percentage, 24%, belonged to those aged 65 and over.

In conclusion, library patronage among UK adults in 2019 was strongly correlated with age, with teenagers and young adults being the most frequent visitors.`,
        analysis: "This answer achieves Band 9 by presenting a clear overview, accurately selecting key features, using a well-organized structure, and demonstrating a wide range of vocabulary and grammatical structures with precision."
      },
      {
        id: 2,
        band: 8,
        title: "Academic Writing Task 1 - Line Graph",
        question: "The line graph shows the number of annual visits to the cinema in three different countries between 1995 and 2015. Summarize the information.",
        answer: `The line graph illustrates how many times per year people in the USA, Japan, and China went to the cinema over a 20-year period from 1995 to 2015.

Overall, cinema visits increased significantly in all three countries during this period, with the USA consistently having the highest figures, while Japan showed relatively stable numbers.

In 1995, the USA had approximately 2 billion annual visits, compared to 1.2 billion in Japan and just 0.2 billion in China. Over the next two decades, the USA saw a steady rise to about 2.8 billion visits. Japan experienced minor fluctuations but remained between 1.1 and 1.3 billion. Notably, China's cinema attendance grew dramatically from 1995 to 2015, surpassing Japan by 2010 and reaching 1.5 billion visits by 2015.

In summary, while the USA maintained its lead throughout the period, China showed the most dramatic growth in cinema attendance.`,
        analysis: "This Band 8 answer provides a clear overview, logical organization, well-selected data, and uses a good range of vocabulary and grammar accurately."
      }
    ],
    writing2: [
      {
        id: 1,
        band: 9,
        title: "Writing Task 2 - Essay",
        question: "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?",
        answer: `It is often argued that students should be required to participate in unpaid community service during their secondary education. While I agree that such programs can be beneficial, I believe that making them compulsory may not be the most effective approach.

On one hand, mandatory community service can provide numerous benefits for young people. First, it helps students develop a sense of social responsibility and civic duty. By working in their communities, students learn the value of contributing to society without expecting monetary compensation. Additionally, these programs can provide valuable work experience that enhances students' resumes and university applications. Furthermore, community service often exposes students to different social environments, helping them develop empathy and interpersonal skills.

However, I believe there are significant drawbacks to making such programs compulsory. The primary concern is that forcing students to volunteer may actually generate resentment and diminish the intrinsic motivation to help others. When activities become obligatory, they can lose their meaningful nature and students may participate solely to fulfill a requirement rather than from genuine desire to contribute. Moreover, some students may have valid reasons for being unable to participate, such as family responsibilities, health issues, or challenging personal circumstances.

In my opinion, the solution lies in encouraging rather than mandating community service. Schools could provide incentives such as certificates, recognition programs, or academic credits for voluntary participation. This approach would foster genuine enthusiasm for helping others while respecting students' individual circumstances.

In conclusion, while community service can offer valuable experiences for students, making it compulsory may create more problems than it solves. A voluntary system with incentives would be more effective in promoting genuine civic engagement among young people.`,
        analysis: "This Band 9 essay presents a balanced view with clear introduction, well-developed body paragraphs, and a strong conclusion. It uses sophisticated vocabulary, complex grammatical structures, and maintains coherence throughout."
      },
      {
        id: 2,
        band: 8,
        title: "Writing Task 2 - Discussion Essay",
        question: "Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this. Discuss both these views and give your own opinion.",
        answer: `It is widely acknowledged that preparing children to become responsible citizens is a fundamental aspect of education. While some argue that this responsibility lies primarily with parents, others believe that schools should take the lead in this area. In my opinion, both institutions play crucial and complementary roles in developing good citizens.

Parents undoubtedly influence their children's understanding of societal norms and values from a very early age. As a child's first and most enduring role models, parents naturally teach them basic social skills such as honesty, respect, and cooperation through daily interactions. These early lessons form the foundation upon which future social development is built. Furthermore, parents have the opportunity to reinforce these values consistently throughout their child's upbringing, which is difficult for any educational institution to replicate.

However, schools are equally important in preparing children for society. In an educational setting, children learn to interact with peers outside their family circle, developing crucial social skills like teamwork, negotiation, and conflict resolution. Schools also provide structured opportunities to understand civic responsibilities through subjects like civics or social studies. Additionally, the diverse environment of schools exposes children to different perspectives and cultures, teaching them tolerance and acceptance—essential qualities for functioning in a multicultural society.

I believe that both parents and schools are necessary for comprehensive social development. Parents should focus on foundational moral values, while schools should build upon this foundation to teach more complex social concepts and skills. This partnership ensures that children receive consistent messages about what it means to be a responsible member of society.

In conclusion, although parents lay the groundwork for social development, schools are equally important in preparing children for citizenship. The most effective approach is for both institutions to work collaboratively toward this common goal.`,
        analysis: "This Band 8 essay presents a clear position, discusses both views equally, and provides a balanced conclusion. It demonstrates good vocabulary range, cohesive devices, and well-developed arguments."
      }
    ],
    speaking: [
      {
        id: 1,
        band: 9,
        title: "Speaking Part 2 - Describe a place",
        question: "Describe a place you would like to visit in the future. You should say: where this place is, what you would like to do there, who you would like to go with, and explain why you would like to visit this place.",
        answer: `I'd like to talk about a place I've always dreamed of visiting, which is Kyoto in Japan.

I first learned about Kyoto through a documentary about Japanese culture, and I've been fascinated ever since. It's famous for its ancient temples, traditional wooden houses, and beautiful gardens.

The main reason I want to visit is to experience the traditional Japanese culture. I would love to see the famous Fushimi Inari Shrine with its thousands of red torii gates, and explore the historic Gion district where you can spot geishas. I'm also really interested in attending a traditional tea ceremony, which I've read so much about.

As for who I'd like to go with, I'd probably take my best friend because we share similar interests in history and photography. I think we'd have an amazing time exploring the old temples and taking photos together.

I want to visit Kyoto not just for its beautiful scenery, but also because it represents a contrast between ancient traditions and modern life. I think it would be an incredibly peaceful and inspiring experience to walk through those historic streets and imagine what life was like centuries ago. It's definitely at the top of my travel bucket list!`,
        analysis: "This answer demonstrates Band 9 characteristics: natural delivery, wide vocabulary range, complex grammar structures, and extended coherent discourse. The speaker covers all points with developed ideas."
      },
      {
        id: 2,
        band: 8,
        title: "Speaking Part 3 - Technology",
        question: "How has technology changed the way people communicate?",
        answer: `I think technology has revolutionized communication in ways we couldn't have imagined just a few decades ago.

The most obvious change is speed and accessibility. Now we can instantly connect with someone on the other side of the world through video calls, messages, or social media. It's become so convenient that people rarely write letters anymore.

Another significant change is the variety of communication methods. We can send text, voice messages, photos, videos, or even live stream our daily activities. This has made communication much more expressive and engaging.

However, there are some drawbacks. Many people argue that digital communication lacks the warmth of face-to-face interaction. There's also the concern about privacy and the amount of personal information people share online.

Despite these concerns, I believe the benefits outweigh the drawbacks. Technology has made the world much more connected, and it's particularly valuable for maintaining relationships across long distances.

Looking to the future, I'm curious to see how communication technology will continue to evolve. Perhaps we'll have even more immersive ways to connect with each other!`,
        analysis: "This Band 8 answer shows good flexibility and range of vocabulary, uses cohesive devices appropriately, and provides extended answers with relevant examples and justifications."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sample Answers</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from high-scoring sample answers with detailed analysis
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Sample Answers */}
        <div className="space-y-8">
          {sampleAnswers[selectedCategory]?.map(answer => (
            <div key={answer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-bold">
                        Band {answer.band}
                      </span>
                      <span className="text-white/80 text-sm">Sample Answer</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{answer.title}</h3>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{answer.band}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Question
                  </h4>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{answer.question}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Sample Answer
                  </h4>
                  <div className="text-gray-700 bg-green-50 p-4 rounded-lg whitespace-pre-line leading-relaxed">
                    {answer.answer}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Why This Works
                  </h4>
                  <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">{answer.analysis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Practice with Real Tests</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Apply what you've learned from these samples with our comprehensive practice tests.
          </p>
          <Link to="/tests" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition">
            Start Practice
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SampleAnswers;
