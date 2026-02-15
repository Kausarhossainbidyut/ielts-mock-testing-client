import { useState, useEffect } from 'react';
import { testsAPI, questionsAPI } from '../../utils/api';
import Swal from 'sweetalert2';

const TestManagement = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [activeTab, setActiveTab] = useState('details'); // details, questions
  const [formData, setFormData] = useState({
    title: '',
    testId: '',
    type: 'practice',
    skills: [],
    difficulty: 'medium',
    duration: 30,
    status: 'draft'
  });
  
  // Questions for each skill
  const [questions, setQuestions] = useState({
    listening: [],
    reading: [],
    writing: [],
    speaking: []
  });
  const [newQuestion, setNewQuestion] = useState({
    skill: 'reading',
    type: 'multiple-choice',
    question: '',
    options: [{ letter: 'A', text: '', isCorrect: false }],
    correctAnswer: 'a',
    explanation: ''
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await testsAPI.getAllTests({ limit: 100 });
      if (res.data?.success) {
        setTests(res.data.data?.tests || []);
      }
    } catch (err) {
      console.error('Error fetching tests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate - at least one skill required
    if (!formData.skills || formData.skills.length === 0) {
      Swal.fire('Error', 'Please select at least one skill (Listening, Reading, Writing, or Speaking)', 'error');
      return;
    }
    
    try {
      let testId;
      if (editingTest) {
        await testsAPI.updateTest(editingTest._id, formData);
        testId = editingTest._id;
        Swal.fire('Success', 'Test updated successfully', 'success');
        
        // Save questions only when editing
        for (const skill of formData.skills) {
          const skillQuestions = questions[skill] || [];
          for (const q of skillQuestions) {
            try {
              await questionsAPI.createQuestion(skill, { ...q, test: testId });
            } catch (qErr) {
              console.error(`Error saving ${skill} question:`, qErr);
            }
          }
        }
      } else {
        const res = await testsAPI.createTest(formData);
        testId = res.data?.data?._id;
        Swal.fire('Success', 'Test created! Now you can edit to add questions.', 'success');
      }
      
      setShowModal(false);
      setEditingTest(null);
      setFormData({ title: '', testId: '', type: 'practice', skills: [], difficulty: 'medium', duration: 30, status: 'draft' });
      setQuestions({ listening: [], reading: [], writing: [], speaking: [] });
      fetchTests();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to save test', 'error');
      Swal.fire('Error', err.response?.data?.message || 'Failed to save test', 'error');
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      title: test.title || '',
      testId: test.testId || '',
      type: test.type || 'practice',
      skills: test.skills || [],
      difficulty: test.difficulty || 'medium',
      duration: test.duration || 30,
      status: test.status || 'draft'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await testsAPI.deleteTest(id);
        Swal.fire('Deleted!', 'Test has been deleted.', 'success');
        fetchTests();
      } catch {
        Swal.fire('Error', 'Failed to delete test', 'error');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await testsAPI.updateTest(id, { status: newStatus });
      Swal.fire('Success', `Test status changed to ${newStatus}`, 'success');
      fetchTests();
    } catch {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  // Question management functions
  const addQuestion = () => {
    if (!newQuestion.question.trim()) {
      Swal.fire('Error', 'Please enter a question', 'error');
      return;
    }
    
    const q = {
      ...newQuestion,
      options: newQuestion.options.filter(o => o.text.trim()),
      questionNumber: questions[newQuestion.skill].length + 1
    };
    
    setQuestions(prev => ({
      ...prev,
      [newQuestion.skill]: [...prev[newQuestion.skill], q]
    }));
    
    setNewQuestion({
      skill: newQuestion.skill,
      type: 'multiple-choice',
      question: '',
      options: [{ letter: 'A', text: '', isCorrect: false }],
      correctAnswer: 'a',
      explanation: ''
    });
  };

  const removeQuestion = (skill, index) => {
    setQuestions(prev => ({
      ...prev,
      [skill]: prev[skill].filter((_, i) => i !== index)
    }));
  };

  const addOption = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, { letter: letters[prev.options.length], text: '', isCorrect: false }]
    }));
  };

  const updateOption = (index, field, value) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? { ...opt, [field]: value } : opt)
    }));
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          test.testId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || test.type === filterType || 
                       test.skills?.some(s => s.toLowerCase() === filterType);
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Test Management</h1>
            <p className="text-blue-100">Create, edit, and manage IELTS tests</p>
          </div>
          <button 
            onClick={() => { setShowModal(true); setEditingTest(null); setFormData({ title: '', testId: '', type: 'practice', skills: [], difficulty: 'medium', duration: 30, status: 'draft' }); }}
            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            ➕ Create New Test
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search tests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="listening">Listening</option>
            <option value="reading">Reading</option>
            <option value="writing">Writing</option>
            <option value="speaking">Speaking</option>
            <option value="full-mock">Full Mock</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Test Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Skills</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : filteredTests.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No tests found</td></tr>
              ) : (
                filteredTests.map((test) => (
                  <tr key={test._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{test.title}</div>
                      <div className="text-sm text-gray-500">{test.testId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {test.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {test.skills?.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{test.duration} min</td>
                    <td className="px-6 py-4">
                      <select
                        value={test.status}
                        onChange={(e) => handleStatusChange(test._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                          test.status === 'published' ? 'bg-green-100 text-green-700' : 
                          test.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(test)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(test._id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingTest ? 'Edit Test' : 'Create New Test'}</h2>
            
            {/* Tabs - Only show when editing */}
            {editingTest && (
              <div className="flex border-b mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  Test Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('questions')}
                  className={`px-4 py-2 font-medium ${activeTab === 'questions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  Questions ({questions.listening.length + questions.reading.length + questions.writing.length + questions.speaking.length})
                </button>
              </div>
            )}
            
            {(!editingTest || activeTab === 'details') && (
              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test ID</label>
                <input
                  type="text"
                  value={formData.testId}
                  onChange={(e) => setFormData({ ...formData, testId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  disabled={!!editingTest}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="practice">Practice</option>
                    <option value="full-mock">Full Mock</option>
                    <option value="mini">Mini</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="exam">Exam</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                  {['listening', 'reading', 'writing', 'speaking'].map(skill => (
                    <label key={skill} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, skills: [...formData.skills, skill] });
                          } else {
                            setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
                          }
                        }}
                      />
                      <span className="capitalize">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingTest ? 'Update Test' : 'Create Test'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
            )}
            
            {/* Questions Tab - Only when editing */}
            {editingTest && activeTab === 'questions' && (
              <div className="space-y-4">
                {/* Add Question Form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Add New Question</h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Skill</label>
                      <select
                        value={newQuestion.skill}
                        onChange={(e) => setNewQuestion({ ...newQuestion, skill: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        {formData.skills.includes('listening') && <option value="listening">Listening</option>}
                        {formData.skills.includes('reading') && <option value="reading">Reading</option>}
                        {formData.skills.includes('writing') && <option value="writing">Writing</option>}
                        {formData.skills.includes('speaking') && <option value="speaking">Speaking</option>}
                        {!formData.skills.length && <option value="">Select skills first</option>}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <select
                        value={newQuestion.type}
                        onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="fill-blank">Fill in Blank</option>
                        <option value="short-answer">Short Answer</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs text-gray-600 mb-1">Question</label>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={2}
                      placeholder="Enter your question here..."
                    />
                  </div>
                  
                  {/* Options for multiple choice */}
                  {newQuestion.type === 'multiple-choice' && (
                    <div className="mb-3">
                      <label className="block text-xs text-gray-600 mb-1">Options</label>
                      {newQuestion.options.map((opt, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input
                            type="radio"
                            name="correct"
                            checked={newQuestion.correctAnswer === opt.letter.toLowerCase()}
                            onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: opt.letter.toLowerCase() })}
                            className="mt-2"
                          />
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => updateOption(i, 'text', e.target.value)}
                            placeholder={`Option ${opt.letter}`}
                            className="flex-1 px-3 py-1 border rounded text-sm"
                          />
                        </div>
                      ))}
                      <button type="button" onClick={addOption} className="text-sm text-blue-600">+ Add Option</button>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={addQuestion}
                    disabled={!formData.skills.length}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Add Question
                  </button>
                  {!formData.skills.length && <p className="text-xs text-red-500 mt-2">Please select skills first in Test Details tab</p>}
                </div>
                
                {/* Questions List */}
                {formData.skills.map(skill => (
                  questions[skill]?.length > 0 && (
                    <div key={skill} className="border rounded-lg p-3">
                      <h4 className="font-semibold capitalize mb-2">{skill} ({questions[skill].length})</h4>
                      {questions[skill].map((q, i) => (
                        <div key={i} className="bg-white border rounded p-2 mb-2 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">Q{i + 1}:</span>
                            <button onClick={() => removeQuestion(skill, i)} className="text-red-500">×</button>
                          </div>
                          <p className="text-gray-700">{q.question}</p>
                        </div>
                      ))}
                    </div>
                  )
                ))}
                
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Back to Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestManagement;
