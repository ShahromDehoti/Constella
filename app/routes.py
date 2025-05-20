from flask import Blueprint, render_template, jsonify
import json
import os

routes = Blueprint('routes', __name__)

# Root route to serve the dashboard
@routes.route('/')
def dashboard():
    return render_template('dashboard.html')

# API route to return metrics data
@routes.route('/api/metrics')
def get_metrics():
    try:
        # Adjust path if needed
        data_path = os.path.join(os.path.dirname(__file__), 'data', 'metrics.json')
        with open(data_path, 'r') as f:
            metrics = json.load(f)
        return jsonify(metrics)
    except Exception as e:
        return jsonify({'error': 'Failed to load metrics', 'details': str(e)}), 500