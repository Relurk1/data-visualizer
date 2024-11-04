from flask import Flask, jsonify, request, send_file
import os
import pandas as pd
import uuid
from flask_cors import CORS
import matplotlib.pyplot as plt
from CSVVisualizer import CSVVisualizer
import json

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

file_registry = {}
chart_registry = {}

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
    file_registry[file_id] = file_path
    with open("file_registry.json", "w") as f:
        json.dump({file_id: file_path for file_id, visual in file_registry.items()}, f)
    print(file_registry)

    return jsonify({'file_id': file_id}), 200

@app.route('/api/columns/<file_id>', methods = ['GET'])
def get_columns(file_id):
    with open("file_registry.json", "r") as f:
        file_registry = json.load(f)
    
    file_path = file_registry.get(file_id)
    visual = CSVVisualizer(file_path)
    if not visual:
        return jsonify({'error': 'File not found'}), 404

    columns = visual.get_columns()
    return jsonify({'columns': columns}), 200

@app.route('/api/chart', methods = ['POST'])
def generate_chart():
    charts_dir = "charts"
    if not os.path.exists(charts_dir):
        os.makedirs(charts_dir)

    with open("file_registry.json", "r") as f:
        file_registry = json.load(f)

    payload = request.json
    file_id = payload["Id"]
    chart_type = payload["chartType"]
    x_col = payload["x_col"]
    amt_var = payload["var_amt"]

    file_path = file_registry.get(file_id)
    visual = CSVVisualizer(file_path)
    visual.set_chart_type(chart_type)
    if amt_var == '1':
        visual.select_columns(x_col)
    else:
        visual.select_columns(x_col, payload["y_col"])

    visual.plot()

    chart_path = os.path.join("charts", f"{file_id}.png")
    plt.savefig(chart_path)
    plt.close()

    chart_registry[file_id] = chart_path
    with open("chart_registry.json", "w") as f:
        json.dump(chart_registry, f)
    
    return jsonify({'fileId': file_id}), 200

@app.route('/api/chart/<file_id>', methods=['GET'])
def get_chart(file_id):
    # Load the chart registry to get the chart path
    with open("chart_registry.json", "r") as f:
        chart_registry = json.load(f)
    
    # Find the path for the specified file_id
    chart_path = chart_registry.get(file_id)
    print("Requested file_id:", file_id)
    print("Found chart path:", chart_path)
    
    if not chart_path or not os.path.exists(chart_path):
        return jsonify({'error': 'Chart not found'}), 404
    
    # Serve the chart image file
    return send_file(chart_path, mimetype='image/png')

    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
