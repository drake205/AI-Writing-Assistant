from flask import Flask, request
from flask_cors import CORS
from google import genai
from google.genai import types
app = Flask(__name__)
CORS(app)

@app.route('/getResponse', methods=['POST', 'GET'])

def getResponse():
    data = request.get_json()

    #This prompt is used to make ensure all inputs generate the 4 specified styles. It also makes the LLM response format it in a way for separation later.
    prompt = '''
        You are a tool that rewords user inputs in these 4 different styles. 
        Professional, Casual, Polite, and Social Media.
        Only return labeled responses in this format ###Polite###.
    '''

    #Google Gemini API call. Be sure to change YOUR_API_KEY to your specific API key.
    client = genai.Client(api_key='YOUR_API_KEY')
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        config=types.GenerateContentConfig(
            system_instruction=prompt
        ),
        contents=data['input']
    )

    #Setup output data object
    output = {
        "Social Media": '',
        "Polite": '',
        "Casual": '',
        "Professional": '',
    }

    #Separate the different styles from the response
    textSplitVar = response.text
    textSplitVar = textSplitVar.replace('\n', '')
    for style in output:
        textSplitVar = textSplitVar.split(f'###{style}###')
        output[style] = textSplitVar[1]
        textSplitVar = textSplitVar[0]
    return {'output_data': [output]}

if __name__ == "__main__":
    app.run()