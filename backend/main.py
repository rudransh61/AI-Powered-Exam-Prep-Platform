from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = "AIzaSyDosgmLTwvVZvwyfmxTcywugMHzp5BP2f4"

def generate_schedule(data):
    try:
        prompt = f"""
        I am a student in grade {data['grade']}. My exams are starting in {data['days_left']} days. 
        Here is my exam datesheet: {data['datesheet']}.
        My favorite subjects are: {data['fav_subjects']}.
        The subjects I dislike are: {data['hate_subjects']}.
        I study {data['study_hours']} hours a day.
        Here is the list of subjects and their major topics and completion status:
        {data['subjects_info']}.
        My expected score is {data['expected_score']}.
        Can I achieve this score?
        Please generate a personalized study schedule for me.
        """
        
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        chat = model.start_chat()
        response = chat.send_message(prompt)
        return response.text
    except Exception as e:
        return f"There was an error: {e}"

@app.route('/api/generate_schedule', methods=['POST'])
def generate_schedule_endpoint():
    data = request.json
    required_fields = ['grade', 'days_left', 'datesheet', 'fav_subjects', 'hate_subjects', 'study_hours', 'subjects_info', 'expected_score']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    schedule = generate_schedule(data)
    return jsonify({"schedule": schedule})

if __name__ == '__main__':
    app.run(debug=True)
