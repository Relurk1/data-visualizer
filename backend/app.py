"""This module manages user auth and communication with the frontend"""
import os
import uuid
import json
import sqlite3
import bcrypt
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import matplotlib.pyplot as plt
from csv_visualizer import CSVVisualizer
import jwt
from functools import wraps
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

file_registry = {}
chart_registry = {}

DATABASE = 'app.db'
JWT_SECRET = "secure_jwt_secret"

def init_db():
    """Initializes the sqlite database"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user_id = data['id']
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(current_user_id, *args, **kwargs)
    return decorated

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """Handles user signup requests"""
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'All fields are required'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                       (name, email, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Handles user login requests"""
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Email and password are required'}), 400

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, password FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    conn.close()

    if user:
        user_id, name, hashed_password = user
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            token = jwt.encode(
                {'id': user_id, 'exp': datetime.utcnow() + timedelta(hours=1)},
                JWT_SECRET,
                algorithm="HS256"
            )
            return jsonify({'message': 'Login successful', 'token': token, 'user': {'id': user_id, 'name': name, 'email': email}}), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/api/auth/profile', methods=['GET'])
@token_required
def profile(current_user_id):
    """
    Fetches user profile details using the token.
    """
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, email FROM users WHERE id = ?', (current_user_id,))
    user = cursor.fetchone()
    conn.close()

    if user:
        user_id, name, email = user
        return jsonify({'id': user_id, 'name': name, 'email': email}), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handles files being imported from the frontend"""
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
    with open("file_registry.json", "w", encoding="utf-8") as f:
        json.dump({file_id: file_path for file_id, visual in file_registry.items()}, f)
    print(file_registry)

    return jsonify({'file_id': file_id}), 200

@app.route('/api/columns/<file_id>', methods=['GET'])
def get_columns(file_id):
    """Returns columns from the csv file"""
    with open("file_registry.json", "r", encoding="utf-8") as f:
        f_registry = json.load(f)

    file_path = f_registry.get(file_id)
    visual = CSVVisualizer(file_path)
    if not visual:
        return jsonify({'error': 'File not found'}), 404

    columns = visual.get_columns()
    return jsonify({'columns': columns}), 200

@app.route('/api/chart', methods=['POST'])
def generate_chart():
    """generates charts and returns their filepath"""
    charts_dir = "charts"
    if not os.path.exists(charts_dir):
        os.makedirs(charts_dir)

    with open("file_registry.json", "r", encoding="utf-8") as f:
        f_registry = json.load(f)

    payload = request.json
    file_id = payload["Id"]
    chart_type = payload["chartType"]
    x_col = payload["x_col"]
    y_col = payload.get("y_col")
    x_label = payload.get("x_label", x_col)
    y_label = payload.get("y_label", y_col)
    graph_color = payload.get("color", "#000000")
    graph_title = payload.get("title", "Scatter Plot")

    file_path = f_registry.get(file_id)
    if not file_path:
        return jsonify({'error': 'File not found'}), 404

    visual = CSVVisualizer(file_path)
    visual.set_chart_type(chart_type)
    visual.select_columns(x_col, y_col)
    visual.set_labels(x_label=x_label, y_label=y_label,
                      title=graph_title, legend="") 
    visual.set_color(graph_color)

    visual.plot()

    chart_path = os.path.join(charts_dir, f"{file_id}.png")
    plt.savefig(chart_path)
    plt.close()

    chart_registry[file_id] = chart_path
    with open("chart_registry.json", "w", encoding="utf-8") as f:
        json.dump(chart_registry, f)

    return jsonify({'fileId': file_id}), 200

@app.route('/api/chart/<file_id>', methods=['GET'])
def get_chart(file_id):
    """retreives charts upon user requests"""
    with open("chart_registry.json", "r", encoding="utf-8") as f:
        c_registry = json.load(f)

    chart_path = c_registry.get(file_id)
    print("Requested file_id:", file_id)
    print("Found chart path:", chart_path)

    if not chart_path or not os.path.exists(chart_path):
        return jsonify({'error': 'Chart not found'}), 404

    return send_file(chart_path, mimetype='image/png')

@app.route('/api/chart/save', methods=['POST'])
@token_required
def save_chart(current_user_id):
    """
    Saves a chart reference for the logged-in user.
    """
    data = request.json
    file_id = data.get('fileId')
    chart_url = data.get('chartUrl')

    if not all([file_id, chart_url]):
        return jsonify({'error': 'File ID and Chart URL are required'}), 400

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS saved_charts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                file_id TEXT NOT NULL,
                chart_url TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        ''')
        cursor.execute('INSERT INTO saved_charts (user_id, file_id, chart_url) VALUES (?, ?, ?)',
                       (current_user_id, file_id, chart_url))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Chart saved successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chart/saved', methods=['GET'])
@token_required
def get_saved_charts(current_user_id):
    """
    Retrieves saved charts for the logged-in user.
    """
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('SELECT file_id, chart_url FROM saved_charts WHERE user_id = ?', (current_user_id,))
        charts = cursor.fetchall()
        conn.close()
        return jsonify({'charts': [{'fileId': file_id, 'chartUrl': chart_url} for file_id, chart_url in charts]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/chart/delete', methods=['DELETE'])
@token_required
def delete_chart(current_user_id):
    """
    Deletes a specific saved chart for the logged-in user.
    """
    data = request.json
    file_id = data.get('fileId')

    if not file_id:
        return jsonify({'error': 'File ID is required'}), 400

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM saved_charts WHERE user_id = ? AND file_id = ?', (current_user_id, file_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Chart deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
