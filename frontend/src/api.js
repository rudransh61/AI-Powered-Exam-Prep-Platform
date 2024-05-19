import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const generateSchedule = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/generate_schedule`, userData);
        return response.data.schedule;
    } catch (error) {
        console.error("There was an error generating the schedule:", error);
        return "There was an error generating the schedule.";
    }
};
