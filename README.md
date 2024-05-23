# AI-Powered Exam Prep

This project provides an AI-powered solution to generate personalized study schedules for students preparing for exams. The application consists of a Flask backend that interacts with Google's generative AI to create the study schedule and a React frontend for the user interface.

## Features

- Input exam-related details like datesheet, favorite and disliked subjects, study hours, etc.
- Generate a personalized study schedule based on the provided information.
- Display the generated schedule in a user-friendly format.

## Technologies Used

- Flask
- React
- Google Generative AI
- Axios
- dotenv
- Flask-CORS
- React Markdown

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Python 3.x
- Node.js
- npm (Node Package Manager)

### Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/ai-powered-exam-prep.git
cd ai-powered-exam-prep
```

2. **Backend Setup:**

   a. Navigate to the backend directory:

   ```bash
   cd backend
   ```

   b. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

   c. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

   d. Create a `.env` file in the backend directory and add your Google Generative AI API key:

   ```plaintext
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

   e. Run the Flask server:

   ```bash
   flask run
   ```

3. **Frontend Setup:**

   a. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

   b. Install the required packages:

   ```bash
   npm install
   ```

   c. Start the React development server:

   ```bash
   npm start
   ```

### How to Get Your Google Generative AI API Key

1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to the "APIs & Services" section.
4. Enable the Generative AI API.
5. Go to "Credentials" and create an API key.
6. Copy the API key and add it to the `.env` file in the backend directory as shown above.

### Project Structure

```
ai-powered-exam-prep/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── README.md
```

### API Endpoints

- `POST /api/generate_schedule` - Generate a personalized study schedule based on provided input data.

### Frontend Components

- `App.js` - Main React component that contains the form for input and displays the generated study schedule.

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Fill in the form with the required details.
3. Click on "Generate Schedule" to get your personalized study schedule.

### Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes.

### License

This project is licensed under the MIT License.
