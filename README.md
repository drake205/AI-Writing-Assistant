# AI Writing Assistant

This project takes a user input and rewords it into 4 different styles.
* Professional
* Casual
* Polite
* Social Media

<img width="1920" height="996" alt="page" src="https://github.com/user-attachments/assets/eab23079-e74c-4a7a-81b1-a07a778598b8" />

## Packages

###  Backend
* Flask `pip install Flask`
* Flask Cors `pip install -U flask-cors`
* Google Gemini API `pip install -q -U google-genai`
    * Google Gemini API quickstart can be found here at https://ai.google.dev/gemini-api/docs/quickstart

### Frontend
* To install the node modules run `npm install` in the `.\au-writing-assistant\ai-app\` directory.
* Material UI `npm install @mui/material @emotion/react @emotion/styled`
    * Material UI setup can be found here at https://mui.com/material-ui/getting-started/installation/
* Font `npm install @fontsource/roboto`

## Setup Instructions

**Ensure both the Flask server and React Application are running for proper functionality**

1. Clone the repository locally
2. Install any packages still needed for React and Python. (Found in packages section)
3. Replace the placeholder `YOUR_API_KEY` API key in `server.py` to your own Google Gemini API key.
4. Start the backend Flask server by running `python server.py` in the `.\ai-writing-assistant\flask-server\` directory.
5. Start the frontend React Application by running `npm run start` in the `.\au-writing-assistant\ai-app\` directory.

The Flask server should default to `http://localhost:5000`
The Flask API route shoudl befound at `http://localhost:5000/getResponse`
The React Application should default to `http://localhost:3000`

## Tests

This app includes some very basic tests to ensure components render.

### App
Tests for title text, text field input label, and process button on render.

### ResponseArea
Tests for title text on render.
Tests for response text on render.

To run these tests run `npm run test` in the `.\au-writing-assistant\ai-app\` directory.
