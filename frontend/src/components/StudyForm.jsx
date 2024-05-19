import React, { useState } from 'react';
import ListManager from './ListManager'; // Assuming ListManager.jsx is in the same directory as StudyForm.jsx

function StudyForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        grade: '',
        days_left: '',
        study_hours: '',
        expected_score: '',
        datesheet: [],
        fav_subjects: [],
        hate_subjects: [],
        subjects_info: []
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleAddSubjectInfo = () => {
        setFormData({
            ...formData,
            subjects_info: [...formData.subjects_info, { subject: '', topics: [], completion: '' }]
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Grade:
                <input type="text" name="grade" value={formData.grade} onChange={handleChange} />
            </label>
            <label>
                Days Left Until Exam:
                <input type="text" name="days_left" value={formData.days_left} onChange={handleChange} />
            </label>
            <label>
                Hours You Study in a Day:
                <input type="text" name="study_hours" value={formData.study_hours} onChange={handleChange} />
            </label>
            <label>
                Expected Score:
                <input type="text" name="expected_score" value={formData.expected_score} onChange={handleChange} />
            </label>
            <h2>DateSheet</h2>
            <ListManager name="datesheet" formData={formData} setFormData={setFormData} />
            <h2>Favorite Subjects</h2>
            <ListManager name="fav_subjects" formData={formData} setFormData={setFormData} />
            <h2>Disliked Subjects</h2>
            <ListManager name="hate_subjects" formData={formData} setFormData={setFormData} />
            <h2>Subject Info</h2>
            {formData.subjects_info.map((subject, index) => (
                <div key={index}>
                    <label>
                        Subject:
                        <input type="text" name="subject" value={subject.subject} onChange={(e) => handleSubjectInfoChange(index, e)} />
                    </label>
                    <label>
                        Topics:
                        <input type="text" name="topics" value={subject.topics.join(',')} onChange={(e) => handleSubjectInfoChange(index, e)} />
                    </label>
                    <label>
                        Completion:
                        <input type="text" name="completion" value={subject.completion} onChange={(e) => handleSubjectInfoChange(index, e)} />
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleAddSubjectInfo}>Add Subject Info</button>
            <button type="submit">Generate Schedule</button>
        </form>
    );
}

export default StudyForm;
