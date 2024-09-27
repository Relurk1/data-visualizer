from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd

app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        
        # Process CSV with pandas
        df = pd.read_csv(file_path)
        summary = {
            'columns': list(df.columns),
            'head': df.head().to_dict(orient='records')
        }

        return jsonify(summary), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
