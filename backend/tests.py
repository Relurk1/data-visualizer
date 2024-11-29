"""This module contains the unit tests for the project"""
import unittest
import io
import os
from app import app

class FlaskTestCase(unittest.TestCase):
    """This class contains all the relevant unit tests for the project"""
    def setUp(self):
        """Set up a test client and configure the app for testing"""
        app.config['TESTING'] = True
        app.config['UPLOAD_FOLDER'] = 'test_uploads'  # use a different folder for tests
        self.client = app.test_client()

        # Create the test upload folder if it doesn't exist
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])

    def tearDown(self):
        """Clean up by removing the test upload folder and its contents"""
        if os.path.exists(app.config['UPLOAD_FOLDER']):
            for filename in os.listdir(app.config['UPLOAD_FOLDER']):
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            os.rmdir(app.config['UPLOAD_FOLDER'])

    def test_upload_no_file(self):
        """Test case where no file is uploaded"""
        response = self.client.post('/upload', content_type='multipart/form-data')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'No file part', response.data)

    def test_upload_empty_filename(self):
        """Test case where a file is uploaded but with an empty filename"""
        data = {
            'file': (io.BytesIO(b"dummy data"), '')
        }
        response = self.client.post('/upload', data=data, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'No selected file', response.data)

    def test_upload_valid_file(self):
        """Test case where a valid CSV file is uploaded"""
        csv_data = "name,age\nJohn,30\nDoe,22"
        data = {
            'file': (io.BytesIO(csv_data.encode('utf-8')), 'test.csv')
        }
        response = self.client.post('/upload', data=data, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 200)

        # Check if the response contains the correct summary
        json_data = response.get_json()
        self.assertIn('columns', json_data)
        self.assertEqual(json_data['columns'], ['name', 'age'])
        self.assertIn('head', json_data)
        self.assertEqual(len(json_data['head']), 2)
        self.assertEqual(json_data['head'][0], {'name': 'John', 'age': 30})
        self.assertEqual(json_data['head'][1], {'name': 'Doe', 'age': 22})

    def test_invalid_file_type(self):
        """Test case where a non-CSV file is uploaded"""
        data = {
            'file': (io.BytesIO(b"this is not a csv file"), 'test.txt')
        }
        response = self.client.post('/upload', data=data,
        content_type='multipart/form-data')
        self.assertEqual(response.status_code, 500)

if __name__ == '__main__':
    unittest.main()
