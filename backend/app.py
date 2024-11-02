from flask import Flask, jsonify, request, send_file
import os
import pandas as pd
import uuid
from flask_cors import CORS
import matplotlib.pyplot as plt
from CSVVisualizer import CSVVisualizer

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

file_registry = {}

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_FOLDER, f"{file_id}_{file.filename}")
    file.save(file_path)
    visual = CSVVisualizer(file_path)
    file_registry[file_id] = visual

    return jsonify({'file_id': file_id, 'columns': visual.get_columns()}), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
