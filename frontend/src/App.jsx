// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ReactMarkdown from 'react-markdown';

const markdownStyle = {
  backgroundColor: '#f3f3f3', // Light brownish-gray color
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow for depth
};

function App() {
  const [formData, setFormData] = useState({
    grade: '',
    days_left: '',
    study_hours: '',
    expected_score: '',
    datesheet: [],
    fav_subjects: [],
    hate_subjects: [],
    subjects_info: [],
    previous_performance:'',
  });
  const [schedule, setSchedule] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectInfoChange = (index, e) => {
    const newSubjectsInfo = [...formData.subjects_info];
    newSubjectsInfo[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      subjects_info: newSubjectsInfo
    });
  };

  const handleAddItem = (name) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], inputValue]
    });
    setInputValue('');
  };

  const handleDeleteItem = (name, index) => {
    const newItems = [...formData[name]];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      [name]: newItems
    });
  };

  const handleAddSubjectInfo = () => {
    setFormData({
      ...formData,
      subjects_info: [...formData.subjects_info, { subject: '', topics: '', completion: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/generate_schedule', formData);
      setSchedule(response.data.schedule);
    } catch (error) {
      console.error('Error generating schedule:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AI-Powered Exam Prep</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-4">
          <label className="block mb-2">Grade:</label>
          <input type="text" name="grade" value={formData.grade} onChange={handleChange} className="border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Days Left Until Exam:</label>
          <input type="text" name="days_left" value={formData.days_left} onChange={handleChange} className="border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hours You Study in a Day:</label>
          <input type="text" name="study_hours" value={formData.study_hours} onChange={handleChange} className="border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expected Score:</label>
          <input type="text" name="expected_score" value={formData.expected_score} onChange={handleChange} className="border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Previous Performance:</label>
          <input type="text" name="previous_performance" value={formData.previous_performance} onChange={handleChange} className="border rounded-md px-4 py-2 w-full" />
        </div>
        {/* Datesheet */}
        <div className="mb-4">
          <h2 className="mb-2">DateSheet</h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add datesheet"
            className="border rounded-md px-4 py-2 w-full"
          />
          <button type="button" onClick={() => handleAddItem('datesheet')} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Add</button>
          <ul className="list-disc list-inside">
            {formData.datesheet.map((item, index) => (
              <li key={index} className="flex items-center">
                {item}
                <button onClick={() => handleDeleteItem('datesheet', index)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Favorite Subjects */}
        <div className="mb-4">
          <h2 className="mb-2">Favorite Subjects</h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add favorite subject"
            className="border rounded-md px-4 py-2 w-full"
          />
          <button type="button" onClick={() => handleAddItem('fav_subjects')} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Add</button>
          <ul className="list-disc list-inside">
            {formData.fav_subjects.map((item, index) => (
              <li key={index} className="flex items-center">
                {item}
                <button onClick={() => handleDeleteItem('fav_subjects', index)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Disliked Subjects */}
        <div className="mb-4">
          <h2 className="mb-2">Disliked Subjects</h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add disliked subject"
            className="border rounded-md px-4 py-2 w-full"
          />
          <button type="button" onClick={() => handleAddItem('hate_subjects')} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Add</button>
          <ul className="list-disc list-inside">
            {formData.hate_subjects.map((item, index) => (
              <li key={index} className="flex items-center">
                {item}
                <button onClick={() => handleDeleteItem('hate_subjects', index)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Subject Info */}
        <div className="mb-4">
          <h2 className="mb-2">Subject Info</h2>
          {formData.subjects_info.map((subject, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Subject:</label>
              <input type="text" name="subject" value={subject.subject} onChange={(e) => handleSubjectInfoChange(index, e)} className="border rounded-md px-4 py-2 w-full" />
              <label className="block mb-2">Topics:</label>
              <input type="text" name="topics" value={subject.topics} onChange={(e) => handleSubjectInfoChange(index, e)} className="border rounded-md px-4 py-2 w-full" />
              <label className="block mb-2">Completion:</label>
              <input type="text" name="completion" value={subject.completion} onChange={(e) => handleSubjectInfoChange(index, e)} className="border rounded-md px-4 py-2 w-full" />
            </div>
          ))}
          <button type="button" onClick={handleAddSubjectInfo} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Subject Info</button>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Generate Schedule</button>
      </form>
      {schedule && (
        <div className="schedule mt-8" style={markdownStyle}>
          <h2 className="text-2xl font-semibold mb-4">Generated Study Schedule</h2>
          <ReactMarkdown>{schedule}</ReactMarkdown>
        </div>
      )}
    </div>

  );
}

export default App;
